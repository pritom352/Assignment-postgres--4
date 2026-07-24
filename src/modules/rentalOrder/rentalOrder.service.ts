import { prisma } from "../../lib/prisma";
import { ICreateRentalOrder } from "./rentalOrder.interfact";

const createRentalOrder = async (
  payload: ICreateRentalOrder,
  customerId: string
) => {
  const gear = await prisma.gearItem.findUniqueOrThrow({
    where: {
      id: payload.gearId,
    },
  });

  if (!gear.available) {
    throw new Error("Gear is not available");
  }

  if (gear.stock < payload.quantity) {
    throw new Error("Not enough stock available");
  }

  const totalDays = Math.ceil(
    (new Date(payload.endDate).getTime() -
      new Date(payload.startDate).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  if (totalDays <= 0) {
    throw new Error("Invalid rental dates");
  }

  const totalPrice =
    totalDays * gear.pricePerDay * payload.quantity;

  const result = await prisma.rentalOrder.create({
  data: {
    customerId,
    providerId: gear.providerId,
    gearId: gear.id,

    startDate: new Date(payload.startDate),
    endDate: new Date(payload.endDate),

    quantity: payload.quantity,
    totalDays,
    totalPrice,
  },
});

  return result;
};







const getMyRentalOrders = async (customerId: string) => {
  return prisma.rentalOrder.findMany({
    where: {
      customerId,
    },
    include: {
      gear: true,
    },
  });
};





const getRentalOrderById = async (id: string) => {
  return prisma.rentalOrder.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      gear: true,
      customer: true,
      provider: true,
    },
  });
};



const getProviderOrders = async (providerId: string) => {
  const result = await prisma.rentalOrder.findMany({
    where: {
      providerId,
    },

    include: {
      customer: true,
      gear: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
};


export const rentalOrderService = {
createRentalOrder,
getMyRentalOrders,
getRentalOrderById,
getProviderOrders
}