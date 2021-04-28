import { Body, Controller, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserDto } from '../user/model/user.dto';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService, private authService: AuthService) {
  }

  @Post()
  @UseGuards(AuthGuard('local'))
  async registerUser(@Body() userDto: UserDto, @Res() res: Response) {
    const user = await this.userService.registerUser(userDto);
    res.status(HttpStatus.CREATED).send(user);
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Res() res: Response, @Body() user: UserDto) {
    const result = await this.authService.login(user);
    res.status(HttpStatus.FOUND).send(result);
  }
}
