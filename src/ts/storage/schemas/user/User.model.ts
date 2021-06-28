import mongoose, { Schema } from "mongoose";
import { COLLECTION } from "./../../enum";
import { IUserSchema } from "./IUserSchema";

const userSchema: Schema = new mongoose.Schema<IUserSchema>(
	{
		name: {
			type: String,
			required: true,
			unique: true
		},
		firstName: {
			type: String
		},
		lastName: {
			type: String
		},
		approved: {
			type: Boolean,
			required: true,
			default: false
		},
		password: {
			type: String,
			required: false // TEMP: UNDER TEST PERIOD
		},
		email: {
			type: String,
			required: true
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
		},
		groups: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: COLLECTION.GROUPS
			}
		],
		roles: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: COLLECTION.ROLES
			}
		]
	},
	{
		toObject: {
			transform(_doc: IUserSchema, ret: IUserSchema): void {
				delete ret.password;
				delete ret.__v;
			}
		},
		toJSON: {
			transform(_doc: IUserSchema, ret: IUserSchema): void {
				delete ret.password;
				delete ret.__v;
			}
		}
	}
);

export default mongoose.model<IUserSchema>(COLLECTION.USERS, userSchema, COLLECTION.USERS);
