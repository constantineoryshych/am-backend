import mongoose, { Schema } from "mongoose";
import moment from "moment";
import { COLLECTION } from "./../../enum";
import { IOfferSchema } from "./IOfferSchema";

const offerSchema: Schema = new mongoose.Schema<IOfferSchema>({
	campaigns: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: COLLECTION.CAMPAIGNS,
		required: true
	}],
	status: {
		type: Number,
		required: true,
		enum: [0, 1, 2, 3],
		default: 0
	},
	created: {
		type: Number,
		required: true
	},
	until: {
		type: Number,
		required: true
	}
});

// TODO: During test period
offerSchema.pre("validate", function(next: () => void): void {
	if (this.isNew) {
		const doc = this as IOfferSchema;
		const now = moment();
		doc.created = now.unix();
		doc.until = now.add(7, "days").unix();
	}
	next();
});

export default mongoose.model<IOfferSchema>(COLLECTION.OFFERS, offerSchema, COLLECTION.OFFERS);
