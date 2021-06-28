import { IRouter } from "./_interfaces";
import { ARouter } from "./ARouter";

import { defineStaticRoutes, ApiRouter, AuthRouter } from "./routes";

export class RouterComposer extends ARouter {
	private _apiRouter: IRouter;
	private _authRouter: IRouter;

	public init(): void {
		this._defineStaticRoutes();
		this._initApiRouter();
		this._initAuthRouter();
	}

	private _defineStaticRoutes(): void {
		defineStaticRoutes(this.express);
	}

	private _initApiRouter(): void {
		this._apiRouter = new ApiRouter(this.express, this.middleware, this.services);
		this._apiRouter.init();
	}

	private _initAuthRouter(): void {
		this._authRouter = new AuthRouter(this.express, this.middleware, this.services);
		this._authRouter.init();
	}
}
