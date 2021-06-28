import { Model } from "mongoose";
import { OfferModel, IOfferSchema } from "../../schemas";
import { ADataAccessObject } from "../ADataAccessObject";

export class OffersDAO extends ADataAccessObject {
	protected model: Model<IOfferSchema> = OfferModel;

	constructor() {
		super();
		this.initModel();
	}
}
