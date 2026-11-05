import assert from "node:assert/strict";
import test from "node:test";
import { createTodo, loadTodos, saveTodos, visibleTodos } from "../src/todos.js";

test("creates a trimmed active todo", () => {
  const todo = createTodo("  Plan release  ");
  assert.equal(todo.title, "Plan release");
  assert.equal(todo.completed, false);
  assert.ok(todo.id);
});

test("rejects an empty todo title", () => {
  assert.throws(() => createTodo("   "), /required/);
});

test("filters active and completed todos", () => {
  const todos = [{ title: "Active", completed: false }, { title: "Done", completed: true }];
  assert.deepEqual(visibleTodos(todos, "active"), [todos[0]]);
  assert.deepEqual(visibleTodos(todos, "completed"), [todos[1]]);
});

test("saves and loads todos using supplied storage", () => {
  const storage = new Map();
  const adapter = { getItem: (key) => storage.get(key) || null, setItem: (key, value) => storage.set(key, value) };
  const todos = [{ id: "1", title: "Persisted", completed: false }];
  saveTodos(todos, adapter);
  assert.deepEqual(loadTodos(adapter), todos);
});
