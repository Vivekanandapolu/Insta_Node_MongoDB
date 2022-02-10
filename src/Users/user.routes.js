import UserController from "./user.controller.js";
const userData = new UserController();
async function userRotes(router) {
  router.post("/api/user/singup", userData.userSignup);
  router.get("/api/users/all", userData.findall)
  router.get("/api/user/:_id", userData.findById)
}
export default userRotes;
