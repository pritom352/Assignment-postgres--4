import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { ILoginUser } from "./auth.interface"
import jwt from "jsonwebtoken";
import config from "../../config";

const loginUser = async (payload: ILoginUser) => {
const { email, password } = payload;
const user= await prisma.user.findUniqueOrThrow({
    where: { email }
})
const isPasswordmatch = await bcrypt.compare(password, user.password);

if(!isPasswordmatch){
    throw new Error("Password is incorrect")
}

const accessToken = jwt.sign({ id: user.id, email: user.email, role: user.role }, config.jwt_secret as string, { expiresIn: '7d' });



const refreshToken = jwt.sign({ id: user.id, email: user.email, role: user.role }, config.jwt_refresh_secret as string, { expiresIn: '30d' });

return {
    accessToken,
    refreshToken
}
}


export const authService = {
    loginUser
}