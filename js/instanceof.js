function newInstanceof (a, b) {
    let proto = b.prototype;

    while (a) {
        const __proto__ = Object.getPrototypeOf(a)
        if (__proto__ === proto) {
            return true;
        }
        a = __proto__;
    }
    return false;
}

console.log(newInstanceof({}, Object));