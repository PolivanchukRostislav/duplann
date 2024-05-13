import { BadRequestException, Body, Controller, Get, Post, Patch, Param, NotFoundException, Delete, Ip, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { Works } from './works.entity';
import { WorksService } from './works.service';
import { MyLoggerService } from '../my-logger/my-logger.service';
import { FileInterceptor } from '@nestjs/platform-express';
import e from 'express';


@Controller('api')
export class WorksController {
    constructor(
        private readonly worksService: WorksService,
        private readonly logger: MyLoggerService,
    ) { }

    @Post('works')
    @UseInterceptors(FileInterceptor('file'))
    async create(@UploadedFile() file: Express.Multer.File, @Body() workData: Works, @Ip() ip: string,): Promise<Works> {
        try {
            const currentDate = new Date();
            const newWork: Works = {
                ...workData,
                AddDate: currentDate,
                UpdateDate: currentDate,
                file: file.buffer
            };
            this.logger.log('robota dodano' + ip);
            return await this.worksService.create(newWork);
        } catch (error) {
            this.logger.log(error.message + ip);
            throw new BadRequestException(error.message);
        }
    }

    @Get('works')
    async findAll(@Ip() ip: string,): Promise<Works[]> {
        try {
            return await this.worksService.findAll();
        } catch (error) {
            this.logger.log(error.message + ip);
            throw new NotFoundException('No works found');
        }
    }

    @Get('works/:id')
    async findOne(@Ip() ip: string, @Param('id') id: string): Promise<Works> {
        try {
            const work = await this.worksService.findOne(+id);
            if (!work) {
                this.logger.log('Work not found' + ip);
                throw new NotFoundException('Work not found');
            }
            return work;
        } catch (error) {
            this.logger.log(error.message + ip);
            throw new NotFoundException('Work not found');
        }
    }

    @Patch('works/:id')
    async update(@Ip() ip: string, @Param('id') id: string, @Body() updateData: Works): Promise<Works> {
        try {
            const updatedWork = await this.worksService.update(+id, updateData);
            if (!updatedWork) {
                this.logger.log('Work not found' + ip);
                throw new NotFoundException('Work not found');
            }
            this.logger.log('robota onovleno' + ip);
            return updatedWork;
        } catch (error) {
            this.logger.log(error.message + ip);
            throw new BadRequestException(error.message);
        }
    }

    @Delete('works/:id')
    async delete(@Ip() ip: string, @Param('id') id: string): Promise<{ message: string }> {
        try {
            const deletedWork = await this.worksService.delete(+id);
            if (!deletedWork) {
                this.logger.log('Work not found' + ip);
                throw new NotFoundException('Work not found');
            }
            this.logger.log('Work deleted successfully' + ip);
            return { message: 'Work deleted successfully' };
        } catch (error) {
            this.logger.log(error.message + ip);
            throw new BadRequestException(error.message);
        }
    }


    @Post('work/search')
    async searchWorksByAuthorOrName(@Ip() ip: string, @Body() body: { author?: string; name?: string }): Promise<Works[]> {
        const { author, name } = body;

        if (author) {
            const workByAuthor = this.worksService.findByAuthor(author);
            if ((await workByAuthor).length == 0) {
                this.logger.log('work with author ' + author + ' not found' + ip);
                throw new NotFoundException('Work not found');
            } else {
                this.logger.log('work with author ' + author + ' found ' + ip);
                return workByAuthor;
            }

        } else if (name) {


            const workByName = this.worksService.findByName(name);
            if ((await workByName).length == 0) {
                this.logger.log('work with name ' + name, +'not found ' + ip);
                throw new NotFoundException('Work not found');
            } else {
                this.logger.log('work with name ' + name, +' found ' + ip);
                return workByName;
            }

        } else {
            this.logger.log('Please provide either "author" or "name" parameter ' + ip);
            throw new Error('Please provide either "author" or "name" parameter');
        }
    }



}
