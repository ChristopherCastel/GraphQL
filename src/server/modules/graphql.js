const { buildSchema } = require("graphql");

const {
  allMessages,
  findMessageById,
  updateMessage,
  insertMessage,
  deleteMessage
} = require("../resources/messages");

const schema = buildSchema(`
  type Query {
    messages: [Message]
    message(id: String!): Message!
  }

  type Mutation {
    setMessage(id:String!, body:String!): Message!
    insertMessage(body:String!): Message!
    deleteMessage(id: String!): Message!
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
    return await allMessages();
  },
  message: async ({ id }) => {
    return await findMessageById(id);
  },
  insertMessage: async ({ body }) => {
    return await insertMessage({ body });
  },
  setMessage: async ({ id, body }) => {
    return await updateMessage(id, { body });
  },
  deleteMessage: async ({ id }) => {
    return await deleteMessage(id);
  }
};

exports.schema = schema;
exports.root = root;
