import { App } from "./app";
import { LoggerService } from "./logger/logger.service";

async function bootstrap() {
  const app = await new App(new LoggerService());
  app.init();
}

bootstrap();
