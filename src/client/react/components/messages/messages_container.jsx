import React from "react";
import MessagesComponent from "./messages_component";
import sendApiRequest from "react/utils/api";

class MessagesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [], message: "" };
    this.deleteMessage = this.deleteMessage.bind(this);
    this.saveNewMessage = this.saveNewMessage.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
  }

  fetchMessages() {
    sendApiRequest({
      url: "/graphql",
      method: "POST",
      params: { query: "{messages {_id, body} }" }
    })
      .then(resp => {
        this.setState({
          messages: resp.data.messages
        });
      })
      .catch(error => {
        console.error(error);
        this.setState({
          messages: []
        });
      });
  }

  deleteMessage(message) {
    const query = `mutation DeleteMessage($id: String!) {
      deleteMessage(id: $id) {
        _id
        body
      }
    }`;
    const variables = {
      id: message._id
    };

    sendApiRequest({
      url: "/graphql",
      method: "POST",
      params: { query, variables }
    })
      .then(() => {
        const { messages } = this.state;

        const messageIndex = messages.indexOf(message);
        if (messageIndex > -1) {
          messages.splice(messageIndex, 1);
        }
        this.setState({
          messages: messages
        });
      })
      .catch(error => {
        console.error(error);
        this.setState({
          messages: []
        });
      });
  }

  saveNewMessage(e) {
    e.preventDefault();
    const query = `mutation InsertMessage($body: String!) {
      insertMessage(body: $body) {
        _id
        body
      }
    }`;
    const variables = {
      body: this.state.message
    };

    sendApiRequest({
      url: "/graphql",
      method: "POST",
      params: { query, variables }
    })
      .then(resp => {
        const { messages } = this.state;
        messages.push(resp.data.insertMessage);
        this.setState({ messages: messages });
      })
      .catch(err => {
        console.log(err);
      });
  }

  onFieldChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  componentDidMount() {
    this.fetchMessages();
  }

  render() {
    return (
      <MessagesComponent
        messages={this.state.messages}
        deleteMessage={this.deleteMessage}
        message={this.state.message}
        saveNewMessage={this.saveNewMessage}
        onFieldChange={this.onFieldChange}
      />
    );
  }
}

export default MessagesContainer;
