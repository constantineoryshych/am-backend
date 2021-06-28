import { IZonesService } from "../../../_interfaces";
import { ARestRouter } from "../ARestRouter";

export class ZonesRouter extends ARestRouter<IZonesService> {
	protected _BASE_PATH: string = `/zones`;

	constructor(service: IZonesService) {
		super(service);
		this.initHandlers();
	}
}
