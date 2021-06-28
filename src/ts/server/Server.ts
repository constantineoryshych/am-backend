import { Server as HttpServer } from "http";
import { AddressInfo } from "net";
import express, { Express } from "express";

import { IServer, IServerProps, IMiddleware, IRouter } from "./_interfaces";
import { MiddlewareComposer } from "./MiddlewareComposer";
import { RouterComposer } from "./RouterComposer";

const _DEFAULT_PORT = 9009;

export class Server implements IServer {
	private _express: Express;
	private _server: HttpServer;
	private _PORT: number;
	private _middleware: IMiddleware;
	private _router: IRouter;

	constructor({ port, services }: IServerProps) {
		this._express = express();
		this._PORT = port || _DEFAULT_PORT;
		this._middleware = new MiddlewareComposer(this._express);
		this._router = new RouterComposer(this._express, this._middleware, services);
	}

	public start(): Promise<void> {
		return new Promise((resolve: () => void): void => {
			this._server = this._express.listen(this._PORT, "localhost", (): void => {
				resolve();
				this._router.init();
				this._launchConsole();
			});
		});
	}

	public stop(): Promise<void | Error> {
		return new Promise((resolve: () => void, reject: (err: Error) => void): void => {
			this._server.close((err: Error): void => {
				if (err) {
					if (err.message == "Server is not running.") return resolve();
					return reject(err);
				}
				resolve();
			});
		});
	}

	public onError(listener: (err: Error) => void) {
		this._server.on("error", listener);
	}

	private _launchConsole(): void {
		const { address, port } = this._server.address() as AddressInfo;
		console.log(`Server initialization successful on host '${address}' and port '${port}'`);
	}
}
