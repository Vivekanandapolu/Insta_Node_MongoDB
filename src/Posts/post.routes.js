import PostController from "./post.controllers.js";
const postController = new PostController();
async function postRoutes(router) {
    router.post("/api/post/create", postController.createPost);
    router.get("/api/post/one/:_id", postController.userPostById)
}
export default postRoutes