import { NextFunction, Request, Response } from "express";
import { Role } from "../../generated/prisma/enums";
import { catchAshync } from "../utils/catchAsync";
import { verifyToken } from "../utils/verifiedToken";
import config from "../config";
import { prisma } from "../lib/prisma";


declare global {
    namespace Express{
    interface Request {
        user?:{
          id:string,
          email:string,
          role:Role
          
        }
    }
}
}


export const auth =(...requiredRoles:Role[])=>{
    return catchAshync(async (req:Request, res:Response, next:NextFunction)=>{

        const token= req.cookies.accessToken;

        if(!token){
            throw new Error("You age not logged in. Plese log in to access this resource")
        }

     const verifiedToken = verifyToken(token, config.jwt_secret as string)

    if(!verifiedToken.success){
        throw new Error(verifiedToken.error)
    }
const {id, email, role}= verifiedToken.data;
if(!requiredRoles.includes(role)){
    throw new Error("Forbidden.You don't have permission to access this resource")
}

const user= await prisma.user.findUnique({
    where:{
        id,email,role
    }
})

if(!user){
    throw new Error("User not found")
}

if(user.status === "SUSPENDED"){
    throw new Error("Your account has been blocked. Please contact support.")
}


req.user ={
    id,
    email,
    role
}

next()

    })
   
}