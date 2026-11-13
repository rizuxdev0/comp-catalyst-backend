import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddMissingTables1711060000000 implements MigrationInterface {
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
