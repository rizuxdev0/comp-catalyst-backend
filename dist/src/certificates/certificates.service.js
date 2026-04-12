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
exports.CertificatesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const certificate_request_entity_1 = require("./entities/certificate-request.entity");
const employee_entity_1 = require("../employees/entities/employee.entity");
let CertificatesService = class CertificatesService {
    constructor(certRepo, employeeRepo) {
        this.certRepo = certRepo;
        this.employeeRepo = employeeRepo;
    }
    async findMyRequests(userId) {
        const employee = await this.employeeRepo.findOne({ where: { userId } });
        if (!employee)
            return [];
        return this.certRepo.find({
            where: { employeeId: employee.id },
            order: { createdAt: 'DESC' },
        });
    }
    async findAll() {
        return this.certRepo.find({
            relations: ['employee'],
            order: { createdAt: 'DESC' },
        });
    }
    async create(userId, data) {
        const employee = await this.employeeRepo.findOne({ where: { userId } });
        if (!employee) {
            throw new common_1.NotFoundException('Aucun profil employé lié à votre compte');
        }
        const request = this.certRepo.create({
            ...data,
            employeeId: employee.id,
            status: certificate_request_entity_1.CertificateRequestStatus.PENDING,
        });
        return this.certRepo.save(request);
    }
    async updateStatus(id, status, processedBy, rejectionReason) {
        const cert = await this.certRepo.findOne({ where: { id } });
        if (!cert)
            throw new common_1.NotFoundException('Demande non trouvée');
        cert.status = status;
        if (processedBy)
            cert.processedBy = processedBy;
        if (rejectionReason)
            cert.rejectionReason = rejectionReason;
        return this.certRepo.save(cert);
    }
};
exports.CertificatesService = CertificatesService;
exports.CertificatesService = CertificatesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(certificate_request_entity_1.CertificateRequest)),
    __param(1, (0, typeorm_1.InjectRepository)(employee_entity_1.Employee)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CertificatesService);
//# sourceMappingURL=certificates.service.js.map