function curry(fn, argNum = fn.length) {
  let args = [];

  let i = 0;

  function end () {
    const res = fn.apply(this, args);
    // Reset the i pointer and args array to make this function can called multiple times.
    i = 0;
    args = [];
    return res;
  }

  // Accept any number of parameters
  function step(...x) {
    if (i < argNum - 1) {
      args.push(...x);
      i += x.length;

      if (args.length === argNum) {
        return end();
      }
      return step;
    }

    args.push(...x);
    return end();
  }

  return step;
}

function uncurry(fn) {
  const argArr = [];
  let res = fn;
  return function (...args) {
    const len = args.length;

    let i = 0;

    while (i < len) {
      // Omit the parameter out of range.
      if (typeof res === 'function') {
        res = res(args[i ++]);
      } else {
        return res;
      }
    }
    
    return res;
  }
}

function foo(a, b, c, d) {
  return a + b + c + d;
}

const _foo = curry(foo);

console.log(_foo(1)(2, 3, 4));

const foo1 = uncurry(_foo)

console.log(foo1(1,2,3,4))