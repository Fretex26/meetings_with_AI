import { existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { DataSource, DataSourceOptions } from "typeorm";

const envFile = resolve(__dirname, '../../../../.env');
if (existsSync(envFile)) {
  process.loadEnvFile(envFile);
}

const ext = __filename.endsWith('.ts') ? 'ts' : 'js';

export const dataSourceOptions: DataSourceOptions = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [join(__dirname, '..', '**', `*.entity.${ext}`)],
    synchronize: false,
    migrationsRun: false,
    migrations: [join(__dirname, "migrations", `*.${ext}`)],
    logging: process.env.NODE_ENV !== "production",
}

export default new DataSource(dataSourceOptions)