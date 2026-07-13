import { prisma } from "../../lib/prisma";
import { ICreateGear } from "./gear.interfact";

const createGear = async(payload:ICreateGear, id:string)=>{
    const user = await prisma.user.findFirstOrThrow({
        where:{
            id:id
        }
    })

    if(user.status ==="SUSPENDED"){
        throw new Error("You are not permission to create gear post")
    }

    const result = await prisma.gearItem.create({
        data:{
            ...payload,
            providerId:id
        }
    })

    return result
}


export const gearService ={
    createGear
}