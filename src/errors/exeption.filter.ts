import { NextFunction, Request, Response } from 'express';
import { IExeptionFilter } from './exeption.filter.interface';
import { HTTPError } from './http-error.class';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import 'reflect-metadata';

@injectable()
export class ExeptionFilter implements IExeptionFilter {
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		this.logger = logger;
	}

	catch(error: Error | HTTPError, req: Request, res: Response, next: NextFunction): void {
		if (error instanceof HTTPError) {
			this.logger.error(`[${error.context}] - ${error.statusCode} : ${error.message}`);
			res.status(error.statusCode).send({ err: error.message });
		} else {
			this.logger.error(error.message);
			res.status(500).send({ err: 'Internal Server Error' });
		}
	}
}
