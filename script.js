let display = document.getElementById('display');

function appendNumber(num) {
    if (display.value === '0' && num !== '.') {
        display.value = num;
    } else if (num === '.' && display.value.includes('.')) {
        return;
    } else {
        display.value += num;
    }
}

function appendOperator(op) {
    if (display.value === '') return;
    
    const lastChar = display.value.slice(-1);
    if (['+', '-', '*', '/', '%'].includes(lastChar)) {
        display.value = display.value.slice(0, -1) + op;
    } else {
        display.value += op;
    }
}

function clearDisplay() {
    display.value = '0';
}

function deleteLast() {
    if (display.value.length === 1) {
        display.value = '0';
    } else {
        display.value = display.value.slice(0, -1);
    }
}

function calculate() {
    try {
        if (display.value === '') return;
        
        const lastChar = display.value.slice(-1);
        if (['+', '-', '*', '/', '%'].includes(lastChar)) {
            display.value = display.value.slice(0, -1);
        }
        
        const expression = display.value.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
        const result = Function('"use strict"; return (' + expression + ')')();
        
        display.value = parseFloat(result.toFixed(10));
    } catch (error) {
        display.value = 'Error';
        setTimeout(() => {
            display.value = '0';
        }, 1500);
    }
}

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
    if (e.key === '.') appendNumber('.');
    if (e.key === '+') {
        e.preventDefault();
        appendOperator('+');
    }
    if (e.key === '-') {
        e.preventDefault();
        appendOperator('-');
    }
    if (e.key === '*') {
        e.preventDefault();
        appendOperator('*');
    }
    if (e.key === '/') {
        e.preventDefault();
        appendOperator('/');
    }
    if (e.key === '%') {
        e.preventDefault();
        appendOperator('%');
    }
    if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calculate();
    }
    if (e.key === 'Backspace') {
        e.preventDefault();
        deleteLast();
    }
    if (e.key === 'Escape') {
        clearDisplay();
    }
});