import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import router from "./router.js";
import MongoDB from "./config/mongoose.js";
const __dirname = path.resolve();
dotenv.config();
const port = parseInt(process.env.PORT) || 3000;
const app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.json());
//User routes from router js file
app.use("/", cors(), router);
//Welcome endpoint
app.get("/welcome", (req, res) => {
  res.send("Welcome to Insta__Node Application");
});
MongoDB.connect(process.env.DB_NAME);
//Listen
app.listen(port, async () => {
  console.log(` Insta Node is running on :${port}`);
});
