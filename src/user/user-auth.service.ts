import {  Injectable } from '@nestjs/common';
import { badRequestException } from 'src/utils/exceptions';
import { UserDto } from './dtos/user.dto';
import { UserService } from './user.service';
import { EXCEPTIONS } from 'src/utils/constants';


const {badException}=EXCEPTIONS.user

@Injectable()
export class UserAuthService {
    constructor(private userService:UserService){}

    async signUp(payload:UserDto){
        const {email,password}=payload;
        const user=await this.userService.find(email)
        badRequestException(user,badException)
        return user
    }

}
