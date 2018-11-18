import React from "react";
import { Container, ListGroup, Form, Button, Col, Row } from "react-bootstrap";
import MessageItem from "./message_item";

const MessagesComponent = ({
  messages,
  deleteMessage,
  saveNewMessage,
  message,
  onFieldChange
}) => {
  return (
    <Container>
      <h3>Messages</h3>
      <ListGroup>
        {messages.map((message, i) => (
          <ListGroup.Item key={i}>
            <MessageItem message={message} deleteMessage={deleteMessage} />
          </ListGroup.Item>
        ))}
      </ListGroup>
      <br />

      <h3>Ajouter un nouveau message</h3>
      <Form onSubmit={saveNewMessage}>
        <Form.Group as={Row} controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            Message
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              name="message"
              type="text"
              placeholder="Nouveau message"
              value={message}
              onChange={onFieldChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit">Ajouter un nouveau message</Button>
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default MessagesComponent;
