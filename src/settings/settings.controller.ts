import { Controller, Get, Patch, Post, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { SettingsService } from './settings.service';
import { CompanySettings } from './entities/company-settings.entity';
import { ContractTypeSetting } from './entities/contract-type-setting.entity';
import { CollectiveAgreement } from './entities/collective-agreement.entity';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { AppRole } from '../users/entities/user-role.entity';

@ApiTags('settings')
@ApiBearerAuth()
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get()
  @ApiOperation({ summary: 'Get current company settings' })
  @ApiResponse({ status: 200, type: CompanySettings })
  async getSettings() {
    return this.settingsService.getSettings();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(AppRole.ADMIN)
  @Patch()
  @ApiOperation({ summary: 'Update company settings' })
  @ApiResponse({ status: 200, type: CompanySettings })
  async updateSettings(@Body() updateData: Partial<CompanySettings>, @Request() req: any) {
    return this.settingsService.updateSettings(updateData, req.user);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(AppRole.ADMIN)
  @Post('initialize')
  @ApiOperation({ summary: 'Initialize project with wizard data' })
  @ApiResponse({ status: 200, type: CompanySettings })
  async initialize(@Body() data: any) {
    return this.settingsService.initialize(data);
  }

  // ======= PASSWORD POLICY =======
  @Get('password-policy')
  @ApiOperation({ summary: 'Get password policy' })
  async getPasswordPolicy() {
    return this.settingsService.getPasswordPolicy();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(AppRole.ADMIN)
  @Patch('password-policy/:id')
  @ApiOperation({ summary: 'Update password policy' })
  async updatePasswordPolicy(@Param('id') id: string, @Body() data: any, @Request() req: any) {
    return this.settingsService.updatePasswordPolicy(id, data, req.user);
  }

  // ======= SMTP SETTINGS =======
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(AppRole.ADMIN)
  @Get('smtp')
  @ApiOperation({ summary: 'Get SMTP settings' })
  async getSmtpSettings() {
    return this.settingsService.getSmtpSettings();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(AppRole.ADMIN)
  @Patch('smtp')
  @ApiOperation({ summary: 'Update SMTP settings' })
  async updateSmtpSettings(@Body() data: any, @Request() req: any) {
    return this.settingsService.updateSmtpSettings(data, req.user);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(AppRole.ADMIN)
  @Post('smtp/test')
  @ApiOperation({ summary: 'Test SMTP connection' })
  async testSmtp(@Body() data: any) {
    return this.settingsService.testSmtp(data);
  }

  // ======= CONTRACT TYPES =======
  @Get('contract-types')
  @ApiOperation({ summary: 'List contract types' })
  async listContractTypes() {
    return this.settingsService.listContractTypes();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(AppRole.ADMIN)
  @Post('contract-types')
  @ApiOperation({ summary: 'Create contract type' })
  async createContractType(@Body() data: Partial<ContractTypeSetting>) {
    return this.settingsService.createContractType(data);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(AppRole.ADMIN)
  @Patch('contract-types/:id')
  @ApiOperation({ summary: 'Update contract type' })
  async updateContractType(@Param('id') id: string, @Body() data: Partial<ContractTypeSetting>, @Request() req: any) {
    return this.settingsService.updateContractType(id, data, req.user);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(AppRole.ADMIN)
  @Delete('contract-types/:id')
  @ApiOperation({ summary: 'Delete contract type' })
  async deleteContractType(@Param('id') id: string) {
    return this.settingsService.deleteContractType(id);
  }

  // ======= COLLECTIVE AGREEMENTS =======
  @Get('collective-agreements')
  @ApiOperation({ summary: 'List collective agreements' })
  @ApiResponse({ status: 200, type: [CollectiveAgreement] })
  async listCollectiveAgreements() {
    return this.settingsService.listCollectiveAgreements();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(AppRole.ADMIN)
  @Post('collective-agreements')
  @ApiOperation({ summary: 'Create/Update collective agreement' })
  async saveCollectiveAgreement(@Body() data: Partial<CollectiveAgreement>, @Request() req: any) {
    return this.settingsService.saveCollectiveAgreement(data, req.user);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(AppRole.ADMIN)
  @Delete('collective-agreements/:id')
  @ApiOperation({ summary: 'Delete collective agreement' })
  async deleteCollectiveAgreement(@Param('id') id: string, @Request() req: any) {
    return this.settingsService.deleteCollectiveAgreement(id, req.user);
  }
}
