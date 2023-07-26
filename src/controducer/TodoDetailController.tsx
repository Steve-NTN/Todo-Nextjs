const {
  createController,
  createStoreConfig,
  useDispatch,
  useStore,
} = require("react-controducer");
import { useEffect } from "react";
import { useRouter } from "next/router";

import { statusConfig } from "./StatusController";
import { fetchTodoDetail, updateTodo } from "../services/TodoDetailService";

export const todoDetailConfig = createStoreConfig({
  name: "todo_detail",
  path: "todo_detail",
  initialState: {
    todoDetail: {},
    refreshTodoDetail: false,
  },
  reducers: {
    RELOAD_TODO: (store: any, actionPayload: any) => {
      return { todoDetail: actionPayload };
    },
    CHANGE_TODO_DETAIL: (store: any, actionPayload: any) => {
      return {
        todoDetail: {
          ...(store.todoDetail || {}),
          ...actionPayload,
        },
      };
    },
    REFRESH_TODO_DETAIL: (store: any) => {
      return { refreshTodoDetail: !store.refreshTodoDetail };
    },
    REMOVE_TODO_ITEM: (store: any, actionPayload: any) => {
      let updatedItems = store?.todoDetail?.items;
      updatedItems.splice(actionPayload, 1);
      return { todoDetail: { ...store.todoDetail, items: updatedItems } };
    },
    CHANGE_TODO_ITEM: (store: any, actionPayload: any) => {
      let items = store?.todoDetail?.items || [];
      for (let index = 0; index < items.length; index++) {
        if (index === actionPayload.id) {
          items[index] = { ...items[index], ...actionPayload.updateField };
          break;
        }
      }
      return { todoDetail: { ...store.todoDetail, items: items } };
    },
    CREATE_TODO_ITEM: (store: any) => {
      let updatedItems = [
        ...(store?.todoDetail?.items || []),
        { title: "", isCompleted: false },
      ];
      return { todoDetail: { ...store.todoDetail, items: updatedItems } };
    },
  },
});

const TodoDetailController = createController(
  todoDetailConfig,
  (props: any) => {
    const router = useRouter();
    const { id } = router.query;
    const { todoDetail, refreshTodoDetail } = useStore((rootStore: any) => {
      return rootStore.todo_detail;
    });
    const [dispatch, todoDetailActions] = useDispatch(todoDetailConfig?.name);
    const [statusDispatch, statusActions] = useDispatch(statusConfig?.name);

    const updateTodoDetail = (updatedValue: any) => {
      dispatch(todoDetailActions.CHANGE_TODO_DETAIL(updatedValue));
    };

    const onSaveTodoDetail = async () => {
      statusDispatch(statusActions.HANDLE_LOADING(true));
      await updateTodo(todoDetail?.id, todoDetail);
      dispatch(
        statusActions.HANDLE_SAVE_SUCCESSFUL({
          showSnackbar: true,
          showLoading: false,
        })
      );
    };

    const onRemoveTodoItem = (idx: number) => {
      dispatch(todoDetailActions.REMOVE_TODO_ITEM(idx));
    };

    const onChangeTodoItemField = (id: any, updatedField: any = {}) => {
      dispatch(
        todoDetailActions.CHANGE_TODO_ITEM({
          id: id,
          updateField: updatedField,
        })
      );
    };

    const handleClickAddTodoItem = () => {
      dispatch(todoDetailActions.CREATE_TODO_ITEM());
    };

    useEffect(() => {
      const fetchData = async () => {
        if (id) {
          const todoDetailData = await fetchTodoDetail(id);
          dispatch(todoDetailActions.RELOAD_TODO(todoDetailData));
        }
      };
      fetchData();
    }, [id, refreshTodoDetail]);

    return {
      todoDetail,
      updateTodoDetail,
      onSaveTodoDetail,
      handleClickAddTodoItem,
      onRemoveTodoItem,
      onChangeTodoItemField,
    };
  }
);

export default TodoDetailController;
