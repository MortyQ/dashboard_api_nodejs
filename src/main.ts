import { App } from "./app";
import { LoggerService } from "./logger/logger.service";
import { UserController } from "./users/users.controller";
import { ExeptionFilter } from "./errors/exeption.filter";

async function bootstrap() {
  const logger = new LoggerService();
  const app = await new App(
    logger,
    new UserController(logger),
    new ExeptionFilter(logger)
  );
  app.init();
}

bootstrap();
