import httpStatusCode from "http-status-codes";
import { isValidEmail, encryptPassword, } from '../../uitility.js';
import userModel from "../../index.js";
class userController {
    async userSignup(request, response) {
        try {
            if (!isValidEmail(request.body.username)) {
                response.status(httpStatusCode.INTERNAL_SERVER_ERROR).send("Enter a Valid username");
            }
            const user = await userModel.model.find({ username: request.body.username });
            if (user) {
                return response.status(httpStatusCode.INTERNAL_SERVER_ERROR).send("user already exists");
            }
            const hashPassword = await encryptPassword(request.body.password);
            request.body.password = hashPassword;
            await userModel.create(request.body);
            response.status(httpStatusCode.CREATED).send("User registered sucessfully");
        } catch (error) {
            console.log(error.message);
            response.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
        }
    }
    async create(request, response) {
        if (!isValidEmail(request.body.username)) {
            return response.status(httpStatusCode.INTERNAL_SERVER_ERROR).send("Enter a Valid username");
        }
        const user = await userModel.find({ username: request.body.username });
        if (user) {
            response.status(httpStatusCode.INTERNAL_SERVER_ERROR).send("user already exists");
        }
        const hashPassword = await encryptPassword(request.body.password);
        request.body.password = hashPassword;
        await userModel.create(request.body);
        response.status(httpStatusCode.CREATED).send("User registered sucessfully");
    }
}

export default userController