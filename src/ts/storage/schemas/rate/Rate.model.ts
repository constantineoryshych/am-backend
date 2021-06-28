import mongoose, { Schema } from "mongoose";
import { COLLECTION } from "./../../enum";
import { scheduleSchema } from "./../schedule";
import { IRateSchema } from "./IRateSchema";

const ratesSchema: Schema = new mongoose.Schema<IRateSchema>({
	name: {
		type: String,
		required: true
	},
	type: {
		type: String,
		required: function() {
			return ["prime-time", "discount"].indexOf(this.type) > -1
		},
		enum: ["prime-time", "discount"],
		default: "prime-time"
	},
	coef: {
		type: Number,
		required: true,
		default: 1
	},
	periodStart: {
		type: Number
	},
	periodEnd: {
		type: Number
	},
	schedule: {
		type: [scheduleSchema]
	}
});

export default mongoose.model<IRateSchema>(COLLECTION.RATES, ratesSchema, COLLECTION.RATES);
