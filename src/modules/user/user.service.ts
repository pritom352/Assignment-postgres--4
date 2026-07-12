import bcrypt from "bcryptjs";
import config from "../../config";
import { prisma } from "../../lib/prisma";
import { RegisterUserPayload } from "./user.interface";



const registerUserIntoDB = async(payload: RegisterUserPayload)=>{
    const {name, email, password, phone, profileImage, address, shopName, role, status,} = payload;
    // console.log("Received payload:", {name, email, password, phone, profileImage, address, shopName, role, status});

    const isUserExist = await prisma.user.findUnique({
        where: { email },
    });
    if(isUserExist){
        throw new Error("User already exists")}
    const hashedPassword = await bcrypt.hash(password,Number(config.bcrypt_salt_rounds));

    const createdUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            phone,
            profileImage,
            address,
            shopName,
            role,
            status
        }
    });
    const user = await prisma.user.findUnique({
        where:{
            id: createdUser.id
        },
        omit: {
            password: true
        }
    })

    return user
}


const getMyProfileFromDB = async (userId: string) => {
    const user = await prisma.user.findUniqueOrThrow({
        where: { id: userId },
        omit: {
            password: true
        }
    });
    return user;
};

export const userService = {
    registerUserIntoDB,
    getMyProfileFromDB
}