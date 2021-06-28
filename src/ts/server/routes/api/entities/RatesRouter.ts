import { IRatesService } from "../../../_interfaces";
import { ARestRouter } from "../ARestRouter";

export class RatesRouter extends ARestRouter<IRatesService> {
	protected _BASE_PATH: string = `/rates`;

	constructor(service: IRatesService) {
		super(service);
		this.initHandlers();
	}
}
