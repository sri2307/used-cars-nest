import { NotFoundException } from "@nestjs/common"

export const notFoundException=(req:any,message:string)=>{
    if(!req) throw new NotFoundException(message)

}