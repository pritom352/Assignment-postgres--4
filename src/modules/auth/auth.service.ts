import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { ILoginUser } from "./auth.interface"

const loginUser = async (payload: ILoginUser) => {
const { email, password } = payload;
const user= await prisma.user.findUniqueOrThrow({
    where: { email }
})
const isPasswordmatch = await bcrypt.compare(password, user.password);

if(!isPasswordmatch){
    throw new Error("Password is incorrect")
}

return user;
}


export const authService = {
    loginUser
}