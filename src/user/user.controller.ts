import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Serialize } from 'src/utils/decarators';
import { UserDto } from './dtos/user.dto';
import { UserService } from './user.service';

@Controller('auth')
@Serialize(UserDto)
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
    getUsers(@Query('email') email:string){
        return this.userService.find(email)
    }
    @Patch('update/:id')
     updateUser(@Param('id') id:number,@Body() body:Partial<UserDto>){
        return this.userService.update(id,body)
    }
    @Delete('delete/:id')
    removeUser(@Param('id') id:number){
        return this.userService.remove(id)
    }

}


