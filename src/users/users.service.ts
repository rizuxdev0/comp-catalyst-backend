import { Injectable, ConflictException, NotFoundException, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserRole, AppRole } from './entities/user-role.entity';
import { Permission } from './entities/permission.entity';
import { UserExtraPermission } from './entities/user-extra-permission.entity';
import { RolePermission } from './entities/role-permission.entity';
import { Employee } from '../employees/entities/employee.entity';
import { PasswordStatus } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { AuditService } from '../audit/audit.service';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserRole)
    private readonly rolesRepository: Repository<UserRole>,
    @InjectRepository(Permission)
    private readonly permissionsRepository: Repository<Permission>,
    @InjectRepository(UserExtraPermission)
    private readonly extraPermissionsRepository: Repository<UserExtraPermission>,
    @InjectRepository(RolePermission)
    private readonly rolePermissionsRepository: Repository<RolePermission>,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    private readonly configService: ConfigService,
    private readonly auditService: AuditService,
  ) {}

  async onModuleInit() {
    await this.seedPermissions();
    await this.seedRolePermissions();
    await this.seedAdmin();
    await this.seedTestAccount();
  }

  private async seedTestAccount() {
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

      // Create Role
      const role = this.rolesRepository.create({
        userId: savedUser.id,
        role: AppRole.EMPLOYEE,
      });
      await this.rolesRepository.save(role);

      // Create Employee Record
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

  private async seedRolePermissions() {
    console.log('Synchronizing default role permissions...');
    const all = await this.findAllPermissions();
    
    // Admin gets everything
    const adminPerms = all.map(p => ({ role: 'admin', permissionCode: p.code }));
    
    // Manager gets mostly everything except destructive settings and management
    const managerPerms = all.filter(p => 
      !p.code.includes('.delete') && 
      !p.code.includes('settings.') && 
      !p.code.includes('permissions.')
    ).map(p => ({ role: 'manager', permissionCode: p.code }));
    
    // Employee gets portal access and news
    const employeePerms = all.filter(p => 
      p.module === 'portal' || 
      p.code === 'announcements.view' ||
      p.code === 'search.use' ||
      p.code === 'dashboard.view' ||
      p.code === 'leaves.view' ||
      p.code === 'leaves.create'
    ).map(p => ({ role: 'employee', permissionCode: p.code }));

    const allToSync = [...adminPerms, ...managerPerms, ...employeePerms];
    
    for (const rp of allToSync) {
      const exists = await this.rolePermissionsRepository.findOneBy({ role: rp.role, permissionCode: rp.permissionCode });
      if (!exists) {
        await this.rolePermissionsRepository.save(this.rolePermissionsRepository.create(rp));
      }
    }
    
    console.log('Role Permissions Matrix Synchronized.');
  }

  private async seedPermissions() {
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

  private async seedAdmin() {
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
        role: AppRole.ADMIN,
      });

      await this.rolesRepository.save(role);
      console.log('Superadmin created: rizuxdev@gmail.com / Eric007!');
    } else {
      // Ensure existing admin user has the role
      const roles = await this.rolesRepository.findBy({ userId: existing.id });
      if (!roles.some(r => r.role === AppRole.ADMIN)) {
        await this.rolesRepository.save(this.rolesRepository.create({
          userId: existing.id,
          role: AppRole.ADMIN,
        }));
        console.log('Granted ADMIN role to existing user: rizuxdev@gmail.com');
      }
    }
  }

  async create(userData: any): Promise<any> {
    const existingUser = await this.findByEmail(userData.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
    
    // Generate a random default password if none is provided
    const generatePassword = () => {
      const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
      return Array.from({length: 10}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    };
    const defaultPassword = userData.password || generatePassword();
    const passwordHash = await bcrypt.hash(defaultPassword, 10);
    
    // Create the user
    const user = this.usersRepository.create({
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      passwordHash: passwordHash,
      isActive: true,
      emailVerified: true,
      passwordStatus: PasswordStatus.MUST_CHANGE,
      mustChangePassword: true,
    });
    
    const saved = await this.usersRepository.save(user);
    
    // Create the role if provided
    if (userData.role) {
      const role = this.rolesRepository.create({
        userId: saved.id,
        role: userData.role as AppRole,
      });
      await this.rolesRepository.save(role);
    }
    
    await this.auditService.log({
      action: 'create',
      entityType: 'user',
      entityId: saved.id,
      entityName: saved.email,
      newValues: { ...userData, passwordHash: undefined },
    });
    
    const finalUser = await this.findOne(saved.id);
    return { ...finalUser, generatedPassword: defaultPassword };
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({
      relations: ['roles'],
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ 
      where: { email },
      relations: ['roles']
    });
  }

  async findOneWithPassword(email: string): Promise<User | null> {
    return this.usersRepository.createQueryBuilder('user')
      .where('user.email = :email', { email })
      .leftJoinAndSelect('user.roles', 'roles')
      .addSelect('user.passwordHash')
      .addSelect('user.passwordStatus') // ensure it's explicitly loaded if missing
      .addSelect('user.mustChangePassword')
      .getOne();
  }

  async findAllPermissions(): Promise<Permission[]> {
    return this.permissionsRepository.find({ order: { module: 'ASC', name: 'ASC' } });
  }

  async getRolePermissionsMapping(): Promise<Record<string, string[]>> {
    const allRolePerms = await this.rolePermissionsRepository.find();
    const mapping: Record<string, string[]> = {
      admin: [],
      manager: [],
      employee: []
    };

    allRolePerms.forEach(rp => {
      if (!mapping[rp.role]) mapping[rp.role] = [];
      mapping[rp.role].push(rp.permissionCode);
    });

    return mapping;
  }

  async updateRolePermission(role: string, permissionId: string, granted: boolean): Promise<void> {
    const permission = await this.permissionsRepository.findOne({ where: { id: permissionId } });
    if (!permission) throw new NotFoundException('Permission not found');

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
    } else {
      await this.rolePermissionsRepository.delete({ role, permissionCode: permission.code });
      await this.auditService.log({
        action: 'revoke_permission',
        entityType: 'role_permission',
        entityId: role,
        entityName: `${role}:${permission.code}`,
      });
    }
  }

  async exportRolePermissions(): Promise<any> {
    return this.getRolePermissionsMapping();
  }

  async importRolePermissions(mapping: Record<string, string[]>): Promise<void> {
    // Clear existing
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

  async getUserExtraPermissions(userId: string): Promise<UserExtraPermission[]> {
    return this.extraPermissionsRepository.find({
      where: { userId },
      relations: ['permission'],
    });
  }

  async grantUserExtraPermission(userId: string, permissionId: string, expiresAt?: Date): Promise<UserExtraPermission> {
    const user = await this.findOne(userId);
    const permission = await this.permissionsRepository.findOne({ where: { id: permissionId } });
    if (!permission) throw new NotFoundException('Permission not found');

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

  async revokeUserExtraPermission(userId: string, permissionId: string): Promise<void> {
    await this.extraPermissionsRepository.delete({ userId, permissionId });
    await this.auditService.log({
      action: 'revoke_extra_permission',
      entityType: 'user_extra_permission',
      entityId: userId,
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ 
      where: { id },
      relations: ['roles']
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getEffectivePermissions(userId: string): Promise<string[]> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['roles'],
    });

    if (!user) return [];

    const roleCodes = user.roles.map(r => r.role);
    
    // Fallback if role_permissions join table logic isn't fully DB-driven in this simple seed
    // Based on the placeholder mapping above
    const mappings = await this.getRolePermissionsMapping();
    const permissions = new Set<string>();

    roleCodes.forEach(rc => {
      const perms = (mappings as any)[rc] || [];
      perms.forEach((p: string) => permissions.add(p));
    });

    // Get extra permissions
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

  async update(id: string, updateData: Partial<User>) {
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

  async changePassword(userId: string, newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.usersRepository.update(userId, { 
      passwordHash: hashedPassword,
      passwordStatus: PasswordStatus.ACTIVE,
      mustChangePassword: false
    });
    await this.auditService.log({
      action: 'change_password',
      entityType: 'user',
      entityId: userId,
      entityName: 'Self-Service',
    });
    return { message: 'Password updated successfully' };
  }

  async updateRole(userId: string, roleCode: AppRole) {
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

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.auditService.clearUserReferences(id);
    await this.usersRepository.remove(user);
    await this.auditService.log({
      action: 'delete',
      entityType: 'user',
      entityId: id,
      entityName: user.email,
    });
  }

  async updateResetToken(userId: string, token: string, expires: Date): Promise<void> {
    await this.usersRepository.update(userId, {
      resetPasswordToken: token,
      resetPasswordExpiresAt: expires,
    });
  }

  async findByResetToken(token: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { resetPasswordToken: token },
      select: ['id', 'email', 'resetPasswordToken', 'resetPasswordExpiresAt'],
    });
  }

  async updatePasswordAndClearResetToken(userId: string, passwordHash: string): Promise<void> {
    await this.usersRepository.update(userId, {
      passwordHash,
      resetPasswordToken: null,
      resetPasswordExpiresAt: null,
    });
  }
}
