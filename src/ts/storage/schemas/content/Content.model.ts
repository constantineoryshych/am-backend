import mongoose, { Schema } from "mongoose";
import moment from "moment";
import { COLLECTION } from "./../../enum";
import { IContentSchema } from "./IContentSchema";

const contentSchema: Schema = new mongoose.Schema<IContentSchema>({
	name: {
		type: String,
		required: true
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: COLLECTION.USERS,
		required: true
	},
	type: {
		type: String,
		required: true,
		enum: ["adv", "sys"]
	},
	approved: {
		type: Boolean,
		default: false
	},
	duration: {
		type: Number,
		required: true
	},
	width: {
		type: Number,
		required: true
	},
	height: {
		type: Number,
		required: true
	},
	revision: {
		type: Number,
		required: true,
		default: 1
	},
	updated: {
		type: Number,
		required: true
	},
	groups: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: COLLECTION.GROUPS
		}
	]
});

// tslint:disable:no-invalid-this
contentSchema.pre("validate", function(next: () => void): void {
	if (this.isNew) {
		const doc = this as IContentSchema;
		doc.updated = moment().unix();
	}
	next();
});

// TODO: DURING TEST PERIOD
contentSchema.pre("validate", function(next: () => void): void {
	if (this.isNew) {
		const doc = this as IContentSchema;
		doc.author = "5c1915572d048c48db8cbd64";
		doc.groups = ["5c38c9d19fbfdd8e28958cc0"];
	}
	next();
});

export default mongoose.model<IContentSchema>(COLLECTION.CONTENT, contentSchema, COLLECTION.CONTENT);
