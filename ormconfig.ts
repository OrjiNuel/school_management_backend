module.exports = {
  type: "postgres",
  url: process.env["DATABASE_URL"],
  entities: ["dist/src/entities/*.js"],
  migrations: ["dist/src/migrations/*.js"],
  factories: ["dist/src/factories/*.js"],
  seeds: ["dist/src/seeders/*.js"],
  synchronize: false,
  logging: process.env["NODE_ENV"] === "development",
  extra: {
    ssl: false,
  },
  cli: {
    migrationsDir: "src/migrations",
  },
};
