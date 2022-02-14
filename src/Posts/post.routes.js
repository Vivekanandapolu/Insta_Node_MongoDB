import PostController from "./post.controllers.js";
const postController = new PostController();
async function postRoutes(router) {
  //Generic endpoints
  router.post("/api/post/create", postController.createPost);
  router.put("/api/post/update", postController.updatePost);
  router.delete("/api/post/delete", postController.deletePost);
  router.get("/api/post/:id", postController.getPost);
  router.get("/api/post/create", postController.getAllPosts);
}
export default postRoutes;
