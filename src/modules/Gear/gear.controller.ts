import { NextFunction, Request, Response } from "express";
import { catchAshync } from "../../utils/catchAsync";
import { gearService } from "./gear.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const createGear =catchAshync(async (req:Request, res:Response, next:NextFunction)=>{
    const id = req.user?.id;
    const payload = req.body;
    const result = await gearService.createGear(payload, id as string)

    sendResponse(res,{
        success:true,
        statusCode: httpStatus.CREATED,
        message:"Gear post created SuccessFully",
        data:result
    })
})



export const gearController ={
    createGear
}