import { NextFunction, Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import config from "../../config";
import { userService } from "./user.service";
import { catchAshync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

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

export const userController = {
    registerUser
}