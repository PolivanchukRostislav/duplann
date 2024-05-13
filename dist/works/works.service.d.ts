import { Repository } from 'typeorm';
import { Works } from './works.entity';
export declare class WorksService {
    private readonly worksRepository;
    constructor(worksRepository: Repository<Works>);
    private readonly logger;
    findAll(): Promise<Works[]>;
    findOne(id: number): Promise<Works>;
    create(workData: Works): Promise<Works>;
    update(id: number, updateData: Partial<Works>): Promise<Works>;
    delete(id: number): Promise<boolean>;
    findByAuthor(author: string): Promise<Works[]>;
    findByName(name: string): Promise<Works[]>;
}
