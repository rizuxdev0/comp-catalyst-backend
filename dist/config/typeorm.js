"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
const path_1 = require("path");
(0, dotenv_1.config)();
const dataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [(0, path_1.join)(__dirname, '/../**/*.entity{.ts,.js}')],
    migrations: [(0, path_1.join)(__dirname, '/../database/migrations/*{.ts,.js}')],
    synchronize: false,
});
exports.default = dataSource;
//# sourceMappingURL=typeorm.js.map