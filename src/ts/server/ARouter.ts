import { Express } from "express";
import { IMiddleware, IRouter, IServices } from "./_interfaces";

export abstract class ARouter implements IRouter {
	constructor(protected readonly express: Express, protected readonly middleware: IMiddleware, protected readonly services: IServices) {}

	public abstract init(): void;
}
