import { Document } from "mongoose";

export interface IUserSchema extends Document {
	name: string;
	firstName: string;
	lastName: string;
	approved: boolean;
	password: string;
	email: string;
	telephone: string;
	address: string;
	avatar: string;
	groups: string[];
	roles: string[];
}
