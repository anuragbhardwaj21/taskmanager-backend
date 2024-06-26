const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authController = require("./controllers/authController");
const taskManagerController = require("./controllers/taskManagerController");
const authMiddleware = require("./utils/auth");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
var corsOptions = {
  origin: "*",
};

app.use(cors());
app.use(express.json());

mongoose
  .connect(
    `mongodb+srv://anurag2361am:anurag%4099@first.ycnrglw.mongodb.net/?retryWrites=true&w=majority&appName=First`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.post("/signup", authController.signup);
app.post("/login", authController.login);

app.post("/addtask", authMiddleware, taskManagerController.addTask);
app.get("/alltasks", authMiddleware, taskManagerController.allTask);
app.put("/updatetask/:id", authMiddleware, taskManagerController.updateTask);
app.delete("/deletetask/:id", authMiddleware, taskManagerController.deleteTask);

app.listen(PORT);
