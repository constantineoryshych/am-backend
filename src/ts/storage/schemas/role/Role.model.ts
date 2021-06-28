import mongoose, { Schema } from "mongoose";
import { COLLECTION } from "./../../enum";

import { IRoleSchema } from "./IRoleSchema";

const previligeSchema: Schema = new mongoose.Schema({
	action: String,
	value: [Number, Number, Number, Number]
});

const roleSchema: Schema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	priviligies: {
		type: [],
		required: true
	},
	campaigns: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: COLLECTION.CAMPAIGNS
	}],
	zones: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: COLLECTION.ZONES
	}],
	groups: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: COLLECTION.GROUPS
	}]
});

export default mongoose.model<IRoleSchema>(COLLECTION.ROLES, roleSchema, COLLECTION.ROLES);
