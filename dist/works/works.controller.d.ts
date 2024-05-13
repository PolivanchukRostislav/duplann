/// <reference types="multer" />
import { Works } from './works.entity';
import { WorksService } from './works.service';
import { MyLoggerService } from '../my-logger/my-logger.service';
export declare class WorksController {
    private readonly worksService;
    private readonly logger;
    constructor(worksService: WorksService, logger: MyLoggerService);
    create(file: Express.Multer.File, workData: Works, ip: string): Promise<Works>;
    findAll(ip: string): Promise<Works[]>;
    findOne(ip: string, id: string): Promise<Works>;
    update(ip: string, id: string, updateData: Works): Promise<Works>;
    delete(ip: string, id: string): Promise<{
        message: string;
    }>;
    searchWorksByAuthorOrName(ip: string, body: {
        author?: string;
        name?: string;
    }): Promise<Works[]>;
}
