const express = require("express");
const mongoose = require("mongoose");
const Task = require("./model/todo");
const bodyparser = require("body-parser");
var methodOverride = require("method-override");

const app = express();
mongoose.connect("mongodb://localhost:27017/todos");

app.use(methodOverride("_method"));

app.use(express.static("public"));
app.use(bodyparser());

app.set("views", "./views");
app.set("view engine", "ejs");
app.get("/", async (req, res) => {
  // add the code to read the data from data base
  const tasks = await Task.find();
  res.render("home.ejs", { tasks });
});

app.post("/todo/add", async (req, res) => {
  // write code to add the data in database
  await Task.create({
    task: req.body.task,
  });
  // redirect to home page
  res.redirect("/");
});

// update
app.put("/todo/:id/complete", async (req, res) => {
  await Task.updateOne({ _id: req.params.id }, { complete: true });
  res.redirect("/");
});

// delete
app.delete("/todo/:id/delete", async (req, res) => {
  await Task.deleteOne({ _id: req.params.id });
  res.redirect("/");
});

app.listen(5000, () => console.log("server is listening at port 5000"));
