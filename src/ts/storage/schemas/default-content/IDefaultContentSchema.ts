import { Document } from "mongoose";

export interface IDefaultContentSchema extends Document {
	approved: boolean;
	width: number;
	height: number;
	content: string;
}
