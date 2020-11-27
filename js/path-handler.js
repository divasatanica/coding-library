function handler(obj) {
    const res = [];
    const dfs = (root, res, path) => {
        if (typeof root.val !== 'object' || root.val === null) {
            res.push(`${path && path + '.' || ''}${root.key}`);
            return;
        }
        
        let keys = Object.keys(root.val);
        for (let i = 0, len = keys.length; i < len; i ++) {
            const key = keys[i];
            const child = {
                val: root.val[key],
                key
            };
            
            dfs(child, res, `${path && path + '.' || ''}${root.key}`);
        }
    }
    
    const root = {
        val: obj,
        key: ''
    };
    
    dfs(root, res, '');
    
    return res;
}

const obj = {
  a: {
    a1: 123,
    a2: {
      a21: 345,
    }
  },
  b: 567,
  c: {
    c1: 789
  }
}

console.log(handler(obj));

// const calc = (function(initial) {
//     let run = () => initial;
//   const add = i => {
//         const prev = run;
//         run = () => prev() + i;
//   }
  
//   return {
//     add,
//     run: function() {
//         return run();
//     }
//   }
// })(10);

// calc.add(3);
// calc.add(6);
// console.log(calc.run());