//importing the bcrypt module 
import bcrypt from 'bcryptjs';
export let isValidEmail = (emailAdress) => {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailAdress.match(regexEmail))
        return true;
    return false;
}
export async function encryptPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
}
export async function comparePassword(password, hashPassword) {
    return await bcrypt.compare(password, hashPassword);
}
