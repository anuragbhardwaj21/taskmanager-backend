const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Task = require("../models/Tasks");

exports.addTask = async (req, res) => {
  try {
    const { title, status, created } = req.body;

    const task = new Task({
      title,
      status,
      created,
      createdBy: req.userData.userId,
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, status, deadline } = req.body;

    const task = await Task.findOneAndUpdate(
      { _id: id, createdBy: req.userData.userId },
      { title, status, deadline },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOneAndDelete({
      _id: id,
      createdBy: req.userData.userId,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.allTask = async (req, res) => {
  try {
    const id = req.userData.userId;
    const tasks = await Task.find({ createdBy: id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
