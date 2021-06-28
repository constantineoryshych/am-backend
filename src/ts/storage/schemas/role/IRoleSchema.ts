import { Document } from "mongoose";

export enum Priviligies {
	USER_MANAGEMENT,
	ROLE_MANAGEMENT
}

export type T_Privilige = [number, number, number, number];

export interface IPriviligies {
	action: Priviligies;
	value: T_Privilige;
}

export interface IRoleSchema extends Document {
	name: string;
	priviligies: IPriviligies[];
}
