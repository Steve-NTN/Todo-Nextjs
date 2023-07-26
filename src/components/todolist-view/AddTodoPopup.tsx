const { useController } = require("react-controducer");
import React from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";

import { Input, Select } from "@/components";
import { addTodoPopupConfig } from "../../controducer/AddTodoPopupController";

const AddTodoPopup: React.FC<{
  onClose: any;
}> = ({ onClose }) => {
  const { onSaveTodo, handleChangeInfo, todoInfo, error } = useController(
    addTodoPopupConfig.name
  );

  return (
    <form onSubmit={onSaveTodo}>
      <Modal.Header closeButton>
        <Modal.Title>Thêm công việc</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row>
          <Col xs={3}>
            <Select
              onChange={(event) =>
                handleChangeInfo("type", event?.target?.value)
              }
            />
          </Col>
          <Col>
            <Input
              autoFocus
              className="form-control"
              placeholder="Title"
              value={todoInfo?.title}
              onChange={(event) =>
                handleChangeInfo("title", event?.target?.value)
              }
            />
          </Col>
        </Row>
      </Modal.Body>

      {error?.show && <p className="text-danger text-center">{error?.text}</p>}

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" type="submit">
          Thêm
        </Button>
      </Modal.Footer>
    </form>
  );
};

export default AddTodoPopup;
