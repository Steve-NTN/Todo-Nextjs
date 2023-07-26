const { useController } = require("react-controducer");
import { Stack } from "react-bootstrap";
import TodoItemBox from "./TodoItemBox";
import { todoDetailConfig } from "@/controducer/TodoDetailController";

const TodoItemList = () => {
  const { todoDetail, onRemoveTodoItem, onChangeTodoItemField } = useController(
    todoDetailConfig.name
  );

  return (
    <Stack>
      {todoDetail?.items?.map((data: any, idx: number) => (
        <div key={idx}>
          <TodoItemBox
            todo={data}
            type={todoDetail?.type}
            onChangeTodoItemField={onChangeTodoItemField}
            handleRemove={() => onRemoveTodoItem(idx)}
            idx={idx}
          />
          {idx < (todoDetail?.items?.length || 0) - 1 && (
            <hr className="hr my-2" />
          )}
        </div>
      ))}
    </Stack>
  );
};

export default TodoItemList;
