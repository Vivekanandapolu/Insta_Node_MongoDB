import postModel from '../Users/user.model.js';
import httpStatusCode from "http-status-codes";
// import mongoose from "../../config/mongoose.js";
import mongoose from 'mongoose'
class PostController {
    async createPost(request, response) {
        try {
            const post = await postModel.create(request.body);
            if (!post) {
                return response.status(httpStatusCode.INTERNAL_SERVER_ERROR).send({ message: "Enter a valid post" });
            }
            let user_id = request.body.user_id
            user_id = mongoose.Types.ObjectId(request.body.user_id);
            console.log(user_id);
            response.status(httpStatusCode.CREATED).send({ message: "Post created sucessfully" });
        } catch (error) {
            return response.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
        }
    }
    async userPostById(request, response) {
        try {
            const post = await postModel.findOne({ user_id: request.params._id })
                .populate({ strictPolupalte: false, path: "Users" });
            if (!post) {
                return response.status(httpStatusCode.INTERNAL_SERVER_ERROR).send({ message: "Post not found" })
            }
            return response.status(httpStatusCode.OK).send({ data: post })
        } catch (error) {
            return response.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
        }
    }
}

export default PostController