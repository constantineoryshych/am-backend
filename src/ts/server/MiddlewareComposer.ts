import { Express, RequestHandler } from "express";

import { MIDDLEWARE, IMiddleware } from "./_interfaces";
import * as Handlers from "./middleware";

export class MiddlewareComposer implements IMiddleware {
	constructor(private readonly _express: Express) {
		this._init();
	}

	getHandler(name: MIDDLEWARE): RequestHandler {
		return Handlers[name];
	}

	private _init(): void {
		this._useGlobalMiddleware();
	}

	private _useGlobalMiddleware(): void {
		this._express.use(Handlers.cors);
		this._express.options("/*", Handlers.corb);
	}
}
