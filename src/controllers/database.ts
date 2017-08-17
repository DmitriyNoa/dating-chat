import * as mongoose from "mongoose";

export default function db() {
  mongoose.connect("mongodb://localhost/chat-app");
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function() {
    return db;
  });
}
