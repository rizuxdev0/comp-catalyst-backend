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
const event_emitter_1 = require("@nestjs/event-emitter");
const certificate_request_entity_1 = require("./entities/certificate-request.entity");
const employee_entity_1 = require("../employees/entities/employee.entity");
let CertificatesService = class CertificatesService {
    constructor(certRepo, employeeRepo, eventEmitter, dataSource) {
        this.certRepo = certRepo;
        this.employeeRepo = employeeRepo;
        this.eventEmitter = eventEmitter;
        this.dataSource = dataSource;
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
        const saved = await this.certRepo.save(request);
        try {
            const managersAndAdmins = await this.dataSource.query("SELECT id FROM users WHERE role IN ('admin', 'manager')");
            this.eventEmitter.emit('certificate.created', {
                adminIds: managersAndAdmins.map((u) => u.id),
                employeeName: `${employee.first_name} ${employee.last_name}`,
                certType: saved.type,
            });
        }
        catch (e) {
            console.error('Failed to dispatch certificate.created event', e);
        }
        return saved;
    }
    async updateStatus(id, status, processedBy, rejectionReason, content) {
        const cert = await this.certRepo.findOne({ where: { id }, relations: ['employee'] });
        if (!cert)
            throw new common_1.NotFoundException('Demande non trouvée');
        cert.status = status;
        if (processedBy)
            cert.processedBy = processedBy;
        if (rejectionReason !== undefined)
            cert.rejectionReason = rejectionReason;
        if (content !== undefined)
            cert.content = content;
        const saved = await this.certRepo.save(cert);
        try {
            if (cert.employee && cert.employee.userId) {
                this.eventEmitter.emit('certificate.updated', {
                    userId: cert.employee.userId,
                    status: saved.status,
                    certType: saved.type,
                });
            }
        }
        catch (e) {
            console.error('Failed to dispatch certificate.updated event', e);
        }
        return saved;
    }
};
exports.CertificatesService = CertificatesService;
exports.CertificatesService = CertificatesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(certificate_request_entity_1.CertificateRequest)),
    __param(1, (0, typeorm_1.InjectRepository)(employee_entity_1.Employee)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        event_emitter_1.EventEmitter2,
        typeorm_2.DataSource])
], CertificatesService);
//# sourceMappingURL=certificates.service.js.map