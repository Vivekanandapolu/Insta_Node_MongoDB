import mongoose from "mongoose";
//User Schema
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  username: String,
  password: String,
  isAdmin: Boolean,
});
//UserModel
class User {
  //You can write some custom/generic function for user model like Create, Update like that
}
userSchema.loadClass(User);
export default mongoose.model("Users", userSchema);
