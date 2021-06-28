import { Request, Response } from "express";
import { IOffersService } from "../../../_interfaces";
import { ARestRouter } from "../ARestRouter";

export class OffersRouter extends ARestRouter<IOffersService> {
	protected _BASE_PATH: string = `/offers`;

	constructor(service: IOffersService) {
		super(service);
		this.initCustomHandlers();
		this.initHandlers();
	}

	private initCustomHandlers(): void {
		this.router.get(this._BASE_PATH + "/:id/pdf", this._getPdfDocument);
		this.router.post(this._BASE_PATH + "/join", this._joinOffers);
	}

	private _getPdfDocument = (req: Request, res: Response): void => {
		this._service
			.getReadableDocument(req.params.id)
			.then((document: any): void => {
				document.pipe(res);
				document.end();
			})
			.catch((err: Error): void => {
				this._exceptionAnswer(res, err);
			});
	};

	private _joinOffers = (req: Request, res: Response): void => {
		this._service
			.joinOffers(req.body.offers)
			.then((): void => {
				res.end();
			})
			.catch((err: Error): void => {
				this._exceptionAnswer(res, err);
			});
	};
}
