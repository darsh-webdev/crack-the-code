import { type Todo } from "./types";

export async function syncTodo(todo: Todo): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  // simulate random API failure
  if (Math.random() < 0.2) {
    throw new Error("Failed to sync");
  }
}
