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
exports.WorksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const works_entity_1 = require("./works.entity");
const my_logger_service_1 = require("../my-logger/my-logger.service");
const app_controller_1 = require("../app.controller");
let WorksService = class WorksService {
    constructor(worksRepository) {
        this.worksRepository = worksRepository;
        this.logger = new my_logger_service_1.MyLoggerService(app_controller_1.AppController.name);
    }
    async findAll() {
        return this.worksRepository.find();
    }
    async findOne(id) {
        return this.worksRepository.findOne({ where: { id } });
    }
    async create(workData) {
        try {
            const currentDate = new Date();
            const newWork = {
                ...workData,
                AddDate: currentDate,
                UpdateDate: currentDate,
            };
            return await this.worksRepository.save(newWork);
        }
        catch (error) {
            throw new Error('Failed to create new work');
        }
    }
    async update(id, updateData) {
        const currentDate = new Date();
        updateData.UpdateDate = currentDate;
        await this.worksRepository.update(id, updateData);
        return this.findOne(id);
    }
    async delete(id) {
        const worksToDelete = await this.worksRepository.findOne({ where: { id } });
        if (!worksToDelete)
            return false;
        await this.worksRepository.delete(id);
        return true;
    }
    async findByAuthor(author) {
        return this.worksRepository.find({ where: { author } });
    }
    async findByName(name) {
        return this.worksRepository.find({ where: { name } });
    }
};
exports.WorksService = WorksService;
exports.WorksService = WorksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(works_entity_1.Works)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], WorksService);
//# sourceMappingURL=works.service.js.map