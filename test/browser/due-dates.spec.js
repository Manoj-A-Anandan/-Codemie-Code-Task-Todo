import { expect, test } from "@playwright/test";

async function addTodo(page, title, dueDate) {
  await page.locator("#todo-input").fill(title);
  if (dueDate) await page.locator("#due-date-input").fill(dueDate);
  await page.getByRole("button", { name: "Add task" }).click();
}

test("should display a selected due date when a Todo is created", async ({ page }) => {
  await page.goto("/");
  await addTodo(page, "Prepare sprint demo", "2099-11-06");

  const todo = page.locator(".todo-item", { hasText: "Prepare sprint demo" });
  await expect(todo.locator("time")).toHaveAttribute("datetime", "2099-11-06");
  await expect(todo).not.toContainText("Overdue");
});

test("should show only incomplete overdue Todos when the Overdue filter is selected", async ({ page }) => {
  await page.goto("/");
  await addTodo(page, "Past due task", "2020-01-01");
  await addTodo(page, "Future task", "2099-01-01");
  await page.getByRole("button", { name: "Overdue" }).click();

  await expect(page.locator(".todo-item")).toHaveCount(1);
  await expect(page.locator(".todo-item")).toContainText("Past due task");
  await expect(page.locator(".todo-item")).toHaveClass(/is-overdue/);
  await expect(page.locator(".todo-item").getByRole("checkbox")).toHaveAccessibleName("Overdue. Mark Past due task as complete");
});

test("should remove overdue state when an overdue Todo is completed", async ({ page }) => {
  await page.goto("/");
  await addTodo(page, "Past due task", "2020-01-01");
  const todo = page.locator(".todo-item", { hasText: "Past due task" });

  await todo.getByRole("checkbox").check();
  await expect(todo).not.toHaveClass(/is-overdue/);
  await expect(todo).not.toContainText("Overdue");
});

test("should show an empty state when no overdue Todos exist", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Overdue" }).click();

  await expect(page.locator("#empty-state")).toBeVisible();
  await expect(page.locator("#empty-state")).toHaveText("No overdue tasks. You're up to date.");
});
