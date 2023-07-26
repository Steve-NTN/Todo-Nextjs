import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import Input from "../Input";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export interface TodoBoxProps {
  todo?: any;
  handleRemove: () => void;
  onChangeTodoItemField: any;
  idx?: any;
  type?: any;
}

const TodoItemBoxStyle = styled.div`
  cursor: pointer;
  border-radius: 8px;
  align-items: center;
  & p {
    margin-bottom: 0;
  }
  &:hover {
    background-color: #f5f5f5;
  }
`;

export default function TodoItemBox(props: TodoBoxProps) {
  const { todo, onChangeTodoItemField, idx, handleRemove } = props;
  return (
    <TodoItemBoxStyle className="p-2 d-flex justify-content-between">
      <div
        className="d-flex align-items-center"
        style={{ flex: 1, marginRight: "0.5em" }}
      >
        <input
          style={{ minWidth: 16 }}
          className="form-check-input"
          type="checkbox"
          checked={todo?.isCompleted}
          onChange={(e) =>
            onChangeTodoItemField(idx, { isCompleted: e?.target?.checked })
          }
        />

        <Input
          className="form-control"
          placeholder="Title"
          style={{ marginLeft: "0.5em" }}
          value={todo?.title}
          onChange={(e) =>
            onChangeTodoItemField(idx, { title: e?.target?.value })
          }
        />

        {props.type === "2" && (
          <Input
            className="form-control"
            placeholder="Number"
            type="number"
            style={{ marginLeft: "0.5em" }}
            value={todo?.caculatorNumber}
            onChange={(e) =>
              onChangeTodoItemField(idx, {
                caculatorNumber: parseInt(e?.target?.value),
              })
            }
          />
        )}
      </div>
      <Button variant="danger" onClick={handleRemove}>
        <FontAwesomeIcon icon={faTrash} />
      </Button>
    </TodoItemBoxStyle>
  );
}
