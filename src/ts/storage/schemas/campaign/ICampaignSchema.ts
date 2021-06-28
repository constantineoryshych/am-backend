import { Document } from "mongoose";
import { IScheduleSchema } from "./../schedule";

export interface ICampaignSchema extends Document {
	name: string;
	status: number;
	duration: number;
	start: number;
	end: number;
	schedule: IScheduleSchema[];
	groups: string[];
	rates: string[];
	author: string;
	hits: number;
	coef: number;
	price: number;
	zones: string[];
	content: string[];
}