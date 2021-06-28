import mongoose, { Schema } from "mongoose";
import { COLLECTION } from "./../../enum";
import { IDefaultContentSchema } from "./IDefaultContentSchema";

const defaultContentSchema: Schema = new mongoose.Schema<IDefaultContentSchema>({
	approved: {
		type: Boolean,
		default: false
	},
	width: {
		type: Number,
		required: true
	},
	height: {
		type: Number,
		required: true
	},
	content: {
		type: mongoose.Schema.Types.ObjectId,
		ref: COLLECTION.CONTENT,
		default: null
	}
});

export default mongoose.model<IDefaultContentSchema>(COLLECTION.DEFAULT_CONTENT, defaultContentSchema, COLLECTION.DEFAULT_CONTENT);
