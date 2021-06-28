import mongoose, { Schema } from "mongoose";
import { COLLECTION } from "./../../enum";
import { IConstantSchema } from "./IConstantSchema";

const constantSchema: Schema = new mongoose.Schema<IConstantSchema>({
	name: {
		type: String,
		required: true
	},
	value: {
		type: mongoose.SchemaTypes.Mixed
	}
});

export default mongoose.model<IConstantSchema>(COLLECTION.CONSTANTS, constantSchema, COLLECTION.CONSTANTS);
