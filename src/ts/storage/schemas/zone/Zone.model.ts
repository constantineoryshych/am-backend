import mongoose, { Schema, Document } from "mongoose";

import { COLLECTION } from "../../enum";
import { IZoneSchema } from "./IZoneSchema";

const zoneSchema: Schema = new mongoose.Schema<IZoneSchema>({
	name: {
		type: String,
		required: true
	},
	playerId: {
		type: String,
		required: true,
		default: "CREATED_BY_USER"
	},
	approved: {
		type: Boolean,
		default: false
	},
	price: {
		type: Number
	},
	coef: {
		type: Number
	},
	type: {
		type: String
	},
	width: {
		type: Number
	},
	height: {
		type: Number
	},
	description: {
		type: String
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
	avatar: {
		type: mongoose.Schema.Types.ObjectId,
		ref: COLLECTION.CONTENT,
		default: null
	}
});

zoneSchema.pre("validate", function(next: () => void): void {
	const doc = this as IZoneSchema;
	const { width, height } = doc;
	if (!width || !height) return next();
	const defaultContentModel = mongoose.model(COLLECTION.DEFAULT_CONTENT);
	defaultContentModel.find({ width, height }).then((result: Document[]): void => {
		if (result.length > 0) return next();
		defaultContentModel.create({ width, height }).then(next);
	});
});

zoneSchema.pre("remove", function(next: () => void): void {
	const doc = this as IZoneSchema;
	const { width, height } = doc;
	if (!width || !height) return next();
	const defaultContentModel = mongoose.model(COLLECTION.DEFAULT_CONTENT);
	defaultContentModel.findOneAndDelete({ width, height });
	next();
});

export default mongoose.model<IZoneSchema>(COLLECTION.ZONES, zoneSchema, COLLECTION.ZONES);
