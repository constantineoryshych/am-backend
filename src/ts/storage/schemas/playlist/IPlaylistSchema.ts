import { Document } from "mongoose";

export type TPlaylist = (number | string)[];

export interface IPlaylistSchema extends Document {
	sequence: TPlaylist;
}
