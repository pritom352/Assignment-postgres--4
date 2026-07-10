import { NextFunction, Request, Response } from "express";
import { catchAshync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { authService } from "./auth.service";


const loginUser = catchAshync(async (req: Request, res: Response,next:NextFunction) =>{
    const payload = req.body;

    const loginResult = await authService.loginUser(payload);
    sendResponse(res,{
        success: true,
        statusCode: 200,
        message: "Login successful",
        data: loginResult
    })
})



export const authController = {
    loginUser
}