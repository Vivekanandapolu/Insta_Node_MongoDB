import httpStatusCode from "http-status-codes";
import { isValidEmail, encryptPassword } from "../../uitility.js";
import UserModel from "./user.model.js";
export default class UserController {
  async userSignup(request, response) {
    try {
      if (!isValidEmail(request.body.username)) {
        response
          .status(httpStatusCode.INTERNAL_SERVER_ERROR)
          .send("Enter a Valid username");
      }
      const user = await UserModel.findOne({
        username: request.body.username,
      });
      if (user) {
        return response
          .status(httpStatusCode.INTERNAL_SERVER_ERROR)
          .send("user already exists");
      }
      const hashPassword = await encryptPassword(request.body.password);
      request.body.password = hashPassword;
      await UserModel.create(request.body);
      response
        .status(httpStatusCode.CREATED)
        .send("User registered sucessfully");
    } catch (error) {
      console.log(error.message);
      response.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }
  //To find all queries in the database
  async findall(request, response) {
    try {
      const user = await UserModel.find();
      if (user) {
        response.status(httpStatusCode.OK).send(user)
      }
    } catch (error) {
      response.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(error)
    }
  }
  //Finding the data by using the default:_Id in database
  async findById(request, response) {
    try {
      const user = await UserModel.findById(request.params._id)
      console.log(user);
      if (user) {
        response.status(httpStatusCode.OK).send(user);
      }
    } catch (error) {
      response.status(httpStatusCode.OK).send(error)
    }
  }
}
