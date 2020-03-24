function xor(a, b) {
    if (a === b) {
        if (a === "1") {
            return ["0", "1"];
        }
        return ["0", "0"];
    }
    return ["1", "0"];
}

function padZero(m, n) {
    let mb = m.toString(2);
    let nb = n.toString(2);

    if (mb.length > nb.length) {
        nb = ("0").repeat(mb.length - nb.length).concat(nb);
    } else if (nb.length > mb.length) {
        mb = ("0").repeat(nb.length - mb.length).concat(mb);
    }

    return [mb.replace(/-/g, "0"), nb.replace(/-/g, "0")];
}

function reverse(n) {
    let result = [];
    for (let i = 0, len = n.length; i < len; i ++) {
        if (n[i] === "0") {
            result.push("1");
        } else if (n[i] === "1") {
            result.push("0");
        }
    }

    return result.join("");
}

function processFactor(m, n) {
    let signed = false;
    if (m < 0 || n < 0) {
        signed = true;
    }
    if (m < 0 && n < 0) {
        signed = false;
    }
    let [mb, nb] = padZero(m, n);
    if (signed) {
        if (m < 0) {
            console.log("MB:", mb, reverse(mb.replace("-", "0")), 2)
            const [add1, add2] = padZero(parseInt(reverse(nb.replace("-", "0")), 2), 1);
            mb = bAdd(add1, add2);
            console.log("mb:", mb);
        }
        if (n < 0) {
            console.log("NB:", nb, reverse(nb.replace("-", "0")), 2)
            const [add1, add2] = padZero(parseInt(reverse(nb.replace("-", "0")), 2), 1);
            nb = bAdd(add1, add2);
            console.log("nb:", nb);
        }
    }

    return padZero(parseInt(mb, 2), parseInt(nb, 2));
}

// function bAdd(mb, nb) {
//     let carry = "0";
//     let result = [];
//     for (let i = mb.length - 1; i > -1; i --) {
//         let [_r, _c] = xor(mb[i], nb[i]);
//         console.log("***********");
//         console.log(_r, _c, carry);
//         if (carry === "1") {
//             const _ = xor(_r, carry);
//             result.unshift(_[0]);
//             carry = _[1];
//         } else {
//             carry = _c;
//             result.unshift(_r);
//         }
//     }

//     if (carry !== "0") {
//         result.unshift("1");
//     }

//     return result.join("");
// }

function bAdd (a, b) {
    let lenToPad = Math.abs(a.length - b.length),
        globalCarry = 0,
        result = "";
    
    (a.length < b.length) ? (a = ("0").repeat(lenToPad) + a) : (b = ("0").repeat(lenToPad) + b);
    for (let i = a.length - 1; i >= 0; i --) {
        let [sum, carry] = carrySum(+a[i], +b[i], globalCarry);
        result = sum + result;
        globalCarry = carry;
    }
    if (globalCarry === 1) {
        result = "1" + result;
    }
    return result;
    
}

function carrySum (a, b, c) {
    return a + b + c >= 2 ? [(a + b + c) % 2, 1] : [a + b + c, 0]; 
}

function add(m, n) {
    const [mb, nb] = processFactor(m, n);
    let signed = false;
    if (m < 0 || n < 0) {
        signed = true;
    }
    if (m < 0 && n < 0) {
        signed = false;
    }
    const result = bAdd(mb, nb);

    // console.log("result:", result);
    if (signed) {
        return parseInt(result.slice(-mb.length), 2);
    }
    
    return (m < 0 && n < 0) ? -parseInt(result, 2) : parseInt(result, 2);
}

console.log(add(-12, -8));