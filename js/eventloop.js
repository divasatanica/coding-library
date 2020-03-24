const fs = require('fs');
const { resolve } = require('path');
function loop(time) {
    setTimeout(() => {
        console.log('timer', Date.now());
        // loop();
    },time);
}
const stream = fs.createReadStream(resolve(__dirname, './animate.js'));

stream.on('close', () => {
    console.log('close');
})
const now = Date.now();
fs.readFile('./aop.js', (err, result) => {
    console.log('poll', Date.now()/*Date.now() - now, 'ms passed'*/);
    // process.nextTick(() => console.log('nextTick'))
});
loop(2);
stream.close();
loop(20);
setImmediate(() => {
    console.log('immediate');
    process.nextTick(() => console.log('nextTick'))
});

