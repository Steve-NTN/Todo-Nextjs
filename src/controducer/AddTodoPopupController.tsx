const {
  createStoreConfig,
  createController,
  useStore,
  useDispatch,
  useController,
} = require("react-controducer");
import { FormEvent } from "react";

import { checkValidString } from "@/utils/stringUtil";
import { REQUIRED_ERROR } from "@/constants";
import { todosConfig } from "./TodosController";

const todoInfoInit = {
  type: "1",
  title: "",
  items: [],
};

export const addTodoPopupConfig = createStoreConfig({
  name: "add_todo_popup",
  path: "add_todo_popup",
  initialState: {
    error: { show: false, text: "" },
    todoInfo: todoInfoInit,
  },
  reducers: {
    SET_ERROR: (store: any, data: any) => {
      return { error: data };
    },
    HANDLE_CHANGE_INFO: (store: any, data: any) => {
      return { todoInfo: { ...store?.todoInfo, [data?.field]: data?.value } };
    },
    RESET_TODO_INFO: (store: any) => {
      return { todoInfo: todoInfoInit };
    },
  },
});

const AddTodoPopupController = createController(
  addTodoPopupConfig,
  (props: any) => {
    const { todoInfo, error } = useStore((rootStore: any) => {
      return rootStore.add_todo_popup;
    });
    const { onCreateTodo } = useController(todosConfig.name);

    const [dispatch, addTodoPopupActions] = useDispatch(
      addTodoPopupConfig?.name
    );

    const handleChangeInfo = (field: string, value: string) => {
      dispatch(addTodoPopupActions.HANDLE_CHANGE_INFO({ field, value }));
    };

    const validateForm = () => {
      let isvalidTitle = checkValidString(todoInfo?.title);
      return { isvalidTitle };
    };

    const onShowError = () => {
      const { isvalidTitle } = validateForm();
      dispatch(
        addTodoPopupActions.SET_ERROR({
          show: !isvalidTitle,
          text: isvalidTitle ? "" : REQUIRED_ERROR,
        })
      );
    };

    const formIsValid = () => {
      const { isvalidTitle } = validateForm();
      return isvalidTitle;
    };

    const onSaveTodo = async (e: FormEvent) => {
      e?.preventDefault();
      if (formIsValid()) {
        onCreateTodo(todoInfo);
        dispatch(addTodoPopupActions.RESET_TODO_INFO());
      } else {
        onShowError();
      }
    };
    return {
      handleChangeInfo,
      onSaveTodo,
      todoInfo,
      error,
    };
  }
);

export default AddTodoPopupController;
