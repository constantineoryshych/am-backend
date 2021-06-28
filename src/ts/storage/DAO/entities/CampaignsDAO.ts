import { Model } from "mongoose";
import { CampaignModel, ICampaignSchema } from "../../schemas";
import { ADataAccessObject } from "./../ADataAccessObject";

export class CampaignsDAO extends ADataAccessObject {
	protected model: Model<ICampaignSchema> = CampaignModel;

	constructor() {
		super();
		this.initModel();
	}
}
