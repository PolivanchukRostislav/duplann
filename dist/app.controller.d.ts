/// <reference types="cookie-parser" />
import { AppService } from './app.service';
import { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';
export declare class AppController {
    private readonly appService;
    private jwtService;
    constructor(appService: AppService, jwtService: JwtService);
    private readonly logger;
    register(ip: string, firstName: string, lastName: string, email: string, password: string, position: string): Promise<import("./user.entity").User>;
    login(ip: string, email: string, password: string, response: Response): Promise<import("./user.entity").User>;
    user(ip: string, request: Request): Promise<{
        firstName: string;
        lastName: string;
        email: string;
        position: string;
        jwt: string;
    }>;
    userById(ip: string, request: Request): Promise<{
        firstName: string;
        lastName: string;
        email: string;
        position: string;
        jwt: string;
    }>;
    logout(ip: string, response: Response): Promise<{
        message: string;
    }>;
}
