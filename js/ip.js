function isInRange(data, unknownIP) {
    let parsedData = data.map(ip => {
        const [left, right] = ip.split('|');

        return [
            left,
            right
        ];
    });

    parsedData.sort((a, b) => a[0] - b[0]);

    let result = {};

    for (let i = 0, len = unknownIP.length; i < len; i ++) {
        let lo = 0;
        let hi = parsedData.length - 1;
        let rangeIndex;
        while (lo <= hi) {
            let mid = Math.floor(lo + ((hi - lo) / 2));

            let midVal = parsedData[mid][0];

            if (midVal < unknownIP[i]) {
                lo = mid + 1;
            } else if (midVal > unknownIP[i]) {
                hi = mid - 1;
            } else {
                rangeIndex = mid;
            }
        }

        rangeIndex = lo - 1;

        let [rangeLeft, rangeRight] = parsedData[rangeIndex];

        if (unknownIP[i] >= rangeLeft && unknownIP[i] <= rangeRight) {
            result[unknownIP[i]] = true;
        } else {
            result[unknownIP[i]] = false;
        }
    }

    return result;
}