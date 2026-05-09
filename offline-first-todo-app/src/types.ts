export type Todo = {
  id: number;
  text: string;
};

export type QueuedAction = {
  id: number;
  type: "ADD";
  payload: Todo;
};
