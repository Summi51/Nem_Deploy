const express = require("express");
require("dotenv").config();
const { connection } = require("./db");
const { userRouter } = require("./routes/User.routes");
const { noteRouter } = require("./routes/Note.routes");
var jwt = require("jsonwebtoken");
const app = express();
const { auth } = require("./middleware/auth.middleware");
const cors = require("cors");

app.use(cors())
app.use(express.json());
app.use("/users", userRouter);

app.use(auth); //protected routes-middleware
app.use("/notes", noteRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to the DB");
  } catch (error) {
    console.log(error); 
    console.log("cannot connect to the DB");
  }
  console.log(`server is running at post ${process.env.port}`);
});


