import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dtos/user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private repo:Repository<User>){}

    create(user:UserDto){
        const createUser =this.repo.create(user)
        return this.repo.save(createUser)

    }
    findOne(id:number){
        return this.repo.findOne({where:{id:id}})
    }
    find(){
        return this.repo.find()
    }
    async update(id,attr:Partial<User>){
        const user=await this.findOne(id)
        Object.assign(user,attr)
        return this.repo.save(user)
    }
    async remove(id){
        const user=await this.findOne(id)
        return this.repo.remove(user)
    
    }
}
