interface IRetryOptions {
  retryTimes?: number;
  retryInterval?: (hasRetriedTimes: number) => number | number;
  onRetry?: (reason?: Error) => void;
}

type IAsyncExecutor<R> = () => Promise<R>;

class RetryMachine<R> {
  public executor: IAsyncExecutor<R>;
  private options: IRetryOptions;
  private getNextInterval: (hasRetriedTimes: number) => number;
  private retryTimesLeft: number;
  constructor(executor: IAsyncExecutor<R>, options: IRetryOptions) {
    this.executor = executor;
    this.options = options;
    this.getNextInterval = this.wrapInterval();
    this.retryTimesLeft = this.options.retryTimes || 0;
  }

  start() {
    const { retryTimes, onRetry } = this.options;
    const executor = () => this.executor();

    if (retryTimes == null) {
      return executor();
    }

    return new Promise((resolve, reject) => {
      executor().then(
        resolve,
        reason => {
          if (this.retryTimesLeft > 0) {
            const nextInterval = this.getNextInterval(retryTimes - this.retryTimesLeft);
            console.log('Will retry in', nextInterval, 'ms...');
            this.retryTimesLeft --;
            return new Promise(_resolve => {
              setTimeout(() => {
                if (onRetry) {
                  onRetry(reason);
                }
                this.start().then(
                  _resolve,
                  reject
                );
              }, nextInterval);
            })
          }

          reject(reason);
        }
      )
    })
  }

  private wrapInterval() {
    const { retryInterval } = this.options;
    const getRetryInterval = typeof retryInterval === 'function' ? retryInterval : () => (retryInterval || 0);

    return getRetryInterval;
  }
}

function fetch<T> () {
  return new Promise<T>((_, reject) => {
    setTimeout(() => {
      reject(new Error('Test retry'));
    }, 600);
  });
}

function fetch1() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('Hello world');
    }, 600);
  });
}

const retryFetch = new RetryMachine<string>(
  () => fetch() as Promise<string>,
  {
    retryTimes: 2,
    retryInterval(hasRetriedTimes) {
      return (hasRetriedTimes + 1) * 1000;
    },
    onRetry(reason) {
      console.log('Error occured:', reason && reason.message, ', retrying...');
    }
  }
)

console.time('retry')
retryFetch.start().then(
  res => {
    console.timeEnd('retry');
    console.log(res);
  },
  reason => {
    console.timeEnd('retry');
    console.error('Rejected:', reason.message)
  }
);