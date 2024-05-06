import { BadRequestException, Body, Controller, Get, Post, Req, Res, UnauthorizedException, Ip } from '@nestjs/common';
import { AppService } from './app.service';
import * as bcrypt from 'bcrypt';
import { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { MyLoggerService } from './my-logger/my-logger.service';

@Controller('api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private jwtService: JwtService) { }
  private readonly logger = new MyLoggerService(AppController.name);


  @Post('register')
  async register(
    @Ip() ip: string,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('position') position: string,) {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await this.appService.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      position,
    });
    delete user.password;
    this.logger.log('registation was be ' + ip);
    return user;
  }


  @Post('login')
  async login(
    @Ip() ip: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Res() response: Response, 
  ) {
    const user = await this.appService.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid email or password');
    }

    const jwt = await this.jwtService.signAsync({ id: user.id });
    const { password: _,  ...result } = user;

    response.json({
      result,
      jwt,
    });

    this.logger.log('Success login by ' + ip);

    return user;
  }

  @Get('user')
  async user(@Ip() ip: string, @Body() body: { email: string, password: string, jwt: string }) {
    try {
      const { email, password, jwt } = body;
      if (!jwt) {
        this.logger.log('JWT token not provided');
        throw new UnauthorizedException('JWT token not provided');
      }

      const data = await this.jwtService.verifyAsync(jwt);
      if (!data) {
        this.logger.log('Invalid or expired JWT token');
        throw new UnauthorizedException('Invalid or expired JWT token');
      }

      const user = await this.appService.findOne({ where: { id: data['id'] } });
      if (!user) {
        this.logger.log('User not found');
        throw new UnauthorizedException('User not found');
      }

      const { password: _, id, ...result } = user;
      this.logger.log('Success get user by ' + ip);
      return result;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  @Get('user/:id')
  async userById(@Ip() ip: string, @Req() request: Request) {
    try {
      const userId = request.params.id; 
      const cookies = request.headers['cookie']; 
      const jwtCookie = cookies.split(';').find(cookie => cookie.trim().startsWith('jwt=')); 
      const jwt = jwtCookie ? jwtCookie.split('=')[1] : null;
      if (!jwt) {
        this.logger.log('JWT token not provided');
        throw new UnauthorizedException('JWT token not provided');
      }

      const token = jwt.split(' ')[1]; 

      const data = await this.jwtService.verifyAsync(token);

      if (!data || data.id !== userId) {
        this.logger.log('Invalid or expired JWT token');
        throw new UnauthorizedException('Invalid or expired JWT token');
      }

      const user = await this.appService.findOne({ where: { id: userId } });
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const { password, id, ...result } = user;
      this.logger.log('success get user by ' + ip);
      return result;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  @Post('logout')
  async logout(@Ip() ip: string, @Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    this.logger.log('success logout was be ' + ip);
    return {
      message: 'success'
    };
  }

}
