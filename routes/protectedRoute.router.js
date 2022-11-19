import express from "express";
import passport from "passport";

export const protectedRouter = express.Router();

protectedRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.json({
      success: true,
      message: "You are successfully authenticated",
    });
  }
);
