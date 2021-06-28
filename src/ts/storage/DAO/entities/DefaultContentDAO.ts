import { Model } from "mongoose";
import { DefaultContentModel, IDefaultContentSchema } from "../../schemas";
import { ADataAccessObject } from "./../ADataAccessObject";

export class DefaultContentDAO extends ADataAccessObject {
	protected model: Model<IDefaultContentSchema> = DefaultContentModel;

	constructor() {
		super();
		this.initModel();
	}
}
