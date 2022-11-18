import express from "express";

const protectedRouter = express.Router();

protectedRouter.post("/protected", () => {});
