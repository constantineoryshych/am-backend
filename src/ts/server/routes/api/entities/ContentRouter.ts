import { IContentService } from "./../../../_interfaces";
import { ARestRouter } from "./../ARestRouter";

export class ContentRouter extends ARestRouter<IContentService> {
	protected _BASE_PATH: string = `/content`;

	constructor(service: IContentService) {
		super(service);
		this.initHandlers();
	}

	protected _create = this._notAcceptableHandler;
	protected _appendRelative = this._notAcceptableHandler;
	protected _removeRelative = this._notAcceptableHandler;
}
