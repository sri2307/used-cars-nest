import { BadRequestException, NotFoundException } from "@nestjs/common"

export const notFoundException=(req:any,message:string)=>{
    if(!req) throw new NotFoundException(message)
}

export const badRequestException=(req:any,message:string)=>{
    if(req.length) throw new BadRequestException(message)
}

export const badPasswordException=(message:string)=>{
    throw new BadRequestException(message)
}