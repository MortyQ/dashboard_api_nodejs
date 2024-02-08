import { Logger } from 'tslog';

export interface ILogger {
	logger: Logger;
	log(...arg: unknown[]): void;
	error(...arg: unknown[]): void;
	warn(...arg: unknown[]): void;
}
