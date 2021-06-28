import { Model } from "mongoose";
import { PlaybackModel, IPlaybackSchema } from "../../schemas";
import { ADataAccessObject } from "./../ADataAccessObject";

export class PlaybacksDAO extends ADataAccessObject {
	protected model: Model<IPlaybackSchema> = PlaybackModel;

	constructor() {
		super();
		this.initModel();
	}
}
