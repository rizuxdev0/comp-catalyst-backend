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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const user_role_entity_1 = require("./entities/user-role.entity");
const permission_entity_1 = require("./entities/permission.entity");
const user_extra_permission_entity_1 = require("./entities/user-extra-permission.entity");
const role_permission_entity_1 = require("./entities/role-permission.entity");
const employee_entity_1 = require("../employees/entities/employee.entity");
const user_entity_2 = require("./entities/user.entity");
const bcrypt = require("bcryptjs");
const audit_service_1 = require("../audit/audit.service");
let UsersService = class UsersService {
    constructor(usersRepository, rolesRepository, permissionsRepository, extraPermissionsRepository, rolePermissionsRepository, employeeRepository, configService, auditService) {
        this.usersRepository = usersRepository;
        this.rolesRepository = rolesRepository;
        this.permissionsRepository = permissionsRepository;
        this.extraPermissionsRepository = extraPermissionsRepository;
        this.rolePermissionsRepository = rolePermissionsRepository;
        this.employeeRepository = employeeRepository;
        this.configService = configService;
        this.auditService = auditService;
    }
    async onModuleInit() {
        await this.seedPermissions();
        await this.seedRolePermissions();
        await this.seedAdmin();
        await this.seedTestAccount();
    }
    async seedTestAccount() {
        const email = 'kokou.test@catalyst.tg';
        const exists = await this.findByEmail(email);
        if (!exists) {
            console.log('Seeding test employee account...');
            const hashedPassword = await bcrypt.hash('Testhard123!', 10);
            const user = this.usersRepository.create({
                email,
                passwordHash: hashedPassword,
                firstName: 'Kokou',
                lastName: 'AZIAMBLE',
                isActive: true,
                emailVerified: true,
            });
            const savedUser = await this.usersRepository.save(user);
            const role = this.rolesRepository.create({
                userId: savedUser.id,
                role: user_role_entity_1.AppRole.EMPLOYEE,
            });
            await this.rolesRepository.save(role);
            const employee = this.employeeRepository.create({
                userId: savedUser.id,
                first_name: 'Kokou',
                last_name: 'AZIAMBLE',
                job_title: 'Comptable Senior',
                base_salary: 450000,
                salary_currency: 'XOF',
                employment_start_date: '2022-01-01',
                employee_code: 'EMP2022001',
                work_email: email,
            });
            await this.employeeRepository.save(employee);
            console.log('Test Account created: kokou.test@catalyst.tg / Testhard123!');
        }
    }
    async seedRolePermissions() {
        console.log('Synchronizing default role permissions...');
        const all = await this.findAllPermissions();
        const adminPerms = all.map(p => ({ role: 'admin', permissionCode: p.code }));
        const managerPerms = all.filter(p => !p.code.includes('.delete') &&
            !p.code.includes('settings.') &&
            !p.code.includes('permissions.')).map(p => ({ role: 'manager', permissionCode: p.code }));
        const employeePerms = all.filter(p => p.module === 'portal' ||
            p.code === 'announcements.view' ||
            p.code === 'search.use' ||
            p.code === 'dashboard.view').map(p => ({ role: 'employee', permissionCode: p.code }));
        const allToSync = [...adminPerms, ...managerPerms, ...employeePerms];
        for (const rp of allToSync) {
            const exists = await this.rolePermissionsRepository.findOneBy({ role: rp.role, permissionCode: rp.permissionCode });
            if (!exists) {
                await this.rolePermissionsRepository.save(this.rolePermissionsRepository.create(rp));
            }
        }
        console.log('Role Permissions Matrix Synchronized.');
    }
    async seedPermissions() {
        const permissions = [
            { code: 'dashboard.view', name: 'Voir le tableau de bord RH', module: 'dashboard' },
            { code: 'employees.view', name: 'Voir les employés', module: 'employees' },
            { code: 'employees.create', name: 'Créer un employé', module: 'employees' },
            { code: 'employees.edit', name: 'Modifier un employé', module: 'employees' },
            { code: 'employees.delete', name: 'Supprimer un employé', module: 'employees' },
            { code: 'contracts.view', name: 'Voir les contrats', module: 'contracts' },
            { code: 'contracts.create', name: 'Créer un contrat', module: 'contracts' },
            { code: 'contracts.edit', name: 'Modifier un contrat', module: 'contracts' },
            { code: 'contracts.delete', name: 'Supprimer un contrat', module: 'contracts' },
            { code: 'leaves.view', name: 'Voir les congés', module: 'leaves' },
            { code: 'leaves.create', name: 'Demander un congé', module: 'leaves' },
            { code: 'leaves.approve', name: 'Approuver les congés', module: 'leaves' },
            { code: 'leaves.manage', name: 'Gérer les types et paramètres de congés', module: 'leaves' },
            { code: 'payroll.view', name: 'Voir la paie', module: 'payroll' },
            { code: 'payroll.create', name: 'Générer les bulletins', module: 'payroll' },
            { code: 'payroll.edit', name: 'Modifier la paie', module: 'payroll' },
            { code: 'payroll.approve', name: 'Approuver la paie', module: 'payroll' },
            { code: 'payments.view', name: 'Voir les paiements', module: 'payments' },
            { code: 'payments.create', name: 'Effectuer des paiements', module: 'payments' },
            { code: 'payments.approve', name: 'Approuver paiements', module: 'payments' },
            { code: 'reports.view', name: 'Voir les rapports', module: 'reports' },
            { code: 'reports.export', name: 'Exporter les rapports', module: 'reports' },
            { code: 'training.view', name: 'Voir les formations', module: 'training' },
            { code: 'training.manage', name: 'Gérer les formations', module: 'training' },
            { code: 'recruitment.view', name: 'Voir le recrutement', module: 'recruitment' },
            { code: 'recruitment.manage', name: 'Gérer le recrutement', module: 'recruitment' },
            { code: 'settings.view', name: 'Voir les paramètres', module: 'settings' },
            { code: 'settings.edit', name: 'Modifier les paramètres', module: 'settings' },
            { code: 'users.view', name: 'Voir les utilisateurs', module: 'users' },
            { code: 'users.manage', name: 'Gérer les utilisateurs', module: 'users' },
            { code: 'permissions.view', name: 'Voir les permissions', module: 'permissions' },
            { code: 'permissions.manage', name: 'Gérer les permissions', module: 'permissions' },
            { code: 'portal.access', name: 'Accès portail employé', module: 'portal' },
            { code: 'portal.payslips', name: 'Voir ses bulletins', module: 'portal' },
            { code: 'portal.leaves', name: 'Gérer ses congés', module: 'portal' },
            { code: 'departments.view', name: 'Voir les départements', module: 'departments' },
            { code: 'departments.manage', name: 'Gérer les départements', module: 'departments' },
            { code: 'audit.view', name: 'Voir les logs d\'audit', module: 'audit' },
            { code: 'fleet.view', name: 'Voir flotte véhicules', module: 'fleet' },
            { code: 'fleet.manage', name: 'Gérer flotte véhicules', module: 'fleet' },
            { code: 'documents.view', name: 'Voir documents RH', module: 'documents' },
            { code: 'documents.manage', name: 'Gérer documents RH', module: 'documents' },
            { code: 'communications.view', name: 'Voir communications', module: 'communications' },
            { code: 'communications.manage', name: 'Gérer communications', module: 'communications' },
            { code: 'onboarding.view', name: 'Voir onboarding', module: 'onboarding' },
            { code: 'onboarding.manage', name: 'Gérer onboarding', module: 'onboarding' },
            { code: 'benefits.view', name: 'Voir avantages sociaux', module: 'benefits' },
            { code: 'benefits.manage', name: 'Gérer avantages sociaux', module: 'benefits' },
            { code: 'medical.view', name: 'Voir assistances médicales', module: 'medical' },
            { code: 'medical.manage', name: 'Gérer assistances médicales', module: 'medical' },
            { code: 'disciplinary.view', name: 'Voir sanctions', module: 'disciplinary' },
            { code: 'disciplinary.manage', name: 'Gérer sanctions', module: 'disciplinary' },
            { code: 'accidents.view', name: 'Voir accidents de travail', module: 'accidents' },
            { code: 'accidents.manage', name: 'Gérer accidents de travail', module: 'accidents' },
            { code: 'surveys.view', name: 'Voir enquêtes', module: 'surveys' },
            { code: 'surveys.manage', name: 'Gérer enquêtes', module: 'surveys' },
            { code: 'delegates.view', name: 'Voir délégués du personnel', module: 'delegates' },
            { code: 'delegates.manage', name: 'Gérer délégués du personnel', module: 'delegates' },
            { code: 'departures.view', name: 'Voir départs', module: 'departures' },
            { code: 'departures.manage', name: 'Gérer départs', module: 'departures' },
            { code: 'aid.view', name: 'Voir aides employés', module: 'aid' },
            { code: 'aid.manage', name: 'Gérer aides employés', module: 'aid' },
            { code: 'career.view', name: 'Voir carrières', module: 'career' },
            { code: 'career.manage', name: 'Gérer carrières', module: 'career' },
            { code: 'expenses.view', name: 'Voir notes de frais', module: 'expenses' },
            { code: 'expenses.manage', name: 'Gérer notes de frais', module: 'expenses' },
            { code: 'hr_support.view', name: 'Voir support RH', module: 'hr_support' },
            { code: 'hr_support.manage', name: 'Gérer support RH', module: 'hr_support' },
            { code: 'search.use', name: 'Utiliser la recherche globale', module: 'search' },
            { code: 'announcements.view', name: 'Voir les annonces', module: 'announcements' },
            { code: 'announcements.manage', name: 'Gérer les annonces', module: 'announcements' },
        ];
        for (const p of permissions) {
            const exists = await this.permissionsRepository.findOneBy({ code: p.code });
            if (!exists) {
                await this.permissionsRepository.save(this.permissionsRepository.create(p));
            }
        }
        console.log(`${permissions.length} Permissions Matrix Synchronized.`);
    }
    async seedAdmin() {
        const adminEmail = 'rizuxdev@gmail.com';
        const existing = await this.findByEmail(adminEmail);
        if (!existing) {
            console.log('Seeding superadmin...');
            const hashedPassword = await bcrypt.hash('Eric007!', 10);
            const user = this.usersRepository.create({
                email: adminEmail,
                passwordHash: hashedPassword,
                firstName: 'Eric',
                lastName: 'Admin',
                isActive: true,
                emailVerified: true,
            });
            const savedUser = await this.usersRepository.save(user);
            const role = this.rolesRepository.create({
                userId: savedUser.id,
                role: user_role_entity_1.AppRole.ADMIN,
            });
            await this.rolesRepository.save(role);
            console.log('Superadmin created: rizuxdev@gmail.com / Eric007!');
        }
        else {
            const roles = await this.rolesRepository.findBy({ userId: existing.id });
            if (!roles.some(r => r.role === user_role_entity_1.AppRole.ADMIN)) {
                await this.rolesRepository.save(this.rolesRepository.create({
                    userId: existing.id,
                    role: user_role_entity_1.AppRole.ADMIN,
                }));
                console.log('Granted ADMIN role to existing user: rizuxdev@gmail.com');
            }
        }
    }
    async create(userData) {
        const existingUser = await this.findByEmail(userData.email);
        if (existingUser) {
            throw new common_1.ConflictException('User with this email already exists');
        }
        const user = this.usersRepository.create(userData);
        const saved = await this.usersRepository.save(user);
        await this.auditService.log({
            action: 'create',
            entityType: 'user',
            entityId: saved.id,
            entityName: saved.email,
            newValues: userData,
        });
        return saved;
    }
    async findAll() {
        return this.usersRepository.find({
            relations: ['roles'],
        });
    }
    async findByEmail(email) {
        return this.usersRepository.findOne({
            where: { email },
            relations: ['roles']
        });
    }
    async findOneWithPassword(email) {
        return this.usersRepository.findOne({
            where: { email },
            select: ['id', 'email', 'passwordHash', 'isActive', 'passwordStatus'],
            relations: ['roles'],
        });
    }
    async findAllPermissions() {
        return this.permissionsRepository.find({ order: { module: 'ASC', name: 'ASC' } });
    }
    async getRolePermissionsMapping() {
        const allRolePerms = await this.rolePermissionsRepository.find();
        const mapping = {
            admin: [],
            manager: [],
            employee: []
        };
        allRolePerms.forEach(rp => {
            if (!mapping[rp.role])
                mapping[rp.role] = [];
            mapping[rp.role].push(rp.permissionCode);
        });
        return mapping;
    }
    async updateRolePermission(role, permissionId, granted) {
        const permission = await this.permissionsRepository.findOne({ where: { id: permissionId } });
        if (!permission)
            throw new common_1.NotFoundException('Permission not found');
        if (granted) {
            const exists = await this.rolePermissionsRepository.findOne({ where: { role, permissionCode: permission.code } });
            if (!exists) {
                await this.rolePermissionsRepository.save({ role, permissionCode: permission.code });
                await this.auditService.log({
                    action: 'grant_permission',
                    entityType: 'role_permission',
                    entityId: role,
                    entityName: `${role}:${permission.code}`,
                });
            }
        }
        else {
            await this.rolePermissionsRepository.delete({ role, permissionCode: permission.code });
            await this.auditService.log({
                action: 'revoke_permission',
                entityType: 'role_permission',
                entityId: role,
                entityName: `${role}:${permission.code}`,
            });
        }
    }
    async exportRolePermissions() {
        return this.getRolePermissionsMapping();
    }
    async importRolePermissions(mapping) {
        await this.rolePermissionsRepository.delete({});
        const newRolePerms = [];
        for (const [role, permissionCodes] of Object.entries(mapping)) {
            permissionCodes.forEach(code => {
                newRolePerms.push({ role, permissionCode: code });
            });
        }
        if (newRolePerms.length > 0) {
            await this.rolePermissionsRepository.save(newRolePerms);
        }
        await this.auditService.log({
            action: 'import_permissions',
            entityType: 'permissions',
            entityName: 'Bulk Import',
            newValues: mapping,
        });
    }
    async getUserExtraPermissions(userId) {
        return this.extraPermissionsRepository.find({
            where: { userId },
            relations: ['permission'],
        });
    }
    async grantUserExtraPermission(userId, permissionId, expiresAt) {
        const user = await this.findOne(userId);
        const permission = await this.permissionsRepository.findOne({ where: { id: permissionId } });
        if (!permission)
            throw new common_1.NotFoundException('Permission not found');
        const extra = this.extraPermissionsRepository.create({ userId, permissionId, expiresAt });
        const saved = await this.extraPermissionsRepository.save(extra);
        await this.auditService.log({
            action: 'grant_extra_permission',
            entityType: 'user_extra_permission',
            entityId: userId,
            entityName: permission.code,
            newValues: { expiresAt },
        });
        return saved;
    }
    async revokeUserExtraPermission(userId, permissionId) {
        await this.extraPermissionsRepository.delete({ userId, permissionId });
        await this.auditService.log({
            action: 'revoke_extra_permission',
            entityType: 'user_extra_permission',
            entityId: userId,
        });
    }
    async findOne(id) {
        const user = await this.usersRepository.findOne({
            where: { id },
            relations: ['roles']
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async getEffectivePermissions(userId) {
        const user = await this.usersRepository.findOne({
            where: { id: userId },
            relations: ['roles'],
        });
        if (!user)
            return [];
        const roleCodes = user.roles.map(r => r.role);
        const mappings = await this.getRolePermissionsMapping();
        const permissions = new Set();
        roleCodes.forEach(rc => {
            const perms = mappings[rc] || [];
            perms.forEach((p) => permissions.add(p));
        });
        const extraPermissions = await this.extraPermissionsRepository.find({
            where: { userId },
            relations: ['permission'],
        });
        const now = new Date();
        extraPermissions.forEach(ep => {
            if (!ep.expiresAt || ep.expiresAt > now) {
                permissions.add(ep.permission.code);
            }
        });
        return Array.from(permissions);
    }
    async update(id, updateData) {
        await this.usersRepository.update(id, updateData);
        const updated = await this.findOne(id);
        await this.auditService.log({
            action: 'update_profile',
            entityType: 'user',
            entityId: id,
            entityName: updated.email,
            newValues: updateData,
        });
        return updated;
    }
    async changePassword(userId, newPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await this.usersRepository.update(userId, {
            passwordHash: hashedPassword,
            passwordStatus: user_entity_2.PasswordStatus.ACTIVE
        });
        await this.auditService.log({
            action: 'change_password',
            entityType: 'user',
            entityId: userId,
            entityName: 'Self-Service',
        });
        return { message: 'Password updated successfully' };
    }
    async updateRole(userId, roleCode) {
        const user = await this.findOne(userId);
        await this.rolesRepository.delete({ userId });
        const role = this.rolesRepository.create({
            userId,
            role: roleCode,
        });
        const saved = await this.rolesRepository.save(role);
        await this.auditService.log({
            action: 'update_role',
            entityType: 'user_role',
            entityId: userId,
            entityName: roleCode,
        });
        return saved;
    }
    async remove(id) {
        const user = await this.findOne(id);
        await this.usersRepository.remove(user);
        await this.auditService.log({
            action: 'delete',
            entityType: 'user',
            entityId: id,
            entityName: user.email,
        });
    }
    async updateResetToken(userId, token, expires) {
        await this.usersRepository.update(userId, {
            resetPasswordToken: token,
            resetPasswordExpiresAt: expires,
        });
    }
    async findByResetToken(token) {
        return this.usersRepository.findOne({
            where: { resetPasswordToken: token },
            select: ['id', 'email', 'resetPasswordToken', 'resetPasswordExpiresAt'],
        });
    }
    async updatePasswordAndClearResetToken(userId, passwordHash) {
        await this.usersRepository.update(userId, {
            passwordHash,
            resetPasswordToken: null,
            resetPasswordExpiresAt: null,
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(user_role_entity_1.UserRole)),
    __param(2, (0, typeorm_1.InjectRepository)(permission_entity_1.Permission)),
    __param(3, (0, typeorm_1.InjectRepository)(user_extra_permission_entity_1.UserExtraPermission)),
    __param(4, (0, typeorm_1.InjectRepository)(role_permission_entity_1.RolePermission)),
    __param(5, (0, typeorm_1.InjectRepository)(employee_entity_1.Employee)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        config_1.ConfigService,
        audit_service_1.AuditService])
], UsersService);
//# sourceMappingURL=users.service.js.map