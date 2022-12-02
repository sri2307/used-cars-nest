import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
    @Post('update')
    updateUser(@Body() user:Partial<UserDto>){
        return this.userService.update(user.id,user)
    }
    @Post('delete/:id')
    removeUser(@Param('id') id:number){
        return this.userService.remove(id)
    }

}


