function getMax(str) {
    let l = 0,
        r = 0;
    const map = {};
    let maxCount = 0,
        count = 0;

    while (r <= str.length) {
        const char = str[r];

        if (char !== str[l]) {

            // 若字符和前面不相同，结束统计，更新最大值，窗口左端右移到当前位置，重置 count
            if (count >= maxCount) {
                maxChar = str[r-1];
                maxCount = count;
                if (map[maxCount]) {
                    map[maxCount].push(str[r-1]);
                } else {
                    map[maxCount] = [str[r-1]];
                }
            }
            count = 0;
            l = r;
            continue;
        }

        // 若字符和前面相同，继续统计，移动窗口右端点
        count ++;
        r ++;
    }
    const maxChars = map[maxCount];
    const result = {};

    maxChars.forEach(c => {
        result[c] = maxCount;
    });

    return result;
}

console.log(getMax('abbbkejsbcccwqaa'));