import { Model } from "mongoose";
import { ConstantModel, IConstantSchema } from "../../schemas";
import { ADataAccessObject } from "./../ADataAccessObject";

export class ConstantsDAO extends ADataAccessObject {
	protected model: Model<IConstantSchema> = ConstantModel;

	constructor() {
		super();
		this.initModel();
	}
}
