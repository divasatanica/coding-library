function newInstanceof (a, b) {
    let proto = b.prototype;

    while (a) {
        if (a.__proto__ === proto) {
            return true;
        }
        a = a.__proto__;
    }
    return false;
}

console.log(newInstanceof({}, Object));