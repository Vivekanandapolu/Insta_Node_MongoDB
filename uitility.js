//importing the bcrypt module
import bcryptjs from "bcryptjs";
export let isValidEmail = (emailAdress) => {
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailAdress.match(regexEmail)) return true;
  return false;
};
export async function encryptPassword(password) {
  const salt = await bcryptjs.genSalt(10);
  const hashPassword = await bcryptjs.hash(password, salt);
  return hashPassword;
}
export async function comparePassword(password, hashPassword) {
  return await bcryptjs.compare(password, hashPassword);
}
