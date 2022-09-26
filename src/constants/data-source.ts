import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import general from "./general";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: general.TEST ? general.TEST_DATABASE_URL : general.DATABASE_URL,
  entities: general.TEST ? ["src/entities/*ts"] : ["dist/src/entities/*.js"],
  migrations: general.TEST
    ? ["src/migrations/*.ts"]
    : ["dist/src/migrations/*.js"],
  ssl: false,
  synchronize: false,
  logging: general.DEVELOPMENT ?? general.STAGING,
  migrationsTableName: "custom_migrations",
  cache: { duration: 10000, type: "database" },
});