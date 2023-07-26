const { configureRoot } = require("react-controducer");
import { todosConfig } from "./TodosController";
import { todoDetailConfig } from "./TodoDetailController";
import { addTodoPopupConfig } from "./AddTodoPopupController";
import { statusConfig } from "./StatusController";

const RootStore = configureRoot({
  todosConfig,
  statusConfig,
  todoDetailConfig,
  addTodoPopupConfig
});
export default RootStore;
