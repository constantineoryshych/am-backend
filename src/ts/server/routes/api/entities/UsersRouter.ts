import { IUsersService } from "../../../_interfaces";
import { ARestRouter } from "../ARestRouter";

export class UsersRouter extends ARestRouter<IUsersService> {
	protected _BASE_PATH: string = `/users`;

	constructor(service: IUsersService) {
		super(service);
		this.initHandlers();
	}
}
