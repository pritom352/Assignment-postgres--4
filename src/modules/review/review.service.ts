import { prisma } from "../../lib/prisma";
import { OrderStatus } from "../../../generated/prisma/enums";
import { ICreateReview } from "./review.interfact";

const createReview = async (
    customerId:string,
    payload:ICreateReview
)=>{

    // Gear exists?
    const gear = await prisma.gearItem.findUniqueOrThrow({
        where:{
            id:payload.gearId
        }
    });

    // Customer really rented it?
    const rental = await prisma.rentalOrder.findFirst({
        where:{
            customerId,
            gearId:payload.gearId,
            status:OrderStatus.RETURNED
        }
    });

    if(!rental){
        throw new Error(
            "You can only review a returned rental gear."
        );
    }

    // Already reviewed?
    const existingReview = await prisma.review.findFirst({
        where:{
            customerId,
            gearId:payload.gearId
        }
    });

    if(existingReview){
        throw new Error("You already reviewed this gear.");
    }

    const result = await prisma.review.create({

        data:{
            customerId,
            gearId:payload.gearId,
            rating:payload.rating,
            comment:payload.comment as string
        }

    });

    return result;

};

export const reviewService = {
    createReview
};