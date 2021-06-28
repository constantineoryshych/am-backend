import { Model } from "mongoose";
import { PlaylistModel, IPlaylistSchema } from "../../schemas";
import { ADataAccessObject } from "../ADataAccessObject";

export class PlaylistsDAO extends ADataAccessObject {
	protected model: Model<IPlaylistSchema> = PlaylistModel;

	constructor() {
		super();
		this.initModel();
	}
}
