import { ICampaignsService } from "../../../_interfaces";
import { ARestRouter } from "../ARestRouter";

export class CampaignsRouter extends ARestRouter<ICampaignsService> {
	protected _BASE_PATH: string = `/campaigns`;

	constructor(service: ICampaignsService) {
		super(service);
		this.initHandlers();
	}
}
