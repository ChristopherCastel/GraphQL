const { buildSchema } = require("graphql");

const {
  allMessages,
  updateMessage,
  insertMessage
} = require("../resources/messages");

const schema = buildSchema(`
  type Query {
    messages: [Message]
  }

  type Mutation {
    setMessage(id:String!, body:String!): Message!
    insertMessage(body:String!): Message
  }
  
  type Message {
    _id: String!
    body: String!
    submessages: [Submessage]
  }

  type Submessage {
    time: String
    description: String
    title: String
  }

  type User {
    login: String,
    password: String,
    firstName: String,
    lastName: String
  }

  input MessageInput {
    body: String
  }
`);

const root = {
  messages: async () => {
    console.log(await allMessages());
    return await allMessages();
  },
  insertMessage: async ({ body }) => {
    return await insertMessage({ body });
  },
  setMessage: async ({ id, body }) => {
    return await updateMessage(id, { body });
  }
};

exports.schema = schema;
exports.root = root;
