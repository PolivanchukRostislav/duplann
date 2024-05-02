"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyLoggerService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const winston = require("winston");
const winston_1 = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const { combine, timestamp, label, printf } = winston.format;
let MyLoggerService = class MyLoggerService extends common_1.ConsoleLogger {
    constructor() {
        super(...arguments);
        this.configService = new config_1.ConfigService();
        this.customFormat = printf(({ timestamp, level, context, message }) => {
            const contextString = context ? `[${context}]` : '[]';
            return `${timestamp} | ${level} | ${contextString} --- ${message}`;
        });
        this.loggerPathDirectory = this.configService.get('../logs/');
        this.loggerFileName = this.configService.get('LOGGER_LOGS_FILENAME') ||
            'myLoggerFile.log';
        this.logger = (0, winston_1.createLogger)({
            level: 'debug',
            format: combine(label({ label: 'CATEGORY' }), timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), this.customFormat),
            transports: [
                new winston_1.transports.File({
                    dirname: this.loggerPathDirectory,
                    filename: this.loggerFileName,
                }),
                new DailyRotateFile({
                    filename: `${this.loggerFileName}-%DATE%.log`,
                    dirname: this.loggerPathDirectory,
                    datePattern: 'YYYY-MM-DD',
                    zippedArchive: true,
                    maxFiles: '1d',
                }),
            ],
        });
    }
    log(message, context) {
        this.logger.info(message, { context: context });
        super.log(message, context);
    }
    error(message, stackOrContext) {
        this.logger.error(message, { context: stackOrContext });
        super.error(message, stackOrContext);
    }
    info(message, stackOrContext) {
        this.logger.info(message, { context: stackOrContext });
        super.log(message, stackOrContext);
    }
    debug(message, stackOrContext) {
        this.logger.debug(message, { context: stackOrContext });
        super.debug(message, stackOrContext);
    }
};
exports.MyLoggerService = MyLoggerService;
exports.MyLoggerService = MyLoggerService = __decorate([
    (0, common_1.Injectable)()
], MyLoggerService);
//# sourceMappingURL=my-logger.service.js.map