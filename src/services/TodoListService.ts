
import API from "./api";

const fetchTodos = () => {
  return API("todos")
    ?.then((res) => {
      return res?.data;
    })
    ?.catch((err) => {
      console.log(err);
    });
};

const removeTodo = (id?: string) => {
  return API(`todos?id=${id}`, { method: "DELETE" })
    ?.then((res) => {
    })
    ?.catch((err) => {});
};

const createTodo = (todoInfo: any) => {
  return API("todos", { method: "POST", body: JSON.stringify(todoInfo) })
    .then((res) => {
      return true;
    })
    .catch((err) => {});
};

export { fetchTodos, removeTodo, createTodo };
