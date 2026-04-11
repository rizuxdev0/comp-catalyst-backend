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
var AlertsTask_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertsTask = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const employee_entity_1 = require("../employees/entities/employee.entity");
const contract_entity_1 = require("../contracts/entities/contract.entity");
const notifications_service_1 = require("./notifications.service");
const event_emitter_1 = require("@nestjs/event-emitter");
let AlertsTask = AlertsTask_1 = class AlertsTask {
    constructor(employeeRepository, contractRepository, notificationsService, eventEmitter) {
        this.employeeRepository = employeeRepository;
        this.contractRepository = contractRepository;
        this.notificationsService = notificationsService;
        this.eventEmitter = eventEmitter;
        this.logger = new common_1.Logger(AlertsTask_1.name);
    }
    async checkCriticalDates() {
        this.logger.log('Checking for critical dates (probation, contracts, passports)...');
        const today = new Date();
        const in30Days = new Date();
        in30Days.setDate(today.getDate() + 30);
        const expiringContracts = await this.contractRepository.find({
            where: {
                status: contract_entity_1.ContractStatus.ACTIVE,
                endDate: (0, typeorm_2.LessThanOrEqual)(in30Days.toISOString().split('T')[0]),
            },
            relations: ['employee', 'contractType'],
        });
        for (const contract of expiringContracts) {
            if (contract.employee?.userId) {
                this.eventEmitter.emit('contract.expiring', {
                    userId: contract.employee.userId,
                    employeeName: `${contract.employee.first_name} ${contract.employee.last_name}`,
                    daysLeft: this.getDaysDifference(new Date(contract.endDate), today),
                    type: contract.contractType?.name || 'CDD',
                });
            }
        }
        const expiringProbations = await this.employeeRepository.find({
            where: {
                employee_status: 'active',
                probation_end_date: (0, typeorm_2.LessThanOrEqual)(in30Days.toISOString().split('T')[0]),
            },
        });
        for (const employee of expiringProbations) {
            if (employee.userId) {
                await this.notificationsService.create({
                    userId: employee.userId,
                    title: 'Fin de période d\'essai proche',
                    message: `La période d'essai de ${employee.first_name} ${employee.last_name} se termine le ${employee.probation_end_date}.`,
                    type: 'warning',
                    category: 'hr',
                });
            }
        }
    }
    getDaysDifference(date1, date2) {
        const diffTime = Math.abs(date1.getTime() - date2.getTime());
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
};
exports.AlertsTask = AlertsTask;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_8AM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AlertsTask.prototype, "checkCriticalDates", null);
exports.AlertsTask = AlertsTask = AlertsTask_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(employee_entity_1.Employee)),
    __param(1, (0, typeorm_1.InjectRepository)(contract_entity_1.Contract)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        notifications_service_1.NotificationsService,
        event_emitter_1.EventEmitter2])
], AlertsTask);
//# sourceMappingURL=alerts.task.js.map