import { ConsoleLogger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as winston from 'winston';
export declare class MyLoggerService extends ConsoleLogger {
    configService: ConfigService<Record<string, unknown>, false>;
    customFormat: winston.Logform.Format;
    loggerPathDirectory: string;
    loggerFileName: string;
    logger: winston.Logger;
    log(message: any, context?: string): void;
    error(message: any, stackOrContext?: string): void;
    info(message: any, stackOrContext?: string): void;
    debug(message: any, stackOrContext?: string): void;
}
