import UserController from "./user.controller.js";
const userData = new UserController();
async function userRotes(router) {
  router.post("/api/user/singup", userData.userSignup);
}
export default userRotes;
