import express, { Application, Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { prisma } from './lib/prisma'
import bcrypt from 'bcryptjs'
import config from './config'
import { userRouter } from './modules/user/user.route'
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
export default app