import { Document } from "mongoose";

export interface IGroupSchema extends Document {
	name: string;
	description: string;
	email: string;
	telephone: string;
	address: string;
}