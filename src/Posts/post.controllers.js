import httpStatusCode from "http-status-codes";
// import mongoose from "../../config/mongoose.js";
import mongoose from "mongoose";
import PostModel from "./post.model.js";
class PostController {
  async createPost(request, response) {
    try {
      const post = await PostModel.create(request.body);
      if (!post) {
        return response
          .status(httpStatusCode.INTERNAL_SERVER_ERROR)
          .send({ message: "Enter a valid post" });
      }
      let user_id = request.body.user_id;
      user_id = mongoose.Types.ObjectId(request.body.user_id);
      console.log(user_id);
      response
        .status(httpStatusCode.CREATED)
        .send({ message: "Post created sucessfully" });
    } catch (error) {
      return response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
  async updatePost(request, response) {
    try {
    } catch (error) {}
  }
  async getPost(request, response) {
    try {
    } catch (error) {}
  }
  async getAllPosts(request, response) {
    try {
    } catch (error) {}
  }
  async deletePost(request, response) {
    try {
    } catch (error) {}
  }
}

export default PostController;
