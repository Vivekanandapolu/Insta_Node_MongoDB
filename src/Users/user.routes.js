import UserController from "./user.controller.js";
const userController = new UserController();
async function userRotes(router) {
  router.post("/api/user/singup", userController.userSignup);
  router.get("/api/users/all", userController.allUsers)
  router.get("/api/user/:_id", userController.userDetailsById)
  router.post("/api/user/login", userController.userLogin)
}
export default userRotes;