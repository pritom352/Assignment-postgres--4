import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { categoryController } from "./category.controller";

const router = Router();

// Only Admin can create category
router.post(
  "/categories",
  auth(Role.ADMIN,Role.CUSTOMER,Role.PROVIDER),
  categoryController.createCategory
);

// Public Route
router.get(
  "/categories",
  categoryController.getAllCategories
);

export const categoryRouter = router;