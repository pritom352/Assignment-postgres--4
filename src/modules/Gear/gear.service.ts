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


const getAllGear = async ()=>{
    const allGear = await prisma.gearItem.findMany()
    return allGear
}

const getGearById = async(gearId:string)=>{
    const getGear = await prisma.gearItem.findUniqueOrThrow(
        {
            where:{
                id:gearId
            }
        }
    )
    return getGear
}





const updateGear = async (
  gearId: string,
  providerId: string,
  payload: Partial<ICreateGear>
) => {

  const gear = await prisma.gearItem.findUniqueOrThrow({
    where: {
      id: gearId,
    },
  });

  if (gear.providerId !== providerId) {
    throw new Error("You are not authorized to update this gear");
  }

  const result = await prisma.gearItem.update({
    where: {
      id: gearId,
    },
    data: payload,
  });

  return result;
};



const deleteGear = async (
  gearId: string,
  providerId: string
) => {

  const gear = await prisma.gearItem.findUniqueOrThrow({
    where: {
      id: gearId,
    },
  });

  if (gear.providerId !== providerId) {
    throw new Error("You are not authorized to delete this gear");
  }

  const result = await prisma.gearItem.delete({
    where: {
      id: gearId,
    },
  });

  return result;
};

export const gearService ={
    createGear,
    getAllGear,
    getGearById,
    updateGear,
    deleteGear
}
