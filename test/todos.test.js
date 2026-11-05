import assert from "node:assert/strict";
import test from "node:test";
import { createTodo, isOverdue, isValidDueDate, loadTodos, localDateToday, saveTodos, visibleTodos } from "../src/todos.js";

test("should create a trimmed active Todo with an optional due date", () => {
  const todo = createTodo("  Plan release  ", "2026-11-06");
  assert.equal(todo.title, "Plan release");
  assert.equal(todo.completed, false);
  assert.equal(todo.dueDate, "2026-11-06");
  assert.ok(todo.id);
});

test("should reject an empty Todo title", () => {
  assert.throws(() => createTodo("   "), /required/);
});

test("should reject an invalid due date", () => {
  assert.throws(() => createTodo("Plan release", "2026-02-30"), /due date/);
  assert.equal(isValidDueDate("2026-02-30"), false);
  assert.equal(isValidDueDate("2026-11-05"), true);
});

test("should identify only incomplete past-due tasks as overdue", () => {
  assert.equal(isOverdue({ dueDate: "2026-11-04", completed: false }, "2026-11-05"), true);
  assert.equal(isOverdue({ dueDate: "2026-11-05", completed: false }, "2026-11-05"), false);
  assert.equal(isOverdue({ dueDate: "2026-11-04", completed: true }, "2026-11-05"), false);
  assert.equal(isOverdue({ dueDate: "invalid", completed: false }, "2026-11-05"), false);
});

test("should format the current local calendar date without UTC conversion", () => {
  assert.equal(localDateToday(new Date(2026, 10, 5, 23, 30)), "2026-11-05");
});

test("should filter active, completed, and overdue Todos", () => {
  const todos = [
    { title: "Active", completed: false, dueDate: "2026-11-06" },
    { title: "Late", completed: false, dueDate: "2026-11-04" },
    { title: "Done", completed: true, dueDate: "2026-11-04" },
  ];
  assert.deepEqual(visibleTodos(todos, "active"), [todos[0], todos[1]]);
  assert.deepEqual(visibleTodos(todos, "completed"), [todos[2]]);
  assert.deepEqual(visibleTodos(todos, "overdue", "2026-11-05"), [todos[1]]);
});

test("should save and load Todos using supplied storage", () => {
  const storage = new Map();
  const adapter = { getItem: (key) => storage.get(key) || null, setItem: (key, value) => storage.set(key, value) };
  const todos = [{ id: "1", title: "Persisted", completed: false }];
  saveTodos(todos, adapter);
  assert.deepEqual(loadTodos(adapter), todos);
});

test("should report a failed Todo save without throwing", () => {
  const storage = { setItem: () => { throw new Error("Storage quota exceeded"); } };
  assert.equal(saveTodos([{ id: "1" }], storage), false);
});

test("should create a Todo without a due date when the date is empty", () => {
  const todo = createTodo("Inbox zero", "");
  assert.equal(todo.dueDate, undefined);
  assert.equal(isOverdue(todo, "2026-11-05"), false);
});

test("should preserve legacy Todos that do not have a due date", () => {
  const storage = new Map();
  const adapter = { getItem: (key) => storage.get(key) || null, setItem: (key, value) => storage.set(key, value) };
  const legacyTodos = [{ id: "1", title: "Legacy", completed: false }];
  storage.set("daymark-todos", JSON.stringify(legacyTodos));
  assert.deepEqual(loadTodos(adapter), legacyTodos);
  assert.equal(isOverdue(legacyTodos[0], "2026-11-05"), false);
});

test("should retain invalid legacy due dates without treating them as overdue", () => {
  const storage = new Map();
  const adapter = { getItem: (key) => storage.get(key) || null, setItem: (key, value) => storage.set(key, value) };
  const todos = [{ id: "1", title: "Legacy", completed: false, dueDate: "2026-02-30" }];
  storage.set("daymark-todos", JSON.stringify(todos));
  assert.deepEqual(loadTodos(adapter), todos);
  assert.equal(isOverdue(todos[0], "2026-11-05"), false);
});

test("should discard invalid stored Todo entries", () => {
  const storage = { getItem: () => JSON.stringify([null, { title: "Valid", completed: false }, { title: 2, completed: false }]) };
  assert.deepEqual(loadTodos(storage), [{ title: "Valid", completed: false }]);
  assert.equal(isOverdue(null, "2026-11-05"), false);
});

test("should return an empty list when stored Todo data is malformed", () => {
  const storage = { getItem: () => "not-json" };
  assert.deepEqual(loadTodos(storage), []);
});

test("should return all Todos for an unknown filter", () => {
  const todos = [{ title: "One", completed: false }];
  assert.deepEqual(visibleTodos(todos, "missing-filter"), todos);
});
