import { prisma } from "../../lib/prisma";
import { ICreateCategory } from "./category.interfact";
// import { ICreateCategory } from "./category.interface";

const createCategory = async (payload: ICreateCategory) => {
  const result = await prisma.category.create({
    data: payload,
  });

  return result;
};

const getAllCategories = async () => {
  const result = await prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
};

export const categoryService = {
  createCategory,
  getAllCategories,
};