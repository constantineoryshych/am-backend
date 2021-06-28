import { Document } from "mongoose";

export interface IPlaybackSchema extends Document {
	zone: string;
	date: number;
	playlist: string;
}
