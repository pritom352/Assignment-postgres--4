import { NextFunction, Request, Response, Router } from "express";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import bcrypt from "bcryptjs";
import { userController } from "./user.controller";
import { verifyToken } from "../../utils/verifiedToken";
import { Role } from "../../../generated/prisma/enums";
import { catchAshync } from "../../utils/catchAsync";
import { auth } from "../../middlewares/auth";


const router= Router()




router.post("/register", userController.registerUser)




router.get("/me",auth(Role.ADMIN,Role.CUSTOMER,Role.PROVIDER) ,userController.getMyProfile)

router.get(
  "/admin/users",
  auth(Role.ADMIN),
  userController.getAllUsers
);


router.patch(
  "/admin/users/:id",
  auth(Role.ADMIN),
  userController.updateUserStatus
);

export const userRouter = router