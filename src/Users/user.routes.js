import userController from "./user.controller.js";
const userData = new userController();
async function userRotes(router) {
    router.post("/api/user/create", userData.userSignup);
    router.post("/api/create", userData.create)
}
export default userRotes