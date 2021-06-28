import { IGroupsService } from "../../../_interfaces";
import { ARestRouter } from "../ARestRouter";

export class GroupsRouter extends ARestRouter<IGroupsService> {
	protected _BASE_PATH: string = `/groups`;

	constructor(service: IGroupsService) {
		super(service);
		this.initHandlers();
	}
}
