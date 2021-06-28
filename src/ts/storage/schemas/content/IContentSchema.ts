import { Document } from "mongoose";

export enum CONTENT_TYPE {
	ADV = "adv",
	SYS = "sys"
}

export interface IContentSchema extends Document {
	name: string;
	author: string;
	type: CONTENT_TYPE;
	approved: boolean;
	duration: number;
	width: number;
	height: number;
	revision: number;
	updated: number;
	groups: string[];
}