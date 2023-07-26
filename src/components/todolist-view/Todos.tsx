const { useController } = require("react-controducer");
import {
  AppContent,
  AppTile,
  Background,
  FloatButton,
  TodoBox,
} from "@/components";
import { Container, Modal, Stack } from "react-bootstrap";

import { containerStyles } from "../todo-view/TodoDetail.css";
import AddTodoPopup from "./AddTodoPopup";
import { todosConfig } from "@/controducer/TodosController";

type Props = {};

const TodosView = (props: Props) => {
  const { popupConfigs, onClosePopup, onPopupAddTodo } = useController(
    todosConfig.name
  );

  return (
    <Background>
      <Container className="p-3" style={containerStyles} fluid="sm">
        <AppTile bonusClass="text-center" />
        <AppContent>
          <TodoList />
        </AppContent>
      </Container>
      <FloatButton onClick={onPopupAddTodo} />
      <Modal show={popupConfigs.show} onHide={onClosePopup} centered>
          <AddTodoPopup onClose={onClosePopup} />
      </Modal>
    </Background>
  );
};

const TodoList: React.FC = () => {
  const { todos, onRemoveTodo } = useController(todosConfig.name);

  return (
    <Stack>
      {todos?.map((data: any, idx: number) => {
        const isLastestItem = idx < todos?.length - 1;

        return (
          <div key={idx}>
            <TodoBox todo={data} handleRemove={() => onRemoveTodo(data?.id)} />
            {isLastestItem && <hr className="hr my-2" />}
          </div>
        );
      })}
    </Stack>
  );
};

export default TodosView;
