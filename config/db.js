const mongoose = require("mongoose");

const connection = (url) => {
  try {
    mongoose.connect(url);

    const db = mongoose.connection;

    db.once("open", () => {
      console.log("DB Connected");
    });
  } catch (err) {
    db.on("error", console.error.bind(console, "Connection error"));
  }
};

module.exports = connection;