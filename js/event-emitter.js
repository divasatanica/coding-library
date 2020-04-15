const kEventTypeMap = Symbol('eventTypeMap');
const noop = function() {};

class EventEmitter {
    constructor() {
        this[kEventTypeMap] = new Map();
    }

    emit(event, ...args) {
        const map = this[kEventTypeMap];

        if (!map.has(event)) {
            return;
        }

        const handlers = map.get(event);

        handlers.forEach(cb => {
            cb.apply(this, args);
        });
    }

    on(event, handler = noop) {
        const map = this[kEventTypeMap];
        let handlers;
        if (map.has(event)) {
            handlers = map.get(event);
        } else {
            handlers = [];
        }

        handlers.push(handler);

        map.set(event, handlers);
    }

    off(event, handler = null) {
        const map = this[kEventTypeMap];

        if (!handler) {
            map.delete(event);
            return;
        }
        if (!map.has(event)) {
            return;
        }
        const handlers = map.get(event);
        
        map.set(event, handlers.filter(cb => cb !== handler));
    }

    once(event, handler = noop) {
        const map = this[kEventTypeMap];
        const _handler = (...args) => {
            this.off(event, _handler);
            handler.apply(this, args);
        }

        this.on(event, _handler);
    }
}

// test case

const ee = new EventEmitter();

ee.once('mounted', (...result) => console.log('mounted fired:', ...result));
setTimeout(() => {
    ee.emit('mounted', 1,2,3);
}, 1000);

ee.emit('mounted', 4,5,6);
