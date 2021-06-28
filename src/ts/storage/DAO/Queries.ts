import { Model, DocumentQuery, Document } from "mongoose";

import { IRestParams } from "./../../services/_interfaces";

export class Queries {
	private _model: Model<any, {}>;

	constructor(model?: Model<any, {}>) {
		if (model) this._model = model;
	}

	public setModel(model: Model<any>): void {
		this._model = model;
	}

	public getAll<Structure>(params: IRestParams = {}): DocumentQuery<Structure[], Document> {
		return this._model.find(params, params.fields);
	}

	public getById<Structure>(id: string, params?: IRestParams): DocumentQuery<Structure | null, Document> {
		return this._model.findById(id);
	}

	public async createOne<Structure>(item: Structure): Promise<Structure> {
		const savedItem = await new this._model(item).save();
		return savedItem.toObject();
	}

	public async removeManyByIds(
		ids: string[]
	): Promise<{
		ok: boolean;
		countOfDeleted: number | undefined;
	}> {
		if (ids.length < 1) throw new Error("Nothing to delete");
		return this._model.deleteMany({ _id: { $in: ids } }).then(result => {
			return {
				ok: result.ok === 1,
				countOfDeleted: result.n
			};
		});
	}

	public async removeById(id: string) {
		return await this._model.findByIdAndDelete(id);
	}

	public async updateMany(docs: any[]): Promise<any> {
		const pool: DocumentQuery<any, any>[] = [];
		const iterable = Array.isArray(docs) ? docs : [docs];
		for (let { _id, ...rests } of iterable) {
			pool.push(this._model.findOneAndUpdate({ _id }, rests));
		}
		return Promise.all(pool);
	}

	public async updateById<Structure>(id: string, doc: object): Promise<Structure | null> {
		return this._model.findByIdAndUpdate(id, doc);
	}

	public async appendRelative({ id, field }: any, entities: string[]) {
		return await this._model.findByIdAndUpdate(id, { $push: { [field]: entities } });
	}

	public async removeRelative({ id, field }: any, entities: string[]) {
		return await this._model.findByIdAndUpdate(id, { $pull: { [field]: entities } });
	}
}