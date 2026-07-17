import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { rentalOrderController } from "./rentalOrder.controller";

const router = Router()

router.post("/",auth(Role.CUSTOMER, Role.ADMIN, Role.PROVIDER),rentalOrderController.createRentalOrder)

// router.get("/rentals",auth(Role.CUSTOMER),rentalOrderController)

// router.get("/rentals/:id",auth(Role.CUSTOMER),rentalOrderController)



export const rentalOrderRouter = router;