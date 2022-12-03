import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { runInThisContext } from 'vm';
import { UserDto } from './dtos/user.dto';
import { UserService } from './user.service';

@Controller('auth')
export class UserController {
    constructor(private userService:UserService){}
    @Post('signup')
    createUser(@Body() body:UserDto){
        this.userService.create(body)
    }
    @Get('find/:id')
    getOneUser(@Param('id') id:number){
        return this.userService.findOne(id)
    }
    @Get('find')
    getUsers(){
        return this.userService.find()
    }
    @Patch('update/:id')
     updateUser(@Param('id') id:number,@Body() body:Partial<UserDto>){
        const user = this.userService.update(id,body)
        return user
    }
    @Delete('delete/:id')
    removeUser(@Param('id') id:number){
        return this.userService.remove(id)
    }

}


