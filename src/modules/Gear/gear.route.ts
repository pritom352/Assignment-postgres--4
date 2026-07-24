import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { gearController } from "./gear.controller";

const router = Router()

router.post("/provider/gear",auth(Role.PROVIDER),gearController.createGear)
router.get("/gear",gearController.getGear)
router.get("/gear/:id",gearController.getGearById)
router.put(
    "/provider/gear/:id",
    auth(Role.PROVIDER),
    gearController.updateGear
)
router.delete(
  "/provider/gear/:id",
  auth(Role.PROVIDER),
  gearController.deleteGear
);






export const gearRouters = router