import { Model } from "mongoose";
import { GroupModel, IGroupSchema } from "../../schemas";
import { ADataAccessObject } from "../ADataAccessObject";

export class GroupsDAO extends ADataAccessObject {
	protected model: Model<IGroupSchema> = GroupModel;

	constructor() {
		super();
		this.initModel();
	}
}
