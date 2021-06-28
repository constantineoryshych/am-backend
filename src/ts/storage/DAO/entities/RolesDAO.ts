import { Model } from "mongoose";
import { RoleModel, IRoleSchema } from "../../schemas";
import { ADataAccessObject } from "../ADataAccessObject";

export class RolesDAO extends ADataAccessObject {
	protected model: Model<IRoleSchema> = RoleModel;

	constructor() {
		super();
		this.initModel();
	}
}
