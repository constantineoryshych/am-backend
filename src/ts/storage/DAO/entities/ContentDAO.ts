import { Model } from "mongoose";
import { ContentModel, IContentSchema } from "../../schemas";
import { ADataAccessObject } from "./../ADataAccessObject";

export class ContentDAO extends ADataAccessObject {
	protected model: Model<IContentSchema> = ContentModel;

	constructor() {
		super();
		this.initModel();
	}
}
