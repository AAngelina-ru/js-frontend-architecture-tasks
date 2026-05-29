export default function run() {
  const input = document.querySelector('input[type="number"]');
  const plusButton = Array.from(document.querySelectorAll('button')).find(btn => btn.textContent.toLowerCase().includes('plus'));
  const resetButton = Array.from(document.querySelectorAll('button')).find(btn => btn.textContent.toLowerCase().includes('reset'));
  const resultEl = document.getElementById('result');

  let total = 0;
  resultEl.textContent = total;
  input.focus();

  function updateResult(value) {
    total = value;
    resultEl.textContent = total;
  }

  function addValue() {
    const val = input.value;
    if (val !== '') {
      const num = Number(val);
      if (!isNaN(num)) {
        updateResult(total + num);
      }
    }
    input.value = ''; // очищаем поле
    input.focus();
  }

  function reset() {
    updateResult(0);
    input.value = '';
    input.focus();
  }

  plusButton.addEventListener('click', addValue);
  resetButton.addEventListener('click', reset);
}
