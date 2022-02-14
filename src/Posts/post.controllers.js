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
            const post = await PostModel.updateOne({ _id: request.params._id }, { title: "hello", Description: "Hey baby" })
            if (!post) {
                return response
                    .status(httpStatusCode.INTERNAL_SERVER_ERROR)
                    .send({ message: "Invalid _Id" });
            }
            return response.status(httpStatusCode.OK).send({ data: post })
        } catch (error) {
            return response
                .status(httpStatusCode.INTERNAL_SERVER_ERROR)
                .send(error.message);
        }
    }
    async getAllPosts(request, response) {
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
            const Post = await PostModel.deleteOne({ _id: request.params._id })
            if (Post) {
                return response.status(httpStatusCode.OK).send({ message: "Post deleted sucessfully" });
            }
            return response.status(httpStatusCode.INTERNAL_SERVER_ERROR).send({ message: "Enter a valid _id" });
        } catch (error) {
            return response
                .status(httpStatusCode.INTERNAL_SERVER_ERROR)
                .send(error.message);
        }
    }
    async usersPostsById(request, response) {
        try {
            const userPost = await PostModel.findOne({ _id: request.params._id })
                .populate({ path: 'user_id', select: ['firstName', 'age'] });
            if (userPost) {
                return response.status(httpStatusCode.OK).send({ data: userPost });
            }
            return response.status(httpStatusCode.INTERNAL_SERVER_ERROR).send({ message: "Users not found" })
        } catch (error) {
            return response
                .status(httpStatusCode.INTERNAL_SERVER_ERROR)
                .send(error.message);
        }
    }
}

export default PostController;
