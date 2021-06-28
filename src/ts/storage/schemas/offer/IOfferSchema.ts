import { Document } from "mongoose";

export interface IOfferSchema extends Document {
	campaigns: string[];
	status: number;
	created: number;
	until: number;
}
