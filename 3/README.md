

- import notebooks from './src/index.js';

// Функция для получения текущих значений фильтров из формы
const getFilterValues = () => {
  const brandInput = document.querySelector('#brand');
  const cpuSelect = document.querySelector('#cpu');
  const priceMinInput = document.querySelector('#priceMin');
  const priceMaxInput = document.querySelector('#priceMax');
  const ramSelect = document.querySelector('#ram');

  return {
    brand: brandInput ? brandInput.value.trim().toLowerCase() : '',
    cpu: cpuSelect ? cpuSelect.value : '',
    priceMin: priceMinInput && priceMinInput.value !== '' ? Number(priceMinInput.value) : null,
    priceMax: priceMaxInput && priceMaxInput.value !== '' ? Number(priceMaxInput.value) : null,
    ram: ramSelect ? ramSelect.value : ''
  };
};

// Функция фильтрации ноутбуков по заданным критериям
const filterNotebooks = (items, filters) => {
  return items.filter(notebook => {
    // Фильтр по бренду (частичное совпадение без учёта регистра)
    if (filters.brand && !notebook.brand.toLowerCase().includes(filters.brand)) {
      return false;
    }
    // Фильтр по CPU (точное совпадение, если выбран не 'any')
    if (filters.cpu && filters.cpu !== 'any' && notebook.cpu !== filters.cpu) {
      return false;
    }
    // Фильтр по минимальной цене
    if (filters.priceMin !== null && notebook.price < filters.priceMin) {
      return false;
    }
    // Фильтр по максимальной цене
    if (filters.priceMax !== null && notebook.price > filters.priceMax) {
      return false;
    }
    // Фильтр по RAM (точное совпадение, если выбран не 'any')
    if (filters.ram && filters.ram !== 'any' && notebook.ram !== Number(filters.ram)) {
      return false;
    }
    return true;
  });
};

// Функция отрисовки списка ноутбуков
const render = (items) => {
  const resultContainer = document.querySelector('.result');
  if (!resultContainer) return;

  // Очищаем контейнер
  resultContainer.innerHTML = '';

  if (items.length === 0) return; // ничего не выводим, если список пуст

  const ul = document.createElement('ul');
  items.forEach(notebook => {
    const li = document.createElement('li');
    li.textContent = notebook.model;
    ul.appendChild(li);
  });
  resultContainer.appendChild(ul);
};

// Основная функция, которая инициализирует фильтрацию
const initFilter = () => {
  // Получаем все элементы формы, на которые нужно подписаться
  const brandInput = document.querySelector('#brand');
  const cpuSelect = document.querySelector('#cpu');
  const priceMinInput = document.querySelector('#priceMin');
  const priceMaxInput = document.querySelector('#priceMax');
  const ramSelect = document.querySelector('#ram');

  // Обработчик обновления результатов
  const updateResults = () => {
    const filters = getFilterValues();
    const filtered = filterNotebooks(notebooks, filters);
    render(filtered);
  };

  // Подписываемся на события изменений
  if (brandInput) brandInput.addEventListener('input', updateResults);
  if (cpuSelect) cpuSelect.addEventListener('change', updateResults);
  if (priceMinInput) priceMinInput.addEventListener('input', updateResults);
  if (priceMaxInput) priceMaxInput.addEventListener('input', updateResults);
  if (ramSelect) ramSelect.addEventListener('change', updateResults);

  // Первоначальная отрисовка (фильтры пусты → все ноутбуки)
  updateResults();
};

export default initFilter;
