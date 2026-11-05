import { createTodo, isOverdue, isValidDueDate, loadTodos, saveTodos, visibleTodos } from "./todos.js";

const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const dueDateInput = document.querySelector("#due-date-input");
const list = document.querySelector("#todo-list");
const count = document.querySelector("#task-count");
const emptyState = document.querySelector("#empty-state");
const storageError = document.querySelector("#storage-error");
const clearButton = document.querySelector("#clear-completed");
const filters = document.querySelectorAll(".filter");
let todos = loadTodos();
let filter = "all";

function render() {
  const filteredTodos = visibleTodos(todos, filter);
  const activeCount = todos.filter((todo) => !todo.completed).length;
  count.textContent = `${activeCount} ${activeCount === 1 ? "task" : "tasks"} left`;
  list.replaceChildren(...filteredTodos.map(todoElement));
  emptyState.hidden = filteredTodos.length > 0;
  emptyState.textContent = filter === "overdue"
    ? "No overdue tasks. You're up to date."
    : "Your list is clear. Add one meaningful task.";
  clearButton.hidden = !todos.some((todo) => todo.completed);
}

function todoElement(todo) {
  const item = document.createElement("li");
  const overdue = isOverdue(todo);
  item.className = `todo-item${todo.completed ? " is-complete" : ""}${overdue ? " is-overdue" : ""}`;
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;
  checkbox.setAttribute("aria-label", `${overdue ? "Overdue. " : ""}Mark ${todo.title} as complete`);
  checkbox.addEventListener("change", () => updateTodo(todo.id, { completed: checkbox.checked }));
  const title = document.createElement("span");
  title.className = "todo-title";
  title.textContent = todo.title;
  const details = document.createElement("span");
  details.className = "todo-details";
  if (isValidDueDate(todo.dueDate)) {
    const dueDate = document.createElement("time");
    dueDate.dateTime = todo.dueDate;
    dueDate.textContent = `Due ${formatDueDate(todo.dueDate)}`;
    details.append(dueDate);
  }
  if (overdue) {
    const overdueStatus = document.createElement("span");
    overdueStatus.className = "overdue-status";
    overdueStatus.textContent = "Overdue";
    details.append(overdueStatus);
  }
  const remove = document.createElement("button");
  remove.className = "delete-button";
  remove.type = "button";
  remove.textContent = "×";
  remove.setAttribute("aria-label", `Delete ${todo.title}`);
  remove.addEventListener("click", () => deleteTodo(todo.id));
  item.append(checkbox, title, details, remove);
  return item;
}

function updateTodo(id, changes) {
  todos = todos.map((todo) => (todo.id === id ? { ...todo, ...changes } : todo));
  persistAndRender();
}

function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  persistAndRender();
}

function persistAndRender() {
  const saved = saveTodos(todos);
  storageError.hidden = saved;
  storageError.textContent = saved ? "" : "Your changes cannot be saved in this browser.";
  render();
}

function formatDueDate(dateValue) {
  const [year, month, day] = dateValue.split("-").map(Number);
  return new Intl.DateTimeFormat(undefined, { day: "numeric", month: "short", year: "numeric" })
    .format(new Date(year, month - 1, day));
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  try {
    todos = [createTodo(input.value, dueDateInput.value), ...todos];
    input.value = "";
    dueDateInput.value = "";
    persistAndRender();
    input.focus();
  } catch {
    input.setCustomValidity("Enter a task before adding it.");
    input.reportValidity();
    input.setCustomValidity("");
  }
});

filters.forEach((button) => button.addEventListener("click", () => {
  filter = button.dataset.filter;
  filters.forEach((item) => item.classList.toggle("is-active", item === button));
  render();
}));

clearButton.addEventListener("click", () => {
  todos = todos.filter((todo) => !todo.completed);
  persistAndRender();
});

render();
