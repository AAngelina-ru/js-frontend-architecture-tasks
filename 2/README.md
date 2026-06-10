# Комплексное состояние

Реализуйте и экспортируйте функцию по умолчанию, которая создает на странице TODO-приложение. Это приложение состоит из формы добавления (уже есть на странице) и списка задач, добавленных через форму. Каждая новая задача выводится первой в списке добавленных ранее задач.

Начальный HTML:

```html
<div class="container m-3">
  <form class="form-inline">
    <input type="text" required="required" class="form-control mr-3" name="name">
    <button type="submit" class="btn btn-primary mr-3">add</button>
  </form>
  <ul id="tasks" class="list-group" aria-label="Tasks"></ul>
</div>
```

После добавления двух задач:

```html
<div class="container m-3">
  <form class="form-inline">
    <input type="text" required="required" class="form-control mr-3" name="name">
    <button type="submit" class="btn btn-primary mr-3">add</button>
  </form>
  <ul id="tasks" class="list-group" aria-label="Tasks">
    <li class="list-group-item">Вторая задача</li>
    <li class="list-group-item">Первая задача</li>
  </ul>
</div>
```

У TODO-приложения есть бэкенд. Этот бэкенд умеет получать новые задачи и возвращать список ранее добавленных задач.

```js
import axios from 'axios';
 
// Список добавленных задач GET
const response = await axios.get(routes.tasksPath());
// response.data содержит объект: { items: [{ name: 'имя задачи' }, { ... }]  }
 
// Добавление новой задачи POST
const response = await axios.post(routes.tasksPath(), data); // Где data это { name: 'имя задачи' }
// response.status содержит 201 в случае успеха
```

Во время инициализации (внутри функции), приложение должно делать запрос на сервер, извлекать оттуда уже добавленные задачи и выводить их на экран. Во время добавления новой задачи приложение должно выполнять запрос на добавление задачи на сервер.


import axios from 'axios';

export default function initTodoApp() {
  const form = document.querySelector('.form-inline');
  const input = form.querySelector('input[name="name"]');
  const tasksList = document.getElementById('tasks');

  const loadTasks = async () => {
    try {
      const response = await axios.get(routes.tasksPath());
      const { items } = response.data;

      tasksList.innerHTML = '';
      // Отображаем задачи в обратном порядке, чтобы последняя добавленная была первой
      [...items].reverse().forEach((item) => {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.textContent = item.name;
        tasksList.appendChild(li);
      });
    } catch (error) {
      console.error('Failed to load tasks:', error);
    }
  };

  const addTask = async (taskName) => {
    try {
      const response = await axios.post(routes.tasksPath(), { name: taskName });
      if (response.status === 201) {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.textContent = taskName;
        tasksList.prepend(li); // Добавляем в начало списка
        input.value = ''; // Очищаем поле ввода
      }
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const taskName = input.value.trim();
    if (!taskName) return;
    await addTask(taskName);
  });

  loadTasks();
}
