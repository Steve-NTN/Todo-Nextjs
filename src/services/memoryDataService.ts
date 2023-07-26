import { Dispatch, SetStateAction } from "react";

export type TodoItemType = {
  title: string;
  isCompleted: boolean;
  caculatorNumber: number;
};

export type TodoType = {
  id?: string;
  title?: string;
  type?: string;
  createDate?: string;
  items?: TodoItemType[] | [];
};

export type TodoItemListType = {
  todoData?: TodoType;
  setTodoData: Dispatch<SetStateAction<TodoType>>;
};

let TODOS: TodoType[] = [];

// get
const getTodos = () => {
  return TODOS;
};

// post
const postTodo = (resData: any) => {
  TODOS.push({
    id: resData.id,
    title: resData.title,
    type: resData.type,
    createDate: new Date().toDateString(),
  });
};

// put
const putTodo = (resData: any) => {
  console.log(resData);
  TODOS = TODOS.map((todo) => (todo?.id === resData?.id ? resData : todo));
};

// delete
const deleteTodo = (id: string) => {
  TODOS = TODOS.filter((todo) => todo?.id !== id);
};

export { getTodos, postTodo, deleteTodo, putTodo };
