const express = require("express");
const app = express();
const db = require("./config/db");
const userRouter = require("./router/userRouter");
const cors = require("cors");
require("dotenv").config();

(() => {
  app.use(express.json());
  app.use(
    cors({
      origin: "*",
    })
  );

  db(process.env.MONGO_URL);

  app.use("/", userRouter);
})();

app.listen(process.env.PORT, () => {
  console.log(`Server running in ${process.env.PORT}`);
});
