import express from "express";
import { authenticateJwt } from "../lib/utils.js";

export const protectedRouter = express.Router();

protectedRouter.get("/", authenticateJwt, (req, res, next) => {
  res.json({
    success: true,
    message: "You are successfully authenticated",
  });
});
