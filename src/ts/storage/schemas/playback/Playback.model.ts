import mongoose, { Schema } from "mongoose";
import { COLLECTION } from "./../../enum";
import { IPlaybackSchema } from "./IPlaybackSchema";

const playbackSchema: Schema = new mongoose.Schema<IPlaybackSchema>({
	zone: {
		type: mongoose.Schema.Types.ObjectId,
		ref: COLLECTION.ZONES,
		required: true
	},
	date: {
		type: Number,
		required: true
	},
	playlist: {
		type: mongoose.Schema.Types.ObjectId,
		ref: COLLECTION.PLAYLISTS,
		required: true
	}
});

export default mongoose.model<IPlaybackSchema>(COLLECTION.PLAYBACKS, playbackSchema, COLLECTION.PLAYBACKS);
