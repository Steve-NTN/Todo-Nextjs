const { useController } = require("react-controducer");
import {
  AppContent,
  AppTile,
  Background,
  Select,
  Snackbar,
} from "@/components";
import { Button, Container, Row } from "react-bootstrap";
import { faPlus, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter as useRouterNav } from "next/navigation";

import { containerStyles } from "./TodoDetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { todoDetailConfig } from "@/controducer/TodoDetailController";
import { TodoItemType } from "@/services/memoryDataService";
import TodoItemList from "./TodoItemList";
import { statusConfig } from "@/controducer/StatusController";
import { ChangeEvent } from "react";

type Props = {};

const TodoDetailView = (props: Props) => {
  const { push } = useRouterNav();

  const {
    todoDetail,
    updateTodoDetail,
    onSaveTodoDetail,
    handleClickAddTodoItem,
  } = useController(todoDetailConfig.name);

  const { showSnackbar, onCloseSnackbar } = useController(statusConfig.name);

  const handleClickBack = () => {
    push("/todos");
  };

  const getTotal = () => {
    let total = 0;
    (todoDetail?.items || [])?.map((item: TodoItemType) => {
      total += item?.caculatorNumber || 0;
      return item;
    });
    return total;
  };

  const onChangeInput = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    updateTodoDetail({ [e.target.name]: e?.target?.value });
  };

  return (
    <Background>
      <Container className="p-3" style={containerStyles} fluid="sm">
        <AppTile bonusClass="text-center" />
        <AppContent>
          <div style={{ textAlign: "left" }}>
            <Button onClick={handleClickBack}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </Button>
          </div>
          <div
            className="d-grid my-3"
            style={{ gridTemplateColumns: "64px 1fr" }}
          >
            <Select
              onChange={onChangeInput}
              styles={{ marginRight: 16 }}
              name="type"
            />

            <input
              className="h4 text-center"
              style={{ marginBottom: 0, flex: 1, marginLeft: 16 }}
              value={todoDetail?.title}
              key="main-title"
              name="title"
              onChange={onChangeInput}
            />
          </div>

          {(todoDetail?.items || [])?.length > 0 ? (
            <TodoItemList />
          ) : (
            <p className="text-center">Thêm mới chi tiết công việc</p>
          )}
          <Button onClick={handleClickAddTodoItem}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </AppContent>

        {todoDetail?.type === "2" && (
          <Row className="mt-3">
            <p>Total: {getTotal()}</p>
          </Row>
        )}

        <Button className="mt-2" onClick={onSaveTodoDetail}>
          Save
        </Button>
      </Container>
      <Snackbar
        show={showSnackbar}
        text="Cập nhật thành công!!!"
        onCloseSnackbar={onCloseSnackbar}
      />
    </Background>
  );
};

export default TodoDetailView;
