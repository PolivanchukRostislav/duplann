"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./user.entity");
const jwt_1 = require("@nestjs/jwt");
const my_logger_module_1 = require("./my-logger/my-logger.module");
const works_entity_1 = require("./works/works.entity");
const works_controller_1 = require("./works/works.controller");
const works_service_1 = require("./works/works.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: '123456789',
                database: 'test3',
                entities: [user_entity_1.User, works_entity_1.Works,],
                synchronize: true,
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, works_entity_1.Works,]),
            jwt_1.JwtModule.register({
                secret: 'duplom',
                signOptions: { expiresIn: '1d' },
            }),
            my_logger_module_1.MyLoggerModule,
        ],
        controllers: [app_controller_1.AppController, works_controller_1.WorksController],
        providers: [app_service_1.AppService, works_service_1.WorksService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map