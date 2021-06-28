import { Launcher } from "./infrastructure";
import DB from "./storage";

import { Services } from "./services";
import { Server } from "./server";

class Main {
	private _launcher: Launcher = new Launcher();
	private _services: Services;
	private _server: Server;

	public async init() {
		await this._launcher.init();

		const { infrastructure } = this._launcher.getInfrastructure();

		this._services = new Services({ infrastructure });

		await DB.connect(infrastructure.Config.db);
		await this._applyConstants();

		this._server = new Server({ port: 9010, services: this._services });


		return new Promise((resolve: () => void): void => {
			this._server.start().then(resolve);
			this._server.onError(this._exceptionHandler);
		});
	}
	private async _applyConstants() {
		const constantsService = this._services.getConstantsService();
		const { constants } = await constantsService.getAll() as any;
		this._launcher.setConstants(constants);
	}

	public async shutdown(reason?: string): Promise<void> {
		console.log(`Shutdowning with reason: ${reason}`);
	}

	private _exceptionHandler = (err: Error): void => {
		main.shutdown(err.message);
	};
}

const main = new Main();
main.init().then((): void => {
	console.log("Successful launch");
});
