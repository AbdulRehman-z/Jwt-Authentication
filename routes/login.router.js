import express from "express";
import { postLoginController } from "./login.controller.js";
export const loginRouter = express.Router();

loginRouter.post("/", postLoginController);
