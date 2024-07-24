const express = require("express");
const app = express();

const userRouter = require("./router/userRouter");

app.use("/", userRouter)

app.listen(8000, () => {
  console.log(`Server running in ${8000}`);
});
