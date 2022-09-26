import "dotenv/config";
import "reflect-metadata";
import { AppDataSource } from "./constants/data-source";
import general from "./constants/general";
import server from "./server";

async function bootstrap() {
  // Initialise typeorm
  await AppDataSource.initialize();

  server.listen(general.PORT, () => {
    console.log(`Server is running on port ${general.PORT}`);
  });
}

bootstrap().catch((error) => console.error(`Error thrown is ${error}`));