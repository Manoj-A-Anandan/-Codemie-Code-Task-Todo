import { createTodo, loadTodos, saveTodos, visibleTodos } from "./todos.js";

const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const list = document.querySelector("#todo-list");
const count = document.querySelector("#task-count");
const emptyState = document.querySelector("#empty-state");
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
  clearButton.hidden = !todos.some((todo) => todo.completed);
}

function todoElement(todo) {
  const item = document.createElement("li");
  item.className = `todo-item${todo.completed ? " is-complete" : ""}`;
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;
  checkbox.setAttribute("aria-label", `Mark ${todo.title} as complete`);
  checkbox.addEventListener("change", () => updateTodo(todo.id, { completed: checkbox.checked }));
  const title = document.createElement("span");
  title.className = "todo-title";
  title.textContent = todo.title;
  const remove = document.createElement("button");
  remove.className = "delete-button";
  remove.type = "button";
  remove.textContent = "×";
  remove.setAttribute("aria-label", `Delete ${todo.title}`);
  remove.addEventListener("click", () => deleteTodo(todo.id));
  item.append(checkbox, title, remove);
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
  saveTodos(todos);
  render();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  try {
    todos = [createTodo(input.value), ...todos];
    input.value = "";
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
