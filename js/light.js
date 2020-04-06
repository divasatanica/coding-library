function red() {
    console.log('red');
}
function green() {
    console.log('green');
}
function yellow() {
    console.log('yellow');
}

function lightUp(fn, time) {
    return new Promise(resolve => {
        fn();
        setTimeout(() => {
            resolve();
        }, time);
    })
}

function light() {
    Promise.resolve().then(() => {
        return lightUp(red, 3000);
    }).then(() => {
        return lightUp(green, 1000);
    }).then(() => {
        return lightUp(yellow, 2000);
    }).then(() => {
        light();
    });
}

// light();

var arr = [1];
var a = 's';
arr.forEach(() => {
    console.log(this.a)
});