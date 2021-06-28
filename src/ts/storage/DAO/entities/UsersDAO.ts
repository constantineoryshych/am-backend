import { Model } from "mongoose";
import { UserModel, IUserSchema } from "../../schemas";
import { ADataAccessObject } from "../ADataAccessObject";

export class UsersDAO extends ADataAccessObject {
	protected model: Model<IUserSchema> = UserModel;

	constructor() {
		super();
		this.initModel();
	}
}
