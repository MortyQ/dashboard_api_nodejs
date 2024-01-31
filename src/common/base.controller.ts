import { Response, Router } from "express";
import { LoggerService } from "../logger/logger.service";
import { IControllerRoute } from "./route.interface";

export { Router } from "express";

export abstract class BaseController {
  private readonly _router: Router;

  constructor(private logger: LoggerService) {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  public send<T>(res: Response, code: number, msg: T) {
    res.type("application/json");
    return res.status(code).json(msg);
  }

  public ok<T>(res: Response, msg: T) {
    return this.send<T>(res, 200, msg);
  }

  public created(res: Response) {
    return res.sendStatus(201);
  }

  protected bindRoutes(routes: IControllerRoute[]) {
    for (const route of routes) {
      this.logger.log(
        `Binding route ${route.method.toUpperCase()} ${route.path}`
      );
      const handler = route.func.bind(this);
      this.router[route.method](route.path, handler);
    }
  }
}