import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Session,
} from '@nestjs/common';
import { Serialize } from 'src/utils/decarators';
import { UserDto } from './dtos/user.dto';
import { UserAuthService } from './user-auth.service';
import { UserService } from './user.service';

@Controller('auth')
@Serialize(UserDto)
export class UserController {
  constructor(
    private userService: UserService,
    private authService: UserAuthService,
  ) {}
  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
    return 'Signed Out Successfully';
  }
  @Get('/whoami')
  getSession(@Session() session: any) {
    return this.userService.findOne(session.userId);
  }
  @Post('signup')
  async createUser(@Body() body: UserDto, @Session() session: any) {
    const user = await this.authService.signUp(body);
    session.userId = user.id;
    return user;
  }
  @Post('login')
  async login(@Body() body: UserDto, @Session() session: any) {
    const user = await this.authService.signIn(body);
    session.userId = user.id;

    return user;
  }
  @Get('find/:id')
  getOneUser(@Param('id') id: number) {
    return this.userService.findOne(id);
  }
  @Get('find')
  getUsers(@Query('email') email: string) {
    return this.userService.find(email);
  }
  @Patch('update/:id')
  updateUser(@Param('id') id: number, @Body() body: Partial<UserDto>) {
    return this.userService.update(id, body);
  }
  @Delete('delete/:id')
  removeUser(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
