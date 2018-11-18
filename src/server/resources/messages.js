const db = require("../modules/db");
const { prepare } = require("../modules/utils");

let allMessages = async function() {
  const messages = await db.db
    .collection("messages")
    .find()
    .toArray();
  return messages.map(prepare);
};

let findMessageById = async function(id) {
  return prepare(
    await db.db.collection("messages").findOne({ _id: db.ObjectID(id) })
  );
};

let updateMessage = async function(id, body) {
  return prepare(
    await db.db
      .collection("messages")
      .findOneAndUpdate(
        { _id: new db.ObjectID(id) },
        { $set: body },
        { returnOriginal: false }
      )
  );
};

let insertMessage = async function(body) {
  const message = await db.db.collection("messages").insertOne(body);
  return prepare(message.ops[0]);
};

let deleteMessage = async function(id) {
  const result = await db.db
    .collection("messages")
    .findOneAndDelete({ _id: new db.ObjectID(id) });
  return prepare(result.value);
};

exports.allMessages = allMessages;
exports.findMessageById = findMessageById;
exports.updateMessage = updateMessage;
exports.insertMessage = insertMessage;
exports.deleteMessage = deleteMessage;
