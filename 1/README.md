# Состояние приложения

В этом задании необходимо реализовать простой калькулятор, который умеет только складывать. Но делает это для любого количества чисел, а не только двух.

## Задание

Реализуйте и экспортируйте по умолчанию функцию, реализующую приложение «суммирующий калькулятор». Калькулятор представляет из себя одно поле для ввода чисел и две кнопки: сложение и сброс. Под калькулятором выводится текущая сумма, которая изначально равна нулю. Каждое нажатие кнопки plus добавляет к этой сумме введенное значение. Нажатие кнопки сброс возвращает состояние к первоначальному (сумма устанавливается в 0).

Сделайте калькулятор дружественным пользователю: устанавливайте фокус на поле для ввода при каждой отрисовке формы (включая первую) и очищайте форму после отправки/очистки.



import React, { useState, useEffect, useRef } from 'react';

const Calculator = () => {
  const [sum, setSum] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const number = parseFloat(inputValue);
    if (!isNaN(number)) {
      setSum(prevSum => prevSum + number);
    }
    setInputValue('');
  };

  const handleReset = () => {
    setSum(0);
    setInputValue('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          ref={inputRef}
        />
        <button type="submit">плюс</button>
        <button type="button" onClick={handleReset}>сброс</button>
      </form>
      <div>Сумма: {sum}</div>
    </div>
  );
};

export default Calculator;
