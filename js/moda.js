// var {b, c} = require('./modb1');
async function wrapper() {
  const ModB = await import('./modb.mjs');

  setTimeout(() => {
    console.log(ModB);
    // console.log(c);
  }, 6000);
}

wrapper()
