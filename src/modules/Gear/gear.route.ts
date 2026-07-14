import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { gearController } from "./gear.controller";

const router = Router()

router.post("/provider/gear",auth(Role.PROVIDER),gearController.createGear)
router.get("/gear",gearController.getGear)







export const gearRouters = router