function debounce(callback, time) {
    let timer;
    
    return function(...args) {
      if (timer) {
          clearTimeout(timer)
        timer = null //1
      }
      
      timer = setTimeout(() => {
        callback.apply(this, args);
        //   timer = null; //2
      }, time);
    }
      
}

function log(name) {
    console.log('name:', name);
}

var _log = debounce(log, 1000);

_log('coma');
setTimeout(() => {
    _log('coma2');
}, 500);
setTimeout(() => {
    _log('coma3');
}, 1000);