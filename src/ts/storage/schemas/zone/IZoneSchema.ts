import { Document } from "mongoose";

export interface IZoneSchema extends Document {
	name: string;
	playerId: string;
	approved: boolean;
	price: number;
	coef: number;
	type: string;
	width: number;
	height: number;
	description: string;
	groups: string[];
	rates: string[];
}