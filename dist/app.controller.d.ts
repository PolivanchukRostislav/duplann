import { AppService } from './app.service';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
export declare class AppController {
    private readonly appService;
    private jwtService;
    constructor(appService: AppService, jwtService: JwtService);
    private readonly logger;
    register(ip: string, firstName: string, lastName: string, email: string, password: string, position: string): Promise<import("./user.entity").User>;
    login(ip: string, email: string, password: string, response: Response): Promise<import("./user.entity").User>;
    user(ip: string, body: {
        email: string;
        password: string;
        jwt: string;
    }): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        position: string;
    }>;
    logout(ip: string, response: Response): Promise<{
        message: string;
    }>;
    update(ip: string, id: string, body: any): Promise<import("./user.entity").User>;
}
