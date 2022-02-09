import cors from 'cors'
import express from "express";
import mongoose from 'mongoose';
import router from './router.js';
import bodyparser from 'body-parser';
const port = 4000;
const app = express();
app.use(express.json());
app.use("/", cors(), router);
mongoose.connect("mongodb://localhost:27017/Insta_DB");

export const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number,
    username: String,
    password: String
},
    { timestamps: true }
);

const userModel = new mongoose.model('Users', userSchema);
app.listen(port, (req, res) => {
    console.log("Port is running on:", port);
})
export default userModel