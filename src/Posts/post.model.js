import mongoose from "mongoose";
const postSchema = new mongoose.Schema(
  {
    title: String,
    Description: String,
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  {
    timestamps: true,
  }
);

const PostModel = new mongoose.model("Post", postSchema);
export default PostModel;