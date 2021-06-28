import { IDefaultContentService } from "../../../_interfaces";
import { ARestRouter } from "../ARestRouter";

export class DefaultContentRouter extends ARestRouter<IDefaultContentService> {
	protected _BASE_PATH: string = `/defaultContent`;

	constructor(service: IDefaultContentService) {
		super(service);
		this.initHandlers();
	}
}
