const STORAGE_KEY = "daymark-todos";

export function createTodo(title) {
  const trimmedTitle = title.trim();
  if (!trimmedTitle) {
    throw new Error("A task title is required.");
  }

  return { id: crypto.randomUUID(), title: trimmedTitle, completed: false };
}

export function loadTodos(storage = localStorage) {
  try {
    const todos = JSON.parse(storage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(todos) ? todos : [];
  } catch {
    return [];
  }
}

export function saveTodos(todos, storage = localStorage) {
  storage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export function visibleTodos(todos, filter) {
  if (filter === "active") return todos.filter((todo) => !todo.completed);
  if (filter === "completed") return todos.filter((todo) => todo.completed);
  return todos;
}
