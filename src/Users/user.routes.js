import UserController from "./user.controller.js";
const userController = new UserController();
async function userRotes(router) {
  router.post("/api/user/singup", userController.userSignup);
  router.get("/api/users/:firstName", userController.allUsers)
  router.get("/api/user:_id", userController.userDetailsById)
  router.post("/api/user/login", userController.userLogin);
  router.get("/api/user/:firstName", userController.singleUser);
  router.get("/api/user/update/:firstName", userController.updatingSingleUser);
  router.get("/api/users/update/:firstName", userController.updatingAllUsers);
}
export default userRotes;