import { Router, Request, Response } from "express";
import { HTTP_STATUS, REST_METHOD } from "./../../_interfaces";
import { paramsDeserializer, bodyParserJson } from "./../../middleware";

export abstract class ARestRouter<Service> {
	protected abstract _BASE_PATH: string = `/campaigns`;
	public readonly router: Router = Router();

	constructor(protected readonly _service: Service) {
		// this._initHandlers();
	}

	protected initHandlers(): void {
		this.router.get(this._BASE_PATH, this._getAll);
		this.router.get(this._BASE_PATH + "/:id", this._getById);
		this.router.post(this._BASE_PATH + "/", bodyParserJson, this._create);
		this.router.put(this._BASE_PATH + "/", this._updateMany);
		this.router.put(this._BASE_PATH + "/:id", bodyParserJson, this._updateById);
		this.router.put(this._BASE_PATH + "/:id/:field", this._appendRelative);
		this.router.delete(this._BASE_PATH + "/", this._removeMany);
		this.router.delete(this._BASE_PATH + "/:id", this._removeById);
		this.router.delete(this._BASE_PATH + "/:id/:field", this._removeRelative);
		this.router.all(this._BASE_PATH + "/*", this._notAcceptableHandler.bind(this));
	}

	protected _getAll = (_req: Request, res: Response): void => {
		const params = this._parseParameters(_req.url);
		this._servicePromiseHandler(this._service[REST_METHOD.GET](params), res);
	};

	protected _getById = (req: Request, res: Response): void => {
		const { id } = req.params;
		this._servicePromiseHandler(this._service[REST_METHOD.GET_BY_ID](id), res);
	};

	protected _create = (req: Request, res: Response): void => {
		this._servicePromiseHandler(this._service[REST_METHOD.CREATE_ONE](req.body), res);
	};

	protected _updateById = (req: Request, res: Response): void => {
		const { id } = req.params;
		console.log(req.body)
		this._servicePromiseHandler(this._service[REST_METHOD.UPDATE_BY_ID](id, req.body), res);
	};

	protected _updateMany = (req: Request, res: Response): void => {
		this._servicePromiseHandler(this._service[REST_METHOD.UPDATE](req.body["campaigns"]), res);
	};

	protected _removeById = (req: Request, res: Response): void => {
		const { id } = req.params;
		this._servicePromiseHandler(this._service[REST_METHOD.DELETE_BY_ID](id), res);
	};

	protected _removeMany = (req: Request, res: Response): void => {
		this._servicePromiseHandler(this._service[REST_METHOD.DELETE](req.body["campaigns"]), res);
	};

	protected _appendRelative = (req: Request, res: Response): void => {
		this._servicePromiseHandler(this._service[REST_METHOD.APPEND_RELATIVE](req.params, req.body[req.params.field]), res);
	};

	protected _removeRelative = (req: Request, res: Response): void => {
		this._servicePromiseHandler(this._service[REST_METHOD.REMOVE_RELATIVE](req.params, req.body[req.params.field]), res);
	};

	protected _servicePromiseHandler(method: Promise<object>, res: Response): void {
		method.then(res.json.bind(res)).catch(this._exceptionAnswer.bind(this, res));
	}

	protected _notAcceptableHandler(_req: Request, res: Response): void {
		res.statusCode = HTTP_STATUS.NOT_ACCEPTABLE;
		res.end(`{ "message": "Check url" }`);
	}

	protected _exceptionAnswer(res: Response, err: Error): void {
		res.statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR;
		res.end(`{ "exception": ${err.message} }`);
	}

	protected _parseParameters(url: string): any {
		const paramsString = url.split(this._BASE_PATH + "?")[1];
		return paramsString ? paramsDeserializer(paramsString) : {};
	}
}
