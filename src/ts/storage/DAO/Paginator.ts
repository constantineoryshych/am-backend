import { Model, DocumentQuery, Document } from "mongoose";
import { IRestParams, IPagination } from "./../../services/_interfaces";

const LIMIT = 100;

export class Paginator {
	private _model: Model<any>;

	constructor(model?: Model<any>) {
		this._model = model || null;
	}

	public setModel(model: Model<any>): void {
		this._model = model;
	}

	public applySkipAndLimit<Structure>(
		request: DocumentQuery<Structure[], Document>,
		pagination: IPagination
	): DocumentQuery<Structure[], Document> {
		const skip = pagination.page * pagination.perPage - pagination.perPage;
		if (skip > 0) request.skip(skip);
		request.limit(pagination.perPage);
		return request;
	}

	public async getPagination({ limit, page: requestPage }: IRestParams): Promise<IPagination> {
		const perPage = Number(limit) || LIMIT;
		const lastPage = await this._getLastPage(perPage);
		const page = this._parsePageNumber(lastPage, requestPage);

		return { perPage, page, lastPage };
	}

	private async _getLastPage(perPage: number): Promise<number> {
		return Math.ceil((await this._model.countDocuments()) / perPage);
	}

	private _parsePageNumber(lastPage: number, page?: string): number {
		const pageNumber = Number(page);
		if (!page) return 1;
		if (pageNumber > lastPage) return lastPage;
		return pageNumber;
	}
}
