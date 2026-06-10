import '@testing-library/jest-dom';
import fs from 'fs';
import path from 'path';
import { fireEvent, screen } from '@testing-library/dom';

import run from '../src/application.js';

beforeEach(() => {
  const initHtml = fs.readFileSync(path.join('__fixtures__', 'index.html')).toString();
  document.body.innerHTML = initHtml;
  run();
});

test('working process 1', async () => {
  const submit = screen.getByRole('button', { name: /plus/i });
  const input = screen.getByRole('spinbutton');
  const reset = screen.getByRole('button', { name: /reset/i });
  const result = document.getElementById('result');
  expect(input).toHaveFocus();
  expect(result).toHaveTextContent(/^0$/);

  await fireEvent.change(input, { target: { value: '3' } });
  await fireEvent.click(submit);
  expect(input).toHaveFocus();
  expect(input).toHaveValue(null);
  expect(result).toHaveTextContent(/^3$/);

  await fireEvent.change(input, { target: { value: '10' } });
  await fireEvent.click(submit);
  expect(input).toHaveValue(null);
  expect(result).toHaveTextContent(/^13$/);

  await fireEvent.change(input, { target: { value: '7' } });
  await fireEvent.click(submit);
  expect(input).toHaveValue(null);
  expect(result).toHaveTextContent(/^20$/);

  await fireEvent.click(reset);
  expect(input).toHaveValue(null);
  expect(result).toHaveTextContent(/^0$/);

  await fireEvent.change(input, { target: { value: '10' } });
  await fireEvent.click(submit);
  expect(input).toHaveValue(null);
  expect(result).toHaveTextContent(/^10$/);

  await fireEvent.change(input, { target: { value: '7' } });
  await fireEvent.click(submit);
  expect(input).toHaveValue(null);
  expect(result).toHaveTextContent(/^17$/);
});

test('working process 2', async () => {
  const result = document.getElementById('result');
  const submit = screen.getByRole('button', { name: /plus/i });
  const input = screen.getByRole('spinbutton');

  expect(input).toHaveFocus();
  expect(result).toHaveTextContent(/^0$/);

  await fireEvent.change(input, { target: { value: '3' } });
  await fireEvent.click(submit);
  expect(input).toHaveValue(null);
  expect(result).toHaveTextContent(/^3$/);
});
// src/application.js
export default function run() {
  const input = document.querySelector('input[role="spinbutton"]');
  const plusButton = document.querySelector('button[aria-label="plus"], button:contains("Plus")');
  const resetButton = document.querySelector('button[aria-label="reset"], button:contains("Reset")');
  const resultDiv = document.getElementById('result');

  let currentValue = 0;
  resultDiv.textContent = currentValue;

  function clearInput() {
    input.value = '';          // clears the input
    input.focus();
  }

  function updateResult(newValue) {
    currentValue = newValue;
    resultDiv.textContent = currentValue;
  }

  function handlePlus() {
    let addend = parseInt(input.value, 10);
    if (isNaN(addend)) addend = 0;
    updateResult(currentValue + addend);
    clearInput();
  }

  function handleReset() {
    updateResult(0);
    clearInput();
  }

  plusButton.addEventListener('click', handlePlus);
  resetButton.addEventListener('click', handleReset);

  // Initial focus
  input.focus();
}
