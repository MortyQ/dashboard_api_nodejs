import { Response, Router } from 'express';
import { LoggerService } from '../logger/logger.service';
import { ExpressReturnType, IControllerRoute } from './route.interface';
import { ILogger } from '../logger/logger.interface';
import { injectable } from 'inversify';
import 'reflect-metadata';

export { Router } from 'express';

@injectable()
export abstract class BaseController {
	private readonly _router: Router;

	constructor(private logger: ILogger) {
		this._router = Router();
	}

	get router(): Router {
		return this._router;
	}

	public send<T>(res: Response, code: number, msg: T): ExpressReturnType {
		res.type('application/json');
		return res.status(code).json(msg);
	}

	public ok<T>(res: Response, msg: T): ExpressReturnType {
		return this.send<T>(res, 200, msg);
	}

	public created(res: Response): ExpressReturnType {
		return res.sendStatus(201);
	}

	protected bindRoutes(routes: IControllerRoute[]): void {
		for (const route of routes) {
			this.logger.log(`Binding route ${route.method.toUpperCase()} ${route.path}`);
			const handler = route.func.bind(this);
			this.router[route.method](route.path, handler);
		}
	}
}
