function A () {

}

setTimeout(() => {
    A = {};
}, 2000);

export default A;