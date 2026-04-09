import express from "express";
import "dotenv/config";
import cors from "cors";
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";

const app = express();

app.use(express.json());
app.use(cors())
app.use(clerkMiddleware())

const PORT = process.env.PORT || 3001;

app.use(
  // Expose the middleware on our recommended path at `/api/inngest`.
  "/api/inngest",
  serve({ client: inngest, functions })
);

app.get("/", (req, res) => res.send("Server is Live!"))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))