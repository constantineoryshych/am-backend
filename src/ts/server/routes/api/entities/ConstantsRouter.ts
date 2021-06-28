import { IConstantsService } from "../../../_interfaces";
import { ARestRouter } from "../ARestRouter";

export class ConstantsRouter extends ARestRouter<IConstantsService> {
	protected _BASE_PATH: string = `/constants`;

	constructor(service: IConstantsService) {
		super(service);
		this.initHandlers();
	}
}
