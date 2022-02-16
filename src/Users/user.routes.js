import UserController from "./user.controller.js";
import userModel from "./user.model.js";
const userController = new UserController();
async function userRotes(router) {
  router.post("/api/user/signup", userController.userSignup);
  router.get("/api/users/all", userController.allUsers)
  router.get("/api/user/:_id", userController.userDetailsById)
  router.post("/api/user/login", userController.userLogin);
  router.get("/api/user/:firstName", userController.singleUser);
  router.put("/api/user/update/:firstName", userController.updatingSingleUser);
  router.put("/api/users/update/:firstName", userController.updatingAllUsers);
  router.get("/api/users/delete/:firstName", userController.destroyAll);
  router.get("/api/user/posts/:_id", userController.getAllPostsOfUsers)
}
export default userRotes;