import { Document } from "mongoose";
import { IScheduleSchema } from "./../schedule";

export enum RATE_TYPE {
	PRIME = "prime-time",
	DISCOUNT = "discount"
}

export interface IRateSchema extends Document {
	name: string;
	type: RATE_TYPE;
	coef: number;
	periodStart: number;
	periodEnd: number;
	schedule: IScheduleSchema[];
}