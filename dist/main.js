"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const my_logger_service_1 = require("./my-logger/my-logger.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: new my_logger_service_1.MyLoggerService(),
    });
    app.use(cookieParser());
    app.enableCors({
        origin: '*',
        credentials: true
    });
    await app.listen(8000);
}
bootstrap();
//# sourceMappingURL=main.js.map