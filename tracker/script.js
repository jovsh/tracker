const form = document.getElementById('expense-form');
const titleInput = document.getElementById('title');
const amountInput = document.getElementById('amount');
const dateInput = document.getElementById('date');
const expenseList = document.getElementById('expense-list');
const totalAmount = document.getElementById('total-amount');

let expenses = [];

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const title = titleInput.value;
  const amount = parseFloat(amountInput.value);
  const date = dateInput.value;

  if (!title || !amount || !date) return;

  const expense = {
    id: Date.now(),
    title,
    amount,
    date
  };

  expenses.push(expense);
  renderExpenses();
  form.reset();
});

function renderExpenses() {
  expenseList.innerHTML = '';
  let total = 0;

  expenses.forEach(expense => {
    const card = document.createElement('div');
    card.className = 'expense-card';

    card.innerHTML = `
      <div class="expense-info">
        <strong>${expense.title}</strong><br/>
        ₹${expense.amount.toFixed(2)}<br/>
        <small>${expense.date}</small>
      </div>
      <button class="delete-btn" onclick="deleteExpense(${expense.id})">🗑️</button>
    `;

    expenseList.appendChild(card);
    total += expense.amount;
  });

  totalAmount.textContent = total.toFixed(2);
}

function deleteExpense(id) {
  expenses = expenses.filter(exp => exp.id !== id);
  renderExpenses();
}
