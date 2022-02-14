import httpStatusCode from "http-status-codes";
import { isValidEmail, encryptPassword, comparePassword } from "../../uitility.js";
import userModel from "./user.model.js";
export default class UserController {
  async userSignup(request, response) {
    try {
      if (!isValidEmail(request.body.username)) {
        return response
          .status(httpStatusCode.INTERNAL_SERVER_ERROR)
          .send("Enter a Valid username");
      }
      const user = await userModel.findOne({
        username: request.body.username,
      });
      if (user) {
        return response
          .status(httpStatusCode.INTERNAL_SERVER_ERROR)
          .send("user already exists");
      }
      if (request.body.password.length > 5) {
        const hashPassword = await encryptPassword(request.body.password);
        request.body.password = hashPassword;
        await userModel.create(request.body);
        return response
          .status(httpStatusCode.CREATED)
          .send("User registered sucessfully");
      }
      else {
        return response.status(httpStatusCode.INTERNAL_SERVER_ERROR).send({ message: "Password must be more than 5 characters" })
      }
    }
    catch (error) {
      console.log(error.message);
      return response.status(httpStatusCode.INTERNAL_SERVER_ERROR).send({ Error: error.message });
    }
  }
  //To find all queries in the database
  async allUsers(request, response) {
    try {
      //Records will be ordered by the descending order by using the SORT() Method 
      const user = await userModel.find({ firstName: request.params.firstName }).sort({ _id: 1 });
      if (user.length > 0) {
        return response.status(httpStatusCode.OK).send(user)
      }
      else {
        return response
          .status(httpStatusCode.INTERNAL_SERVER_ERROR)
          .send({ message: "Users not found" });
      }
    } catch (error) {
      return response.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(error.message)
    }
  }
  //Finding the data by using the default:_Id in database
  async userDetailsById(request, response) {
    try {
      const user = await userModel.findById(request.params._id)
      if (user.length == 0) {
        return response
          .status(httpStatusCode.INTERNAL_SERVER_ERROR)
          .send({ message: "User not found" });
      }
      else {
        return response.status(httpStatusCode.OK).send(user);
      }
    } catch (error) {
      return response.status(httpStatusCode.OK).send(error.message)
    }
  }
  //Login User
  async userLogin(request, response) {
    try {
      //Check whether thr user is already exits or not
      let user = await userModel.findOne({
        username: request.body.username
      });

      //If not exists send error message
      if (!user) {
        return response
          .status(httpStatusCode.INTERNAL_SERVER_ERROR)
          .send({ message: "Enter a valid username" });
      }
      //Check if the user entered a valid password or not 
      let passwordStatus = await comparePassword(request.body.password, user.password);

      if (passwordStatus) {
        delete user.password;
        return response.status(httpStatusCode.OK).send({ data: user });
      }
      //If the user entered a wrong password send error message what it is!
      else {
        return response.status(httpStatusCode.INTERNAL_SERVER_ERROR).send({ message: "Enter a valid password" })
      }
    } catch (error) {
      return response.status(httpStatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message });
    }
  }

  //Finding the single user by using the firstName in the Params by using the findOne method
  async singleUser(request, response) {
    try {
      const user = await userModel.findOne({ firstName: request.params.firstName });
      console.log(user);
      //If the user entered a wrong firstName send error message what it is!
      if (!user) {
        return response.status(httpStatusCode.INTERNAL_SERVER_ERROR).send({ message: "User not found" });
      }
      return response.status(httpStatusCode.OK).send({ User: user })
    } catch (error) {
      return response.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }
  //Updating existing user by using the updateOne() with the refference of firstName;
  async updatingSingleUser(request, response) {
    try {
      const user = await userModel.updateOne({ firstName: request.params.firstName }, { firstName: "Reddy" }, { upsert: true });
      if (!user) {
        return response.status(httpStatusCode.INTERNAL_SERVER_ERROR).send({ message: "User not found" });
      }
      return response.status(httpStatusCode.OK).send({ data: user });
    } catch (error) {
      return response.status(httpStatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message });
    }
  }
  //Updating existing user by using the updateOne() with the refference of firstName;
  async updatingAllUsers(request, response) {
    try {
      const user = await userModel.updateMany({ firstName: request.params.firstName }, { firstName: "Reddy" });
      if (user.length == 0) {
        throw new Error({ message: "User not found" })
      }
      console.log(user);
      return response.status(httpStatusCode.OK).send({ data: user });
    } catch (error) {
      return response.status(httpStatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message });
    }
  }
  async destroyAll(request, response) {
    try {
      const users = await userModel.deleteMany({ firstName: request.params.firstName });
      if (users.length == 0) {
        return response.status(httpStatusCode.INTERNAL_SERVER_ERROR).send({ message: "Users not found" });
      }
      return response.status(httpStatusCode.OK).send({ message: "Users deleted sucessfully" });
    } catch (error) {
      return response.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(error.message)
    }
  }
}
