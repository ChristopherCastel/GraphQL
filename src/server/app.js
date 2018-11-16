const createError = require("http-errors");
const express = require("express");
const path = require("path");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const sassMiddleware = require("node-sass-middleware");

const assetPath = require("./asset_path.js");

const db = require("./modules/db.js");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const loginRouter = require("./routes/login");

const { requireLogin } = require("./modules/auth");

const serverRoot = path.join(__dirname, ".");

const app = express();

// Connect to DB, and insert default user if necessary
db.connect().then(db => {
  let collection = db.collection("users");
  collection.countDocuments().then(res => {
    if (res === 0) {
      collection
        .insertOne({
          login: "laurent",
          password: "laurent",
          firstName: "Laurent",
          lastName: "Leleux"
        })
        .catch(err => {
          console.log("[App] Unable to insert default user");
        });
    }
  });
});

const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");

const {
  allMessages,
  updateMessage,
  insertMessage
} = require("./resources/messages");

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

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

app.locals.assetPath = assetPath;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  sassMiddleware({
    src: path.join(serverRoot, "public"),
    dest: path.join(serverRoot, "public"),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "../../dist")));

// not authenticated
app.use("/", indexRouter);
app.use("/api/login", loginRouter);

// authenticated
app.use("/api/*", requireLogin);
app.use("/api/users", usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
