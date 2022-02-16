import mongoose from "mongoose";
//User Schema
const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    age: Number,
    username: String,
    password: String,
    posts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }],
    isAdmin: Boolean,
  },
  {
    timestamps: true,
  }
);
//UserModel
class User {
  //You can write some custom/generic function for user model like Create, Update like that
}
userSchema.loadClass(User);
const userModel = new mongoose.model("Users", userSchema);
export default userModel;
