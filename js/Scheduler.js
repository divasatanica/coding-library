class Scheduler {
    constructor(k) {
        this.size = k;
        this.queue = [];
        this.wip = [];
        this.maxId = 1;
        this.result = [];
        this._resolve = null;
    }

    run() {
        const firstBatchWorkToRun = this.queue.splice(0, this.size);

        setTimeout(() => {
            firstBatchWorkToRun.forEach(task => {
                task.run();
            });
        });
        
        return new Promise(resolve => {
            this._resolve = resolve;
        });
    }

    next(task) {
        if (this.queue.length < 1 && this.wip.length < 1) {
            this.result.sort((a, b) => a.id - b.id);
            this._resolve(this.result.map(i => i.result));
            return;
        }
        if (this.isFull()) {
            setTimeout(() => {
                this.next();
            });
            return;
        }

        if (this.queue.length < 1) {
            return;
        }
        const work = this.queue.splice(0, 1);
        work[0].run();
    }   

    registerTask(task) {
        const _task = {
            task,
            id: this.maxId ++
        };
        const that = this;
        _task.run = function() {
            let result = this.task;
            try {
                if (typeof result === 'function') {
                    result = result();
                }
            } catch (e) {
                result = e.message;
            }
            

            if (result instanceof Promise) {
                result.then(res => res, err => err).then(_result => {
                    that.result.push({ id: this.id, result: _result });
                }).finally(() => {
                    that.wip = that.wip.filter(i => i !== this.id);
                    that.next();
                });
                that.wip.push(this.id);
            } else {
                that._result[this.id] = result;
                that.next();
            }
        }

        this.queue.push(_task);
    }

    isFull() {
        return this.wip.length === this.size;
    }
}

const Schd = new Scheduler(4);

Schd.registerTask(() => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(1);
        }, 2000);
    })
});
Schd.registerTask(() => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(2);
        }, 3000);
    })
});
Schd.registerTask(() => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('Not found 404');
        }, 4000);
    });
});
Schd.registerTask(() => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(4);
        }, 4000);
    })
});


async function test() {
    console.time('schd');
    let result = await Schd.run();
    console.timeEnd('schd');
    console.log(result);
}

console.log(test() instanceof Promise);
