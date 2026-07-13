import { NextFunction, Request, Response } from "express";
import { catchAshync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { authService } from "./auth.service";


const loginUser = catchAshync(async (req: Request, res: Response,next:NextFunction) =>{
    const payload = req.body;

    const {accessToken, refreshToken} = await authService.loginUser(payload);

res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
});

res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
});



    sendResponse(res,{
        success: true,
        statusCode: 200,
        message: "Login successful",
        data: { accessToken, refreshToken }
    })
})

const refreshToken =catchAshync(async (req:Request, res:Response, next:NextFunction)=>{
 const refreshToken = req.cookies.refreshToken;
 const {accessToken} = await authService.refreshToken(refreshToken)

res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
});
 
 sendResponse(res,{
    success:true,
    statusCode: 200,
    message:"Token Refreshed Successfully",
    data:accessToken

 })
})

export const authController = {
    loginUser,
    refreshToken
}