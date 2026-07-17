import { NextFunction, Request, Response } from "express";
import { catchAshync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import  HttpStatus  from "http-status";
import { Result } from "pg";
import { rentalOrderService } from "./rentalOrder.service";
const createRentalOrder = catchAshync(async(req:Request,res:Response, next:NextFunction)=>{
   
     const result = await rentalOrderService.createRentalOrder(
    req.body,
    req.user!.id
  );

  sendResponse(res, {
    success: true,
    statusCode: HttpStatus.CREATED,
    message: "Rental order created successfully",
    data: result,
  });
    
})







export const rentalOrderController ={
    createRentalOrder,
    

}