import { Router, Request, Response } from "express";
import { HTTP_STATUS, IUploadService } from "./../../_interfaces";

export class UploadRouter {
	private _BASE_PATH: string = `/upload`;
	public readonly router: Router = Router();

	constructor(private readonly _service: IUploadService) {
		this._initHandlers();
	}

	private _initHandlers(): void {
		this.router.post(this._BASE_PATH, this._upload);
	}

	private _upload = (req: Request, res: Response): void => {
		this._service.upload(req, this._serviceUploadHandler.bind(this, res));
	};

	private _serviceUploadHandler = (res: Response, err: null | Error): void => {
		if (err) {
			return this._exceptionAnswer(res, err);
		}

		this._successAnswer(res);
	};

	private _successAnswer(res: Response): void {
		res.statusCode = HTTP_STATUS.CREATED;
		res.end(`{ "result": "ok" }`);
	}

	private _exceptionAnswer(res: Response, err: Error): void {
		res.statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR;
		res.end(`{ "exception": ${err.message} }`);
	}
}
