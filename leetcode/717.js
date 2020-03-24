// #717 one bit char

function isOneBitChar (bits) {
    let len = bits.length;

    if (len === 2) {
        return bits[0] === 0 && bits[1] === 0;
    }
    if (len === 1) {
        return bits[0] === 0;
    }

    if (bits[len - 2] === 0) {
        return true;
    }

    return isValid(bits.slice(0, -1)) && !isValid(bits.slice(0, -2));
}

function slice (bits) {
    let len = bits.length;
    if (bits[len - 1] === 0 && bits[len - 2] === 0) {
        return bits.slice(0, -1);
    } else if (bits[len - 1] === 0 && bits[len - 2] === 1 || bits[len - 1] === 1 && bits[len - 2] === 1) {
        return bits.slice(0, -2);
    }
    return bits;
}

function isValid (bits) {
    let len = bits.length;

    if (len === 2) {
        return (bits[0] === 0 && bits[1] === 0) || 
               (bits[0] === 1 && bits[0] === 1) ||
               (bits[0] === 1 && bits[0] === 0);
    }
    if (len === 1) {
        return bits[0] === 0;
    }

    return isValid(slice(bits));
}

console.log(isOneBitChar([0, 1, 1, 0]));