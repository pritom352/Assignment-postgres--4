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


const getGear = catchAshync(async (req:Request, res:Response, next:NextFunction)=>{
    const result = await gearService.getAllGear()
    sendResponse(res,{
        success:true,
        statusCode: 200,
        message:"All Gear Get SuccessFully",
        data:result
    })

})

const getGearById = catchAshync(async(req:Request, res:Response, next:NextFunction)=>{
    const gearId = req.params.id
    if(!gearId){
        throw new Error("Gear Id Required In Params.")
    }
    const result = await gearService.getGearById(gearId as string)
     sendResponse(res,{
        success:true,
        statusCode: 200,
        message:" Gear Get SuccessFully",
        data:result
    })
})



export const gearController ={
    createGear,
    getGear,
    getGearById 
}