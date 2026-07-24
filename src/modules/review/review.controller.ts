import { Request, Response } from "express";
import httpStatus from "http-status";

import { catchAshync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { reviewService } from "./review.service";

const createReview = catchAshync(async (req: Request, res: Response) => {

    const customerId = req.user?.id as string;

    const result = await reviewService.createReview(
        customerId,
        req.body
    );

    sendResponse(res,{
        success:true,
        statusCode:httpStatus.CREATED,
        message:"Review created successfully",
        data:result
    });

});

export const reviewController = {
    createReview
};