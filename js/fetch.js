function fetch () {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('Test retry'));
    }, 200);
  })
}

function Fetch (url, config) {
  const { method = 'get', retryTimes = 0, retryInterval = 5000, data, onRetry, maxRetryTimes = retryTimes } = config;
  const fetchPromise = () => fetch(url, {
    method,
    data
  });
  const getRetryInterval = typeof retryInterval === 'function' ? retryInterval : () => retryInterval;

  if (retryTimes != null) {
    const interval = getRetryInterval()
    return new Promise((resolve, reject) => {
      fetchPromise().then(
        resolve,
        reason => {
          const hasRetriedTimes = maxRetryTimes - retryTimes
          const nextRetryInterval = getRetryInterval(hasRetriedTimes);
          return new Promise(_resolve => {
            if (retryTimes === 0) {
              reject(reason);
              return;
            }
            console.log('Will retry in', nextRetryInterval, 'ms...');
            setTimeout(() => {
              onRetry && onRetry(reason);
              Fetch(url, {
                ...config,
                retryTimes: retryTimes - 1,
                maxRetryTimes
              }).then(_resolve, reject);
            }, nextRetryInterval);
          })
        }
      )
    }) 
  }

  return fetchPromise();
}

Fetch(
  'https://www.baidud.com',
  {
    retryTimes: 3,
    retryInterval(retriedTimes) {
      return (retriedTimes + 1) * 1000;
    },
    onRetry(reason) {
      console.log('Error occured:', reason.message, ',retrying...');
    }
  }
).then(
  console.log,
  reason => console.error('Rejected:', reason.message)
);