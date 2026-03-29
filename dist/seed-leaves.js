"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./src/app.module");
const typeorm_1 = require("@nestjs/typeorm");
const leave_type_entity_1 = require("./src/leaves/entities/leave-type.entity");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const typeRepo = app.get((0, typeorm_1.getRepositoryToken)(leave_type_entity_1.LeaveType));
    const defaultTypes = [
        { code: 'PAID', name: 'Congés Payés', defaultDays: 25, isPaid: true, isActive: true },
        { code: 'SICK', name: 'Maladie', defaultDays: 0, isPaid: true, requiresJustification: true, isActive: true },
        { code: 'MATERNITY', name: 'Maternité', defaultDays: 90, isPaid: true, requiresJustification: true, isActive: true },
        { code: 'PATERNITY', name: 'Paternité', defaultDays: 10, isPaid: true, requiresJustification: true, isActive: true },
        { code: 'UNPAID', name: 'Sans Solde', defaultDays: 0, isPaid: false, isActive: true },
    ];
    console.log('🌱 Seeding leave types...');
    for (const type of defaultTypes) {
        const exists = await typeRepo.findOne({ where: { code: type.code } });
        if (!exists) {
            console.log(`Creating leave type: ${type.name}`);
            await typeRepo.save(typeRepo.create(type));
        }
        else {
            console.log(`Leave type ${type.code} already exists.`);
        }
    }
    console.log('✅ Seeding completed.');
    await app.close();
}
bootstrap().catch(err => {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
});
//# sourceMappingURL=seed-leaves.js.map