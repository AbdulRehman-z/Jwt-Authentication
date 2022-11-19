import express from "express";
import cors from "cors";
import path from "path";
import morgan from "morgan";
import * as dotenv from "dotenv";
dotenv.config();
import { registerRouter } from "./routes/register.router.js";
import { loginRouter } from "./routes/login.router.js";
import { protectedRouter } from "./routes/protectedRoute.router.js";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
/**
 * -------------- GENERAL SETUP ----------------
 */

// Create the Express application
export const app = express();

// Logs all the requests to different routes with their status i.e request is failed or passed
app.use(morgan("dev"));

// Instead of using body-parser middleware, use the new Express implementation of the same thing
app.use(express.json());

// Allows our React application to make HTTP requests to Express application
app.use(cors());

// When we run `npm build`, the output will go to the ./public directory
app.use(express.static(path.join(__dirname, "public")));

/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/index.js
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/protected", protectedRouter);
