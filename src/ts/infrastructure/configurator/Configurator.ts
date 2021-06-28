import { config, DotenvParseOutput } from "dotenv";
import { address } from "ip";

import _DEFAULT_CONFIG from "./_config.default";

export class Configurator {
	private _env: DotenvParseOutput;

	// FIXME: type declaration
	private _configuration: any = _DEFAULT_CONFIG;

	public get Config(): any {
		return this._configuration;
	}

	public async init(): Promise<void> {
		this._getEnvConfiguration();
		this._applyEnvConfiguration();
	}

	private _getEnvConfiguration(): void | never {
		const env: DotenvParseOutput | undefined = config().parsed;
		if (!env) throw new Error("Configuration file '.env' is missing");
		this._env = env;
	}

	private _applyEnvConfiguration(): void {
		const envConfiguration = this._collectEnvConfiguration();
		this._configuration = Object.assign({}, this._configuration, envConfiguration);
	}

	// FIXME: type declaration
	private _collectEnvConfiguration(): any {
		const env = this._getEnvMode();
		const [host, port] = this._getHostAndPort();
		const thumb = this._getThumbnailParamaters();
		const original = this._getOriginalMediaFilesParameters();

		return {
			env,
			host,
			port,
			thumb,
			original
		};
	}

	private _getEnvMode(): string {
		return this._env.NODE_ENV;
	}

	private _getHostAndPort(): [string, number] {
		return [this._env.HOST || address(), Number(this._env.PORT) || 9009];
	}

	// FIXME: type declaration
	private _getThumbnailParamaters(): any {
		return {
			path: process.cwd() + this._env.THUMBNAIL_FOLDER,
			resolution: {
				width: 100,
				height: 100
			},
			quality: 20
		};
	}

	// FIXME: type declaration
	private _getOriginalMediaFilesParameters(): any {
		const { PADS_LOCAL, CONTENT_FOLDER } = this._env;
		return {
			path: PADS_LOCAL + CONTENT_FOLDER,
			inner: CONTENT_FOLDER
		};
	}
}
