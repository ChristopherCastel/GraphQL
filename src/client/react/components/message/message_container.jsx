import React from "react";
import MessageComponent from "./message_component";
import sendApiRequest from "react/utils/api";

class MessageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      message: { body: "" }
    };

    this.onFieldChange = this.onFieldChange.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
  }

  fetchMessage() {
    const query = `query FindMessageById($id: String!) {
      message(id: $id) {
        _id
        body
      }
    }`;
    const variables = {
      id: this.state.id
    };

    sendApiRequest({
      url: "/graphql",
      method: "POST",
      params: { query, variables }
    })
      .then(resp => {
        this.setState({
          message: resp.data.message
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  onFieldChange(event) {
    this.setState({
      [event.target.name]: { body: event.target.value }
    });
  }

  updateMessage(e) {
    e.preventDefault();

    const query = `mutation UpdateMessage($id: String!, $body: String!) {
      updateMessage(id: $id, body: $body) {
        _id
        body
      }
    }`;
    const variables = {
      id: this.state.id,
      body: this.state.message.body
    };

    sendApiRequest({
      url: "/graphql",
      method: "POST",
      params: { query, variables }
    })
      .then(resp => {
        this.setState({
          message: resp.data.updateMessage
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.fetchMessage();
  }

  render() {
    return (
      <MessageComponent
        message={this.state.message}
        onFieldChange={this.onFieldChange}
        updateMessage={this.updateMessage}
      />
    );
  }
}

export default MessageContainer;
