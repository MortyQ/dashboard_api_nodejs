import express from "express";

export const userRouter = express.Router();

userRouter.use((req, res, next) => {
  console.log("Users Middleware", Date.now());
  next();
});

userRouter.post("/login", (req, res) => {
  res.send("Login");
});

userRouter.post("/register", (req, res) => {
  res.send("Register");
});
