import PostController from "./post.controllers.js";
const postController = new PostController();
async function postRoutes(router) {
  //Generic endpoints
  router.post("/api/post/create", postController.createPost);
  router.get("/api/post/:_id", postController.getPost);
  router.put("/api/post/update/:_id", postController.updatePost);
  router.delete("/api/post/delete/:_id", postController.deletePost);
  router.get("/api/posts/all", postController.getAllPosts);
}
export default postRoutes;
