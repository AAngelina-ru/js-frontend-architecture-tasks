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
