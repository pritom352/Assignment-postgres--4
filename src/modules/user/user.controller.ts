import { NextFunction, Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import config from "../../config";
import { userService } from "./user.service";
import { catchAshync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import jwt from "jsonwebtoken";
import { verifyToken } from "../../utils/verifiedToken";
import { Role } from "../../../generated/prisma/enums";

// const registerUser = async (req: Request, res: Response) => {
//     try{const payload = req.body;
//     const user = await userService.registerUserIntoDB(payload);
//     res.status(200).json({ 
//         success: true,

//         message: "Registration endpoint hit", data: user })}
//         catch (error) {
//             console.error('An error occurred:', error);
//             res.status(500).json({ success: false, message: "An error occurred during registration",error:(error as Error).message });
//         }
// }

const registerUser = catchAshync(async (req: Request, res: Response, next:NextFunction) => {
    const payload = req.body;
    const user = await userService.registerUserIntoDB(payload);
    // res.status(200).json({ 
    //     success: true,

    //     message: "Registration endpoint hit", data: user })
    sendResponse(res,{

        success: true,
        statusCode: 200,
        message: "Registration endpoint hit",
        data: user
    })
    })

const getMyProfile = catchAshync(async (req: Request, res: Response, next:NextFunction) => {

    // res.send("Get my profile endpoint hit")
    // const {accessToken} = req.cookies;

    // const verifiedToken = jwt.verify(accessToken, config.jwt_secret as string)
    
    // const verifiedToken = verifyToken(accessToken, config.jwt_secret as string)



    const profile = await userService.getMyProfileFromDB(req.user?.id as string);
    

    sendResponse(res,{
        success: true,
        statusCode: 200,
        message: "Get my profile endpoint hit",
        data: profile
    })
    
})

export const userController = {
    registerUser,
    getMyProfile
}