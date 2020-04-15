function intersect(...arrs) {
    const res = arrs.reduce((acc, curr) => {
        return acc.filter(item => curr.includes(item));
    });

    return [...new Set(res)];
}

console.log(intersect([1,1,1,2,3,5,6,3],[2,3,4],[2,2,2,2,5]))