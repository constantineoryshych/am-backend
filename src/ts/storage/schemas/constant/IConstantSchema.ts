import { Document } from "mongoose";

export interface IConstantSchema extends Document {
	name: string;
	value: unknown;
}
