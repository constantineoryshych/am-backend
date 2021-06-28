import { Model, ModelPopulateOptions, DocumentQuery, Document } from "mongoose";

import { IDataAccessObject, IRestParams, IDeletionResult } from "./../../services/_interfaces";

import { Paginator } from "./Paginator";
import { Populater } from "./Populater";
import { Queries } from "./Queries";

export abstract class ADataAccessObject implements IDataAccessObject {
	// protected abstract collection: COLLECTION;
	protected abstract model: Model<any>;

	protected readonly _queries: Queries = new Queries();
	protected readonly _paginator: Paginator = new Paginator();
	protected readonly _populator: Populater = new Populater();

	protected initModel(): void {
		// this.model = mongoose.model<any>(this.collection);
		this._queries.setModel(this.model);
		this._paginator.setModel(this.model);
	}

	protected setDefaultPopulation(population: ModelPopulateOptions | ModelPopulateOptions[]): void {
		this._populator.setDefaultPopulation(population);
	}

	public getById<Structure>(id: string, params?: IRestParams): Promise<Structure | null> {
		const query = this._queries.getById(id, params);
		return this._populator.applyPopulationIfSpecified(query, params.populate);
	}

	public getAll<Structure>(params: IRestParams = {}): Promise<Structure[]> {
		const { populate, ...rests } = params;
		const query = this._queries.getAll<Structure>(rests || {});
		this._paginator.applySkipAndLimit(query, params);
		return this._populator.applyPopulationIfSpecified<Structure>(query, populate);
	}

	public createOne<Structure>(item: Structure): Promise<Structure> {
		return this._queries.createOne(item);
	}

	public removeById(id: string) {
		return this._queries.removeById(id);
	}

	public removeManyByIds(ids: string[]): Promise<IDeletionResult> {
		return this._queries.removeManyByIds(ids);
	}

	public updateById<Structure>(id: string, doc: object): Promise<Structure | null> {
		return this._queries.updateById(id, doc);
	}

	public updateMany(docs: any[]): Promise<any> {
		return this._queries.updateMany(docs);
	}

	public async appendRelative({ id, field }: any, entities: string[]) {
		return this._queries.appendRelative({ id, field }, entities);
	}

	public async removeRelative({ id, field }: any, entities: string[]) {
		return this._queries.removeRelative({ id, field }, entities);
	}
}
