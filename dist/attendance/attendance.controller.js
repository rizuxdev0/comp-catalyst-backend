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
exports.AttendanceController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const attendance_service_1 = require("./attendance.service");
let AttendanceController = class AttendanceController {
    constructor(attendanceService) {
        this.attendanceService = attendanceService;
    }
    getSummary(employeeId, month, year, contractHours, baseSalary) {
        return this.attendanceService.getAttendanceSummary(employeeId, parseInt(month, 10), parseInt(year, 10), parseFloat(contractHours || '40'), parseFloat(baseSalary || '0'));
    }
    findAllRecords(month, startDate, endDate, employeeId, departmentId, status) {
        return this.attendanceService.findAllRecords({
            month,
            startDate,
            endDate,
            employeeId,
            departmentId,
            status,
        });
    }
    createRecord(body) {
        return this.attendanceService.createRecord(body);
    }
    updateRecord(id, body) {
        return this.attendanceService.updateRecord(id, body);
    }
    deleteRecord(id) {
        return this.attendanceService.deleteRecord(id);
    }
};
exports.AttendanceController = AttendanceController;
__decorate([
    (0, common_1.Get)('summary'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtenir le récapitulatif de présence d\'un employé' }),
    __param(0, (0, common_1.Query)('employeeId')),
    __param(1, (0, common_1.Query)('month')),
    __param(2, (0, common_1.Query)('year')),
    __param(3, (0, common_1.Query)('contractHours')),
    __param(4, (0, common_1.Query)('baseSalary')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "getSummary", null);
__decorate([
    (0, common_1.Get)('records'),
    (0, swagger_1.ApiOperation)({ summary: 'Lister les enregistrements de présence' }),
    __param(0, (0, common_1.Query)('month')),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __param(3, (0, common_1.Query)('employeeId')),
    __param(4, (0, common_1.Query)('departmentId')),
    __param(5, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "findAllRecords", null);
__decorate([
    (0, common_1.Post)('records'),
    (0, swagger_1.ApiOperation)({ summary: 'Créer un enregistrement de présence' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "createRecord", null);
__decorate([
    (0, common_1.Patch)('records/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Modifier un enregistrement de présence' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "updateRecord", null);
__decorate([
    (0, common_1.Delete)('records/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer un enregistrement de présence' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "deleteRecord", null);
exports.AttendanceController = AttendanceController = __decorate([
    (0, swagger_1.ApiTags)('Attendance'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)('attendance'),
    __metadata("design:paramtypes", [attendance_service_1.AttendanceService])
], AttendanceController);
//# sourceMappingURL=attendance.controller.js.map