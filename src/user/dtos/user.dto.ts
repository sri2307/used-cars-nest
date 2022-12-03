import {IsEmail,IsString} from 'class-validator'
import {Expose} from 'class-transformer'


export class UserDto{
    @Expose()
    id?:number;
    @Expose()
    @IsEmail()
    email:string;
    @IsString()
    password:string;
}