"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AppController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const my_logger_service_1 = require("./my-logger/my-logger.service");
let AppController = AppController_1 = class AppController {
    constructor(appService, jwtService) {
        this.appService = appService;
        this.jwtService = jwtService;
        this.logger = new my_logger_service_1.MyLoggerService(AppController_1.name);
    }
    async register(ip, firstName, lastName, email, password, position) {
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
    async login(ip, email, password, response) {
        const user = await this.appService.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new common_1.BadRequestException('Invalid email or password');
        }
        const jwt = await this.jwtService.signAsync({ id: user.id });
        const { password: _, ...result } = user;
        response.json({
            result,
            jwt,
        });
        this.logger.log('Success login by ' + ip);
        return user;
    }
    async user(ip, body) {
        try {
            const { email, password, jwt } = body;
            if (!jwt) {
                this.logger.log('JWT token not provided');
                throw new common_1.UnauthorizedException('JWT token not provided');
            }
            const data = await this.jwtService.verifyAsync(jwt);
            if (!data) {
                this.logger.log('Invalid or expired JWT token');
                throw new common_1.UnauthorizedException('Invalid or expired JWT token');
            }
            const user = await this.appService.findOne({ where: { id: data['id'] } });
            if (!user) {
                this.logger.log('User not found');
                throw new common_1.UnauthorizedException('User not found');
            }
            const { password: _, id, ...result } = user;
            this.logger.log('Success get user by ' + ip);
            return result;
        }
        catch (e) {
            throw new common_1.UnauthorizedException();
        }
    }
    async userById(ip, request) {
        try {
            const userId = request.params.id;
            const cookies = request.headers['cookie'];
            const jwtCookie = cookies.split(';').find(cookie => cookie.trim().startsWith('jwt='));
            const jwt = jwtCookie ? jwtCookie.split('=')[1] : null;
            if (!jwt) {
                this.logger.log('JWT token not provided');
                throw new common_1.UnauthorizedException('JWT token not provided');
            }
            const token = jwt.split(' ')[1];
            const data = await this.jwtService.verifyAsync(token);
            if (!data || data.id !== userId) {
                this.logger.log('Invalid or expired JWT token');
                throw new common_1.UnauthorizedException('Invalid or expired JWT token');
            }
            const user = await this.appService.findOne({ where: { id: userId } });
            if (!user) {
                throw new common_1.UnauthorizedException('User not found');
            }
            const { password, id, ...result } = user;
            this.logger.log('success get user by ' + ip);
            return result;
        }
        catch (e) {
            throw new common_1.UnauthorizedException();
        }
    }
    async logout(ip, response) {
        response.clearCookie('jwt');
        this.logger.log('success logout was be ' + ip);
        return {
            message: 'success'
        };
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Body)('firstName')),
    __param(2, (0, common_1.Body)('lastName')),
    __param(3, (0, common_1.Body)('email')),
    __param(4, (0, common_1.Body)('password')),
    __param(5, (0, common_1.Body)('position')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Body)('email')),
    __param(2, (0, common_1.Body)('password')),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('user'),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "user", null);
__decorate([
    (0, common_1.Get)('user/:id'),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "userById", null);
__decorate([
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "logout", null);
exports.AppController = AppController = AppController_1 = __decorate([
    (0, common_1.Controller)('api'),
    __metadata("design:paramtypes", [app_service_1.AppService,
        jwt_1.JwtService])
], AppController);
//# sourceMappingURL=app.controller.js.map