import express, { Application, Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { prisma } from './lib/prisma'
import bcrypt from 'bcryptjs'
import config from './config'
import { userRouter } from './modules/user/user.route'
import { authRoutes } from './modules/auth/auth.route'
import { gearRouters } from './modules/Gear/gear.route'
import { categoryRouter } from './modules/category/category.route'
import { rentalOrderRouter } from './modules/rentalOrder/rentalOrder.router'
const app: Application= express()

 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
    origin: '*',
    credentials: true,
}))







app.get('/', (req:Request, res:Response) => {
    res.send('Hello, World!');
})


// app.post()
app.use("/api/auth",userRouter)
app.use("/api/auth",authRoutes)
app.use("/api",gearRouters)

app.use("/api", categoryRouter);
app.use("/api/rentals",rentalOrderRouter
)

export default app