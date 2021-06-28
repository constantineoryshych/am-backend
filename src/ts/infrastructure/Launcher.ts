import { Configurator } from "./configurator";
import { Uploader } from "./upload";
import { PdfPresenter } from "./pdf";
import { PlaylistParser } from "./playlist-parser";
import { IServicesProps } from "./../services/_interfaces";

export class Launcher {
	private _configurator: Configurator;

	constructor() {
		this._configurator = new Configurator();
	}

	public async init(): Promise<void | Error> {
		await this._configurator.init();
	}

	public setConstants(constants: any): void {
		const { Config } = this._configurator;
		Config.constants = {};

		for (const constant in constants) {
			const { name, value } = constants[constant];
			Config.constants[name] = value;
		}
	}

	public getInfrastructure(): IServicesProps {
		const { Config } = this._configurator;
		return {
			infrastructure: {
				Uploader: new Uploader(Config),
				Config,
				PdfPresenter,
				PlaylistParser
			}
		};
	}
}
