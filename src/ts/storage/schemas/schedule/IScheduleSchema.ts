import { Document } from "mongoose";

export enum DAYS {
	MON = "mon",
	TUE = "tue",
	WED = "wed",
	THU = "thu",
	FRI = "fri",
	SAT = "sat",
	SUN = "sun"
}

export interface IScheduleSchema extends Document {
	start: string;
	end: string;
	days: DAYS[];
}
