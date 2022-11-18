import express from "express";
import { postRegisterController } from "./register.controller.js";
export const registerRouter = express.Router();

registerRouter.post("/", postRegisterController);
