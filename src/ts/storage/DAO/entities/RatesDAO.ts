import { Model } from "mongoose";
import { RateModel, IRateSchema } from "../../schemas";
import { ADataAccessObject } from "../ADataAccessObject";

export class RatesDAO extends ADataAccessObject {
	protected model: Model<IRateSchema> = RateModel;

	constructor() {
		super();
		this.initModel();
	}
}
