import UserController from "./user.controller.js";
const userData = new UserController();
async function userRotes(router) {
  router.post("/api/user/singup", userData.userSignup);
  router.get("/api/users/all", userData.allUsers)
  router.get("/api/user/:_id", userData.user)
  router.post("/api/user/login", userData.userLogin)
}
export default userRotes;
