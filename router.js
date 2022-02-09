import Router from "express";
import userRotes from "./src/Users/user.routes.js";
const router = new Router();
userRotes(router);
export default router
