import API from "./api";

const fetchTodoDetail = (id: string | string[]) => {
  return API(`todos/${id}`)
    .then((res) => {
      return res?.data;
    })
    ?.catch((err) => {
      console.log(err);
    });
};

const updateTodo = (id: any, todoDetail: any) => {
  return API(`todos/${id}`, { method: "PUT", body: JSON.stringify(todoDetail) })
    ?.then((res) => {
      return res;
    })
    ?.catch((err) => {
      console.log(err);
    });
};

export { fetchTodoDetail, updateTodo };
