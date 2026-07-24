import { OrderStatus } from "../../../generated/prisma/enums";

export interface ICreateRentalOrder {
    gearId:string;
    startDate:Date;
    endDate:Date;
    quantity:number;
}



export interface IUpdateOrderStatus {
  status: OrderStatus;
}