import {  Injectable } from '@nestjs/common';
import { badPasswordException, badRequestException, notFoundException } from 'src/utils/exceptions';
import { UserDto } from './dtos/user.dto';
import { UserService } from './user.service';
import { EXCEPTIONS } from 'src/utils/constants';
import { promisify } from 'util';
import { randomBytes, scrypt as _scrypt } from 'crypto';


const {badException,notFound,passwordException}=EXCEPTIONS.user
const scrypt=promisify(_scrypt)
@Injectable()
export class UserAuthService {
    constructor(private userService:UserService){}

    async signUp(payload:UserDto){
        const {email,password}=payload;
        const user=await this.userService.find(email)
        badRequestException(user,badException)
        const salt=randomBytes(8).toString('hex')
        const hash=(await scrypt(salt,password,32)) as Buffer
        const result=`${salt}.${hash.toString('hex')}`
        const newUser=await this.userService.create({email,password:result})
        return newUser
    }

    async signIn(payload:UserDto){

        const {email,password}=payload;
        const [user]=await this.userService.find(email)
        notFoundException(user,notFound)
        const [salt,]=user.password.split('.')
        const hash=(await scrypt(salt,password,32)) as Buffer
        const result=`${salt}.${hash.toString('hex')}`

        return result===user.password?user:badPasswordException(passwordException)

    }

}
