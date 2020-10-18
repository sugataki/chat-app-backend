const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const messagesRouter = require("./routers/messages/route");

app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 300,
  methods: "GET, PATCH, PUT, POST, DELETE",
  allowedHeaders: "Content-Type, Authorization, access_token",
  exposedHeaders: "Content-Range, X-Content-Range",
  credentials: true,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", cors(corsOptions), messagesRouter);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.api = functions.region("asia-northeast1").https.onRequest(app);
