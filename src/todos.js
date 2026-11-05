const STORAGE_KEY = "daymark-todos";

export function createTodo(title, dueDate) {
  const trimmedTitle = title.trim();
  if (!trimmedTitle) {
    throw new Error("A task title is required.");
  }

  return { id: crypto.randomUUID(), title: trimmedTitle, completed: false, dueDate: normalizeDueDate(dueDate) };
}

export function normalizeDueDate(dueDate) {
  if (dueDate === undefined || dueDate === null || dueDate === "") {
    return undefined;
  }

  if (!isValidDueDate(dueDate)) {
    throw new Error("A due date must be a valid date.");
  }

  return dueDate;
}

export function isOverdue(todo, currentDate = localDateToday()) {
  return Boolean(todo) && !todo.completed && isValidDueDate(todo.dueDate) && todo.dueDate < currentDate;
}

export function isValidDueDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

export function localDateToday(now = new Date()) {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function loadTodos(storage = localStorage) {
  try {
    const todos = JSON.parse(storage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(todos) ? todos.filter(isTodoRecord) : [];
  } catch {
    return [];
  }
}

function isTodoRecord(todo) {
  return todo !== null && typeof todo === "object" && typeof todo.title === "string" && typeof todo.completed === "boolean";
}

export function saveTodos(todos, storage = localStorage) {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(todos));
    return true;
  } catch {
    return false;
  }
}

export function visibleTodos(todos, filter, currentDate) {
  if (filter === "active") return todos.filter((todo) => !todo.completed);
  if (filter === "completed") return todos.filter((todo) => todo.completed);
  if (filter === "overdue") return todos.filter((todo) => isOverdue(todo, currentDate));
  return todos;
}
