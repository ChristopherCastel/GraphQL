const db = require("../modules/db.js");
const { prepare } = require("../modules/utils.js");

let allMessages = async function() {
  return (await db.db
    .collection("messages")
    .find()
    .toArray()).map(prepare);
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
  let message = await db.db.collection("messages").insertOne(body);
  return prepare(message.ops[0]);
};

let deleteMessage = async function(id) {
  return prepare(
    await db.db
      .collection("messages")
      .findOneAndDelete({ _id: new db.ObjectID(id) })
  );
};

exports.allMessages = allMessages;
exports.findMessageById = findMessageById;
exports.updateMessage = updateMessage;
exports.insertMessage = insertMessage;
exports.deleteMessage = deleteMessage;
