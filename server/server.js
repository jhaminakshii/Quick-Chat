import express from "express";
import  'dotenv/config';
import cors from 'cors';
import http from 'http';
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";

// Create Express app and HTTP server
const app = express();
const server = http.createServer(app)

// Middleware Setup
app.use(express.json({limit: "4mb"}));
app.use(cors());

// Routes setup
app.use("/api/status",(req,res)=>res.send("Server is live") );
app.use("/api/auth", userRouter)

// Connect to MongoDB
await connectDB();

const PORT = process.env.PORT || 5001;
server.listen(PORT,()=>{
console.log("Server is running on Port: " + PORT);
}).on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use`);
    process.exit(1);
  } else {
    console.error(err);
  }
});
