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



const updateGear = catchAshync(
  async (req: Request, res: Response, next: NextFunction) => {
    const providerId = req.user?.id;
    const gearId = req.params.id;
    const payload = req.body;

    const result = await gearService.updateGear(
      gearId as string,
      providerId as string,
      payload
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Gear updated successfully",
      data: result,
    });
  }
);




const deleteGear = catchAshync(
  async (req: Request, res: Response, next: NextFunction) => {
    const providerId = req.user?.id;
    const gearId = req.params.id;

    const result = await gearService.deleteGear(
      gearId as string,
      providerId as string
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Gear deleted successfully",
      data: result,
    });
  }
);



export const gearController ={
    createGear,
    getGear,
    getGearById,
    updateGear,
    deleteGear
}