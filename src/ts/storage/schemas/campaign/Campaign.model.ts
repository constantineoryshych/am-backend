import mongoose, { Schema } from "mongoose";

import { COLLECTION } from "./../../enum";
import { scheduleSchema } from "./../schedule";
import { ICampaignSchema } from "./ICampaignSchema";

const campaingnSchema: Schema<ICampaignSchema> = new mongoose.Schema<ICampaignSchema>({
	name: {
		type: String,
		required: true
	},
	status: {
		type: Number,
		required: true,
		enum: [0, 1, 2, 3, 4, 5, 6],
		default: 0
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: COLLECTION.USERS,
		required: true
	},
	coef: {
		type: Number,
		default: 1
	},
	price: {
		type: Number,
		default: 0
	},
	duration: {
		type: Number,
		required: true
	},
	hits: {
		type: Number,
		required: true
	},
	start: {
		type: Number,
		required: true
	},
	end: {
		type: Number,
		required: true
	},
	schedule: {
		type: [scheduleSchema]
	},
	groups: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: COLLECTION.GROUPS
		}
	],
	rates: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: COLLECTION.RATES
		}
	],
	zones: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: COLLECTION.ZONES
		}
	],
	content: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: COLLECTION.CONTENT
		}
	],
	avatar: {
		type: mongoose.Schema.Types.ObjectId,
		ref: COLLECTION.CONTENT,
		default: null
	}
});

// TEMP: DURING TEST PERIOD
campaingnSchema.pre("validate", function(next: () => void): void {
	if (this.isNew) {
		const doc = this as ICampaignSchema;
		doc.author = "5c1915572d048c48db8cbd64";
	}
	next();
});

export default mongoose.model<ICampaignSchema>(COLLECTION.CAMPAIGNS, campaingnSchema, COLLECTION.CAMPAIGNS);
