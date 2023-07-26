import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  fetchTodos,
  removeTodo,
  createTodo,
} from "../services/TodoListService";
import { statusConfig } from "./StatusController";

const {
  createStoreConfig,
  createController,
  useStore,
  useDispatch,
} = require("react-controducer");

export const todosConfig = createStoreConfig({
  name: "todos",
  path: "todos",
  initialState: { todos: [], refreshTodos: false },
  reducers: {
    SET_TODOS: (store: any, actionPayload: any) => {
      return { todos: actionPayload };
    },
    HANDLE_REFRESH_TODOS: (store: any) => {
      return { refreshTodos: !store.refreshTodos };
    },
  },
});

type PopupConfigsType = {
  show: boolean;
  content?: any;
};

const TodosController = createController(todosConfig, (props: any) => {
  const todos = useStore((rootStore: any) => {
    return rootStore.todos;
  });
  const router = useRouter();

  const [dispatch, todosActions] = useDispatch(todosConfig?.name);
  const [statusDispatch, statusActions] = useDispatch(statusConfig?.name);
  const [popupConfigs, setPopupConfigs] = useState<PopupConfigsType>({
    show: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      statusDispatch(statusActions.HANDLE_LOADING(true));
      const data = await fetchTodos();
      dispatch(todosActions.SET_TODOS(data));
      statusDispatch(statusActions.HANDLE_LOADING(false));
    };

    fetchData();
  }, [todos.refreshTodos, router.pathname]);

  const onClosePopup = () => {
    setPopupConfigs({ ...popupConfigs, show: false });
  };

  const onPopupAddTodo = () => {
    setPopupConfigs({
      ...popupConfigs,
      show: true,
    });
  };

  return {
    todos: todos?.todos,
    handleRefreshTodos: () => {
      dispatch(todosActions.HANDLE_REFRESH_TODOS());
    },
    onRemoveTodo: async (id: string) => {
      dispatch(statusActions.HANDLE_LOADING(true));
      await removeTodo(id);
      dispatch(statusActions.HANDLE_LOADING(false));
      dispatch(todosActions.HANDLE_REFRESH_TODOS());
    },
    onCreateTodo: async (data: any) => {
      dispatch(statusActions.HANDLE_LOADING(true));
      await createTodo(data);
      dispatch(statusActions.HANDLE_LOADING(false));
      onClosePopup();
      dispatch(todosActions.HANDLE_REFRESH_TODOS());
    },
    popupConfigs,
    onClosePopup,
    onPopupAddTodo,
  };
});

export default TodosController;
