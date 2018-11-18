import React from "react";
import MessageComponent from "./message_component";
import sendApiRequest from "react/utils/api";

class MessageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      message: null
    };
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
      .catch(error => {
        console.error(error);
        this.setState({
          message: []
        });
      });
  }

  componentDidMount() {
    setTimeout(this.fetchMessage.bind(this), 2000);
  }

  render() {
    return <MessageComponent message={this.state.message} />;
  }
}

export default MessageContainer;
