import httpStatusCode from "http-status-codes";
// import mongoose from "../../config/mongoose.js";
import mongoose from "mongoose";
import userModel from "../Users/user.model.js";
import PostModel from "./post.model.js";
class PostController {
  async createPost(request, response) {
    try {
      //Create post details
      const post = await PostModel.create(request.body);
      if (!post) {
        throw new Error("Enter a valid post details");
      }
      //Convert user_id to ObjectID
      let user_id = mongoose.Types.ObjectId(request.body.user_id);
      //Find and updated posts by user_id in UserModel
      let userDetails = await userModel.findOneAndUpdate(user_id, {
        $push: { posts: post._id },
      });
      //If userDetails not found throw error
      if (!userDetails) {
        throw new Error("Enter valid user_id");
      }
      response
        .status(httpStatusCode.CREATED)
        .send({ message: "Post created sucessfully" });
    } catch (error) {
      return response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
  async getPost(request, response) {
    try {
      const post = await PostModel.findOne({ _id: request.params._id });
      if (!post) {
        return response
          .status(httpStatusCode.INTERNAL_SERVER_ERROR)
          .send({ message: "Invalid _Id" });
      }
      return response.status(httpStatusCode.OK).send({ data: post });
    } catch (error) {
      return response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
  async updatePost(request, response) {
    try {
      const post = await PostModel.updateOne(
        { _id: request.params._id },
        { title: "hello", Description: "Hey baby" }
      );
      if (!post) {
        return response
          .status(httpStatusCode.INTERNAL_SERVER_ERROR)
          .send({ message: "Invalid _Id" });
      }
      return response.status(httpStatusCode.OK).send({ data: post });
    } catch (error) {
      return response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
  async allPosts(request, response) {
    try {
      const posts = await PostModel.find();
      if (posts.length == 0) {
        return response
          .status(httpStatusCode.INTERNAL_SERVER_ERROR)
          .send({ message: "Posts not found" });
      }
      return response.status(httpStatusCode.OK).send({ data: posts });
    } catch (error) {
      return response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
  async deletePost(request, response) {
    try {
      const Post = await PostModel.deleteOne({ _id: request.params._id });
      if (Post) {
        return response
          .status(httpStatusCode.OK)
          .send({ message: "Post deleted sucessfully" });
      }
      return response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .send({ message: "Enter a valid _id" });
    } catch (error) {
      return response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
  async usersPostsById(request, response) {
    try {
      const userPost = await PostModel.findOne({
        _id: request.params._id,
      }).populate({ path: "user_id", select: ["firstName", "age"] });
      if (userPost) {
        return response.status(httpStatusCode.OK).send({ data: userPost });
      }
      return response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .send({ message: "Users not found" });
    } catch (error) {
      return response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
}

export default PostController;
