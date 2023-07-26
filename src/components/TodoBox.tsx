import { TodoType } from "@/types/todos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import * as React from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export interface ITodoBoxProps {
  todo?: TodoType;
  handleRemove: () => void;
}

const TodoBoxStyle = styled.div`
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

export default function TodoBox(props: ITodoBoxProps) {
  return (
    <Link href={`/todos/${props?.todo?.id}`}>
      <TodoBoxStyle className="p-2 d-flex justify-content-between">
        <p className="h4">{props?.todo?.title}</p>
        <Button
          variant="danger"
          onClick={(e) => {
            e?.preventDefault();
            props?.handleRemove();
          }}
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </TodoBoxStyle>
    </Link>
  );
}
