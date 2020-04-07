function flat(arr) {
    if (!arr || arr.length < 2) {
        return arr;
    }

    const result = arr.reduce((acc, curr) => {
        if (!Array.isArray(curr)) {
            const result = [...new Set([...acc, curr])];
            if (curr < acc[acc.length - 1]) {
                result.sort((a, b) => a - b);
            }
            return result;
        } else {
            return [...acc, ...flat(curr)];
        }
    }, []);

    return result;
}

var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];

console.log(flat(arr));