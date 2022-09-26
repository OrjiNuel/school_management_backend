const PORT = process.env["PORT"];
const DATABASE_URL = process.env["DATABASE_URL"] as string;
const TEST_DATABASE_URL = process.env["TEST_DATABASE_URL"] as string;
const CORS_ORIGIN = process.env["CORS_ORIGIN"] as string;
const PRODUCTION = process.env["NODE_ENV"] === "production";
const STAGING = process.env["NODE_ENV"] === "staging";
const DEVELOPMENT = process.env["NODE_ENV"] === "development";
const TEST = process.env["NODE_ENV"] === "test";

export default {
    PORT,
    DATABASE_URL,
    TEST_DATABASE_URL,
    CORS_ORIGIN,
    PRODUCTION,
    STAGING,
    DEVELOPMENT,
    TEST,
};