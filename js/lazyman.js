/**
 * @author coma
 * @description LazyMan
 */

/**
 * 
 * @param {string} name lazyman的参数
 * @returns {_LazyMan} 
 */
function LazyMan (name) {
  return new _LazyMan2(name);
}

class _LazyMan {
  constructor (name) {
    this.tasks = [];
    this.tasks.push((name => () => {
      console.log(`Hi! This is ${name}`);
      this.next();
    })(name));

    // setTimeout会把回调函数放到MacroTask队列中，
    // 所以才能实现先执行后面的链式调用添加task，
    // 添加完之后再执行
    setTimeout(() => {
      this.next();
    }, 0);
  }

  next () {
    let task = this.tasks.shift();
    if (!task) {
      return;
    }
    if (typeof task !== 'function') {
      throw new TypeError('task must a function');
    }
    task();
  }

  eat (food) {
    this.tasks.push((food => () => {
      console.log(`Eat ${food}~`);
      this.next();
    })(food));
    return this;
  }

  sleepFirst (time) {
    time = time * 1000;
    this.tasks.unshift((time => () => {
      setTimeout(() => {
        console.log(`Wake up after ${time} ms`);
        this.next();
      }, time);
    })(time));
    return this;
  }

  sleep (time) {
    time = time * 1000;
    this.tasks.push((time => () => {
      setTimeout(() => {
        console.log(`Wake up after ${time} ms`);
        this.next();
      }, time);
    })(time));
    return this;
  }
}

class _LazyMan2 extends _LazyMan {
  constructor (name) {
    super(name);
    this.macroTasks = [];
  }

  next () {
    let task;
    if (this.macroTasks.length !== 0) {
      task = this.macroTasks.shift();
    } else {
      task = this.tasks.shift();
    }
    
    if (typeof task === 'function') {
      task();
    }
  }

  sleepFirst (time) {
    time = time * 1000;
    this.macroTasks.push((time => () => {
      setTimeout(() => {
        console.log(`Wake up after ${time} ms`);
        this.next(); 
      }, time);
    })(time));
    return this;
  }
}

new LazyMan('Hank').sleepFirst(3).eat('lunch').sleep(3).eat('dinner').sleepFirst(2);