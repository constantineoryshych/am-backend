import mongoose, { Schema } from "mongoose";

import { IScheduleSchema } from "./IScheduleSchema";

export const scheduleSchema: Schema<IScheduleSchema> = new mongoose.Schema<IScheduleSchema>({
	start: String,
	end: String,
	days: {
		type: [String],
		enum: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]
	}
});
