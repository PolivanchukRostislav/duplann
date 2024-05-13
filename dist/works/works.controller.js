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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorksController = void 0;
const common_1 = require("@nestjs/common");
const works_entity_1 = require("./works.entity");
const works_service_1 = require("./works.service");
const my_logger_service_1 = require("../my-logger/my-logger.service");
const platform_express_1 = require("@nestjs/platform-express");
let WorksController = class WorksController {
    constructor(worksService, logger) {
        this.worksService = worksService;
        this.logger = logger;
    }
    async create(file, workData, ip) {
        try {
            const currentDate = new Date();
            const newWork = {
                ...workData,
                AddDate: currentDate,
                UpdateDate: currentDate,
                file: file.buffer
            };
            this.logger.log('robota dodano' + ip);
            return await this.worksService.create(newWork);
        }
        catch (error) {
            this.logger.log(error.message + ip);
            throw new common_1.BadRequestException(error.message);
        }
    }
    async findAll(ip) {
        try {
            return await this.worksService.findAll();
        }
        catch (error) {
            this.logger.log(error.message + ip);
            throw new common_1.NotFoundException('No works found');
        }
    }
    async findOne(ip, id) {
        try {
            const work = await this.worksService.findOne(+id);
            if (!work) {
                this.logger.log('Work not found' + ip);
                throw new common_1.NotFoundException('Work not found');
            }
            return work;
        }
        catch (error) {
            this.logger.log(error.message + ip);
            throw new common_1.NotFoundException('Work not found');
        }
    }
    async update(ip, id, updateData) {
        try {
            const updatedWork = await this.worksService.update(+id, updateData);
            if (!updatedWork) {
                this.logger.log('Work not found' + ip);
                throw new common_1.NotFoundException('Work not found');
            }
            this.logger.log('robota onovleno' + ip);
            return updatedWork;
        }
        catch (error) {
            this.logger.log(error.message + ip);
            throw new common_1.BadRequestException(error.message);
        }
    }
    async delete(ip, id) {
        try {
            const deletedWork = await this.worksService.delete(+id);
            if (!deletedWork) {
                this.logger.log('Work not found' + ip);
                throw new common_1.NotFoundException('Work not found');
            }
            this.logger.log('Work deleted successfully' + ip);
            return { message: 'Work deleted successfully' };
        }
        catch (error) {
            this.logger.log(error.message + ip);
            throw new common_1.BadRequestException(error.message);
        }
    }
    async searchWorksByAuthorOrName(ip, body) {
        const { author, name } = body;
        if (author) {
            const workByAuthor = this.worksService.findByAuthor(author);
            if ((await workByAuthor).length == 0) {
                this.logger.log('work with author ' + author + ' not found' + ip);
                throw new common_1.NotFoundException('Work not found');
            }
            else {
                this.logger.log('work with author ' + author + ' found ' + ip);
                return workByAuthor;
            }
        }
        else if (name) {
            const workByName = this.worksService.findByName(name);
            if ((await workByName).length == 0) {
                this.logger.log('work with name ' + name, +'not found ' + ip);
                throw new common_1.NotFoundException('Work not found');
            }
            else {
                this.logger.log('work with name ' + name, +' found ' + ip);
                return workByName;
            }
        }
        else {
            this.logger.log('Please provide either "author" or "name" parameter ' + ip);
            throw new Error('Please provide either "author" or "name" parameter');
        }
    }
};
exports.WorksController = WorksController;
__decorate([
    (0, common_1.Post)('works'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Ip)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, works_entity_1.Works, String]),
    __metadata("design:returntype", Promise)
], WorksController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('works'),
    __param(0, (0, common_1.Ip)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WorksController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('works/:id'),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], WorksController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('works/:id'),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, works_entity_1.Works]),
    __metadata("design:returntype", Promise)
], WorksController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('works/:id'),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], WorksController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)('work/search'),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], WorksController.prototype, "searchWorksByAuthorOrName", null);
exports.WorksController = WorksController = __decorate([
    (0, common_1.Controller)('api'),
    __metadata("design:paramtypes", [works_service_1.WorksService,
        my_logger_service_1.MyLoggerService])
], WorksController);
//# sourceMappingURL=works.controller.js.map