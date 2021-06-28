import { DocumentQuery, Document } from "mongoose";

export abstract class AStorage<Structure, RequiredStructure, Schema extends Document> {
	abstract getById(_id: string): DocumentQuery<Schema | null, Schema, {}>;
	abstract save(structure: Structure): Promise<void>;
	abstract create(required: RequiredStructure): Promise<Schema>;
}
