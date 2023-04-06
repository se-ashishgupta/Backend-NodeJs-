import express from "express";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

mongoose
  .connect("mongodb://127.0.0.1:27017", {
    dbName: "backend",
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((e) => console.log(e));

const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const Message = mongoose.model("Message", messageSchema);
const app = express();

//To make files Sttatics Under a particular Folder to serve on a sendFile
//Using middleware
app.use(express.static(path.join(path.resolve.apply(), "public")));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Specify up view Engine
app.set("view engine", "ejs");

const isAuthenticated = (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    next();
  } else {
    res.render("login");
  }
};

app.get("/", isAuthenticated, (req, res) => {
  // res.send("HI");
  // res.json({
  //   name: "Ashish",
  //   lname: "Gupta",
  // });
  // res.status(400).send("Hi");
  // res.sendStatus(500);
  // const pathlocation = path.resolve();
  // res.sendFile(path.join(pathlocation, "./index.html"));
  //COOKIES REQUEST AUTHENTICATIOn
  // const { token } = req.cookies;
  // if (token) {
  //   console.log(token);
  //   res.render("logout");
  // } else {
  //   console.log(token);
  //   res.render("login");
  // }
  res.render("logout");
});

app.get("/add", async (req, res) => {
  await Message.create({ name: "Ashish", email: "ashish@gmail.com" }).then(() =>
    res.send("Nice")
  );
});

app.post("/login", async (req, res) => {
  res.cookie("token", "iamashish", {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 1000),
  });
  res.redirect("/");
});
app.get("/logout", async (req, res) => {
  res.cookie("token", null, {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.redirect("/");
});

app.get("/success", (req, res) => {
  res.render("success");
});

app.get("/users", (req, res) => {
  res.json({
    data,
  });
});

app.post("/", async (req, res) => {
  const { name, email } = req.body;
  const messageData = { name, email };
  await Message.create(messageData);
  res.redirect("/success");
});

app.listen(8000, () => {
  console.log("Working on Server 8000");
});
