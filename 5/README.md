# Нормализация данных

В этой задаче предстоит реализовать типовой планировщик задач, который позволяет создавать задачи и списки задач. По умолчанию сразу должен быть создан список General. Начальный HTML-код доступен в файле `index.html`. После инициализации JS он становится таким (туда добавляется General):

```html
<div class="row">
  <div class="col">
    <h3>Lists</h3>
    <form class="form-inline mb-2" data-container="new-list-form">
      <label for="new-list-name" class="sr-only">New list name</label>
      <input
        type="text"
        id="new-list-name"
        class="form-control mr-2"
        name="name"
        required
      />
      <input type="submit" class="btn btn-primary" value="Add List" />
    </form>
    <div data-container="lists">
      <ul>
        <li><b>General</b></li>
      </ul>
    </div>
  </div>
  <div class="col">
    <h3>Tasks</h3>
    <form class="form-inline mb-2" data-container="new-task-form">
      <label for="new-task-name" class="sr-only">New task name</label>
      <input
        type="text"
        id="new-task-name"
        class="form-control mr-2"
        name="name"
        required
      />
      <input type="submit" class="btn btn-primary" value="Add Task" />
    </form>
    <div data-container="tasks"></div>
  </div>
</div>
```

После добавления первой задачи в список General:

```html
<div class="row">
  <div class="col">
    <h3>Lists</h3>
    <form class="form-inline mb-2" data-container="new-list-form">
      <label for="new-list-name" class="sr-only">New list name</label>
      <input
        type="text"
        id="new-list-name"
        class="form-control mr-2"
        name="name"
        required
      />
      <input type="submit" class="btn btn-primary" value="Add List" />
    </form>
    <div data-container="lists">
      <ul>
        <li><b>General</b></li>
      </ul>
    </div>
  </div>
  <div class="col">
    <h3>Tasks</h3>
    <form class="form-inline mb-2" data-container="new-task-form">
      <label for="new-task-name" class="sr-only">New task name</label>
      <input
        type="text"
        id="new-task-name"
        class="form-control mr-2"
        name="name"
        required
      />
      <input type="submit" class="btn btn-primary" value="Add Task" />
    </form>
    <div data-container="tasks">
      <ul>
        <li>My First Task</li>
      </ul>
    </div>
  </div>
</div>
```

После создания нового списка (но до переключения на него):

```html
<div class="row">
  <div class="col">
    <h3>Lists</h3>
    <form class="form-inline mb-2" data-container="new-list-form">
      <label for="new-list-name" class="sr-only">New list name</label>
      <input
        type="text"
        id="new-list-name"
        class="form-control mr-2"
        name="name"
        required
      />
      <input type="submit" class="btn btn-primary" value="Add List" />
    </form>
    <div data-container="lists">
      <ul>
        <li><b>General</b></li>
        <li><a href="#random">Random</a></li>
      </ul>
    </div>
  </div>
  <div class="col">
    <h3>Tasks</h3>
    <form class="form-inline mb-2" data-container="new-task-form">
      <label for="new-task-name" class="sr-only">New task name</label>
      <input
        type="text"
        id="new-task-name"
        class="form-control mr-2"
        name="name"
        required
      />
      <input type="submit" class="btn btn-primary" value="Add Task" />
    </form>
    <div data-container="tasks">
      <ul>
        <li>My First Task</li>
      </ul>
    </div>
  </div>
</div>
```

После переключения на список Random (клик по имени):

```html
<div class="row">
  <div class="col">
    <h3>Lists</h3>
    <form class="form-inline mb-2" data-container="new-list-form">
      <label for="new-list-name" class="sr-only">New list name</label>
      <input
        type="text"
        id="new-list-name"
        class="form-control mr-2"
        name="name"
        required
      />
      <input type="submit" class="btn btn-primary" value="Add List" />
    </form>
    <div data-container="lists">
      <ul>
        <li><a href="#general">General</a></li>
        <li><b>Random</b></li>
      </ul>
    </div>
  </div>
  <div class="col">
    <h3>Tasks</h3>
    <form class="form-inline mb-2" data-container="new-task-form">
      <label for="new-task-name" class="sr-only">New task name</label>
      <input
        type="text"
        id="new-task-name"
        class="form-control mr-2"
        name="name"
        required
      />
      <input type="submit" class="btn btn-primary" value="Add Task" />
    </form>
    <div data-container="tasks"></div>
  </div>
</div>
```
export default function taskScheduler() {
  // Состояние приложения
  let lists = ['General'];
  let currentList = 'General';
  let tasks = {
    'General': []
  };

  // DOM элементы
  const listsContainer = document.querySelector('[data-container="lists"]');
  const tasksContainer = document.querySelector('[data-container="tasks"]');
  const newListForm = document.querySelector('[data-container="new-list-form"]');
  const newTaskForm = document.querySelector('[data-container="new-task-form"]');

  // Функция для рендеринга списков
  function renderLists() {
    const ul = document.createElement('ul');
    
    lists.forEach(listName => {
      const li = document.createElement('li');
      
      if (listName === currentList) {
        li.innerHTML = `<b>${escapeHtml(listName)}</b>`;
      } else {
        const link = document.createElement('a');
        link.href = `#${listName.toLowerCase()}`;
        link.textContent = listName;
        link.addEventListener('click', (e) => {
          e.preventDefault();
          switchToList(listName);
        });
        li.appendChild(link);
      }
      
      ul.appendChild(li);
    });
    
    // Очищаем и обновляем контейнер
    listsContainer.innerHTML = '';
    listsContainer.appendChild(ul);
  }

  // Функция для рендеринга задач текущего списка
  function renderTasks() {
    const currentTasks = tasks[currentList] || [];
    
    if (currentTasks.length === 0) {
      tasksContainer.innerHTML = '';
      return;
    }
    
    const ul = document.createElement('ul');
    
    currentTasks.forEach(taskName => {
      const li = document.createElement('li');
      li.textContent = taskName;
      ul.appendChild(li);
    });
    
    tasksContainer.innerHTML = '';
    tasksContainer.appendChild(ul);
  }

  // Функция для переключения на другой список
  function switchToList(listName) {
    if (lists.includes(listName)) {
      currentList = listName;
      renderLists();
      renderTasks();
    }
  }

  // Функция для добавления нового списка
  function addList(listName) {
    const trimmedName = listName.trim();
    
    // Проверка на пустое имя и уникальность
    if (!trimmedName || lists.includes(trimmedName)) {
      return false;
    }
    
    lists.push(trimmedName);
    tasks[trimmedName] = [];
    renderLists();
    return true;
  }

  // Функция для добавления новой задачи
  function addTask(taskName) {
    const trimmedName = taskName.trim();
    
    if (!trimmedName) {
      return false;
    }
    
    if (!tasks[currentList]) {
      tasks[currentList] = [];
    }
    
    tasks[currentList].push(trimmedName);
    renderTasks();
    return true;
  }

  // Функция для экранирования HTML символов
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // Обработчик формы добавления списка
  newListForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newListForm.querySelector('#new-list-name');
    if (input && input.value) {
      addList(input.value);
      input.value = '';
    }
  });

  // Обработчик формы добавления задачи
  newTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newTaskForm.querySelector('#new-task-name');
    if (input && input.value) {
      addTask(input.value);
      input.value = '';
    }
  });

  // Инициализация: рендерим начальное состояние
  renderLists();
  renderTasks();
}
