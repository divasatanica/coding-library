var calculate = function(s) {
    const operators = [];
    const operands = [];
    let buf = '';
    
    s = s.replace(/\s+/g, '');
    s = `(${s})`;
    let cur = s.length - 1;
    while (cur > -1) {
        if ('1234567890'.indexOf(s[cur]) > -1) {
            buf = s[cur] + buf;
        } else if (['+', '-', ')'].indexOf(s[cur]) > -1) {
            if (buf.length > 0) {
                operands.push(Number(buf));
                buf = '';
            }
            operators.push(s[cur]);
        } else if (s[cur] === '(') {
            if (buf.length > 0) {
                operands.push(Number(buf));
                buf = '';
            }
            let operator = operators.pop();
            while (operator !== ')') {
                const a = operands.pop();
                const b = operands.pop();

                operands.push(cal(operator, [a, b]));
                operator = operators.pop();
            }
            
        }
        cur --;
    }

    while (operators.length) {
        let operator = operators.pop();
        const a = operands.pop();
        const b = operands.pop();

        operands.push(cal(operator, [a, b]));
    }

    return operands.pop();
};

console.log(calculate("(1+(4+5+2)-3)+(6+8)"));

function cal(operator, operand) {
    const [a, b] = operand;
    switch (operator) {
        case '+': {
            return a + b;
        }
        case '-': {
            return a - b;
        }
    }
}