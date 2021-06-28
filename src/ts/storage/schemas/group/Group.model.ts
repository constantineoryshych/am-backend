import mongoose, { Schema } from "mongoose";
import { COLLECTION } from "./../../enum";
import { IGroupSchema  } from "./IGroupSchema";

const groupSchema: Schema = new mongoose.Schema<IGroupSchema>({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String
	},
	email: {
		type: String
	},
	telephone: {
		type: String
	},
	address: {
		type: String
	},
	avatar: {
		type: mongoose.Schema.Types.ObjectId,
		ref: COLLECTION.CONTENT,
		default: null
	}
});

export default mongoose.model<IGroupSchema>(COLLECTION.GROUPS, groupSchema, COLLECTION.GROUPS);
