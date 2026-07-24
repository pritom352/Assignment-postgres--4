import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { rentalOrderController } from "./rentalOrder.controller";

const router = Router()

router.post("/",auth(Role.CUSTOMER, Role.ADMIN, Role.PROVIDER),rentalOrderController.createRentalOrder)

router.get("/",auth(Role.CUSTOMER,Role.PROVIDER,Role.ADMIN),rentalOrderController.getMyRentalOrders)

router.get("/:id",auth(Role.CUSTOMER, Role.ADMIN, Role.PROVIDER),rentalOrderController.getRentalOrderById)



export const rentalOrderRouter = router;