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

const getMyRentalOrders = catchAshync(async (req, res) => {
  const result = await rentalOrderService.getMyRentalOrders(req.user?.id as string);

  sendResponse(res, {
    success: true,
    statusCode: HttpStatus.OK,
    message: "Rental orders retrieved successfully",
    data: result,
  });
});


const getRentalOrderById = catchAshync(async (req, res) => {
  const result = await rentalOrderService.getRentalOrderById(req.params?.id as string);

  sendResponse(res, {
    success: true,
    statusCode: HttpStatus.OK,
    message: "Rental order retrieved successfully",
    data: result,
  });
});





const getProviderOrders = catchAshync(
  async (req: Request, res: Response, next: NextFunction) => {
    const providerId = req.user?.id;

    const result = await rentalOrderService.getProviderOrders(
      providerId as string
    );

    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: "Provider orders fetched successfully",
      data: result,
    });
  }
);


export const rentalOrderController ={
    createRentalOrder,getMyRentalOrders,
    getRentalOrderById,
    getProviderOrders
    

}