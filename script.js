// Exchange rate: 1 EUR = 1.95583 BGN
const EXCHANGE_RATE = 1.95583;

const totalToPayInput = document.getElementById('totalToPay');
const paymentAmountInput = document.getElementById('paymentAmount');
const currencySelect = document.getElementById('currency');
const calculateBtn = document.getElementById('calculateBtn');
const resultContainer = document.getElementById('result');
const changeAmountSpan = document.getElementById('changeAmount');
const errorMessage = document.getElementById('error');

calculateBtn.addEventListener('click', calculateChange);

// Allow Enter key to trigger calculation
paymentAmountInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        calculateChange();
    }
});

function calculateChange() {
    // Clear previous messages
    errorMessage.classList.add('hidden');
    resultContainer.classList.add('hidden');

    // Get input values
    const totalToPay = parseFloat(totalToPayInput.value);
    const paymentAmount = parseFloat(paymentAmountInput.value);
    const currency = currencySelect.value;

    // Validate inputs
    if (isNaN(totalToPay) || isNaN(paymentAmount)) {
        showError('Please enter valid numbers for both fields');
        return;
    }

    if (totalToPay <= 0 || paymentAmount <= 0) {
        showError('Both amounts must be greater than zero');
        return;
    }

    // Convert payment amount to EUR if needed
    let paymentInEUR = paymentAmount;
    if (currency === 'BGN') {
        paymentInEUR = paymentAmount / EXCHANGE_RATE;
    }

    // Calculate change
    const change = paymentInEUR - totalToPay;

    // Check if payment is sufficient
    if (change < 0) {
        showError(`Insufficient payment. Amount needed: ${Math.abs(change).toFixed(2)} EUR more`);
        return;
    }

    // Display change
    changeAmountSpan.textContent = change.toFixed(2);
    resultContainer.classList.remove('hidden');
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}
