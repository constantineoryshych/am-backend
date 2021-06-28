import { IDataAccessObject, IRestService } from "./_interfaces";

export abstract class ARestService implements IRestService {
	protected abstract resultFieldContainer: string;

	constructor(protected readonly _DAO: IDataAccessObject) {}

	public getAll(params?: any): Promise<unknown> {
		const method = this._DAO.getAll(params);
		return this.decorateResult(method);
	}

	public getById(id: string): Promise<unknown> {
		const method = this._DAO.getById(id, { });
		return this.decorateResult(method);
	}

	public createOne(item: object): Promise<unknown> {
		const method = this._DAO.createOne(item);
		return this.decorateResult(method);
	}

	public updateById(id: string, item: object): Promise<unknown> {
		const method = this._DAO.updateById(id, item);
		return this.decorateResult(method);
	}

	public updateMany(items: object[]): Promise<unknown> {
		const method = this._DAO.updateMany(items);
		return this.decorateResult(method);
	}

	public removeById(id: string): Promise<unknown> {
		const method = this._DAO.removeById(id);
		return this.decorateResult(method);
	}

	public removeMany(ids: string[]): Promise<unknown> {
		const method = this._DAO.removeManyByIds(ids);
		return this.decorateResult(method);
	}

	public appendRelative({ id, field }: any, entities: string[]): Promise<unknown | null> {
		const method = this._DAO.appendRelative({ id, field }, entities)
		return this.decorateResult(method);
	}

	public removeRelative({ id, field }: any, entities: string[]): Promise<unknown | null> {
		const method = this._DAO.removeRelative({ id, field }, entities);
		return this.decorateResult(method);
	}

	protected decorateResult(method: Promise<any>): Promise<unknown | null> {
		return method.then(result => {
			return {
				[this.resultFieldContainer]: result
			};
		})
	}
}