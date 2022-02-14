import Router from "express";
import userRotes from "./src/Users/user.routes.js";
import postRoutes from "./src/Posts/post.routes.js";
const router = new Router();
userRotes(router);
postRoutes(router)
export default router
