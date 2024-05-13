import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, getRepository } from 'typeorm';
import { Works } from './works.entity';
import { MyLoggerService } from 'src/my-logger/my-logger.service';
import { AppController } from 'src/app.controller';

@Injectable()
export class WorksService {
    constructor(
        @InjectRepository(Works)
        private readonly worksRepository: Repository<Works>,
    ) { }  private readonly logger = new MyLoggerService(AppController.name);

    async findAll(): Promise<Works[]> {
        return this.worksRepository.find();
    }

    async findOne(id: number): Promise<Works> {
        return this.worksRepository.findOne({ where: { id } });
    }

    async create(workData: Works): Promise<Works> {
        try {
          
         
          const currentDate = new Date();
      
          const newWork: Works = {
            ...workData,
            AddDate: currentDate,
            UpdateDate: currentDate,
          };
      
          return await this.worksRepository.save(newWork);
        } catch (error) {
          
          throw new Error('Failed to create new work');
        }
      }
      
      

    async update(id: number, updateData: Partial<Works>): Promise<Works> {
        const currentDate = new Date();
        updateData.UpdateDate = currentDate;
        await this.worksRepository.update(id, updateData);
        return this.findOne(id);
    }
    async delete(id: number): Promise<boolean> {
        const worksToDelete = await this.worksRepository.findOne({ where: { id } });
        if (!worksToDelete) return false;

        await this.worksRepository.delete(id);
        return true;
    }

    async findByAuthor(author: string): Promise<Works[]> {
      return this.worksRepository.find({ where: { author } });
    }
  
    async findByName(name: string): Promise<Works[]> {
      return this.worksRepository.find({ where: { name } });
    }
}
