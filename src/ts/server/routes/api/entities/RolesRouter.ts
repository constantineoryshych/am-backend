import { IRolesService } from "../../../_interfaces";
import { ARestRouter } from "../ARestRouter";

export class RolesRouter extends ARestRouter<IRolesService> {
	protected _BASE_PATH: string = `/roles`;

	constructor(service: IRolesService) {
		super(service);
		this.initHandlers();
	}
}
