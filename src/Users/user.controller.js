import httpStatusCode from "http-status-codes";
import { isValidEmail, encryptPassword, comparePassword } from "../../uitility.js";
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
  async allUsers(request, response) {
    try {
      const user = await UserModel.find();
      if (user.length > 0) {
        response.status(httpStatusCode.OK).send(user)
      }
      else {
        return response
          .status(httpStatusCode.INTERNAL_SERVER_ERROR)
          .send({ message: "Users not found" });
      }
    } catch (error) {
      response.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(error.message)
    }
  }
  //Finding the data by using the default:_Id in database
  async userDetailsById(request, response) {
    try {
      const user = await UserModel.findById(request.params._id)
      if (user) {
        response.status(httpStatusCode.OK).send(user);
      }
      else {
        console.log(user);
        return response
          .status(httpStatusCode.INTERNAL_SERVER_ERROR)
          .send({ message: "User not found" });
      }
    } catch (error) {
      response.status(httpStatusCode.OK).send(error.message)
    }
  }
  async userLogin(request, response) {
    try {
      //Step:1 finding the existing User by using user
      let user = await UserModel.findOne({
        username: request.body.username
      });
      if (!user)
        return response
          .status(httpStatusCode.INTERNAL_SERVER_ERROR)
          .send({ message: "Enter a valid Username" });

      //Compare password
      let passwordStatus = await comparePassword(
        request.body.password,
        user.password
      );
      if (passwordStatus) {
        delete user.password;
        return response
          .status(httpStatusCode.OK)
          .send({ message: "User Logged in sucessfully", data: user });
      }
      return response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .send({ message: "Please enter a valid password" });
    } catch (error) {
      response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .send({ message: error.message });
    }
  }
}
