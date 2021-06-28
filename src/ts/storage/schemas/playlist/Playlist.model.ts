import mongoose, { Schema } from "mongoose";
import { COLLECTION } from "./../../enum";
import { IPlaylistSchema } from "./IPlaylistSchema";

const playlistSchema: Schema = new mongoose.Schema<IPlaylistSchema>({
	sequence: [
		{
			type: Schema.Types.Mixed,
			ref: COLLECTION.CAMPAIGNS,
			required: true
		}
	]
});

export default mongoose.model<IPlaylistSchema>(COLLECTION.PLAYLISTS, playlistSchema, COLLECTION.PLAYLISTS);
