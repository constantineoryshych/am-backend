import { Model } from "mongoose";
import { ZoneModel, IZoneSchema } from "../../schemas";
import { ADataAccessObject } from "./../ADataAccessObject";

export class ZonesDAO extends ADataAccessObject {
	protected model: Model<IZoneSchema> = ZoneModel;

	constructor() {
		super();
		this.initModel();
	}
}
