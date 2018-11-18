import React from "react";
import { Jumbotron, Form, Col, Row, Button } from "react-bootstrap";
import { CircleLoader } from "react-spinners";

const MessageComponent = ({ message, onFieldChange, updateMessage }) => {
  return (
    <div>
      <Jumbotron>
        <h3>Messages</h3>
        {!message && <CircleLoader />}
        {message && <p>{message.body}</p>}
      </Jumbotron>

      <h3>Editer le message</h3>
      <Form onSubmit={updateMessage}>
        <Form.Group as={Row} controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            Message
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              name="message"
              type="text"
              placeholder="Nouveau message"
              value={message.body}
              onChange={onFieldChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit">Update le message</Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
};

export default MessageComponent;
