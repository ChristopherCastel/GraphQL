const db = require("../modules/db.js");
const { prepare } = require("../modules/utils.js");
function allMessages() {
  return db.db
    .collection("messages")
    .find()
    .toArray();
}

function updateMessage(body, id) {
  return db.db
    .collection("messages")
    .findOneAndUpdate(
      { _id: new db.ObjectID(id) },
      { $set: body },
      { returnOriginal: false }
    );
}

async function insertMessage(body) {
  const res = await db.db.collection("messages").insert(body);
  return prepare(
    await db.db.collection("messages").findOne({ _id: res.insertedIds[1] })
  );
}

exports.allMessages = allMessages;
exports.updateMessage = updateMessage;
exports.insertMessage = insertMessage;
