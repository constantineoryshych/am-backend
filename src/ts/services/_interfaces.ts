import { IncomingMessage } from "http";
import { Readable } from "stream";

interface IResolution {
	width: number;
	height: number;
	filename: string;
	duration?: number;
}

export type TUploader = (source: IncomingMessage, namechunk: string, cb: (err: Error | null, resolution: IResolution | null) => void) => void;

interface IPdfPresenter {
	getReadablePDF(offer: any): Readable;
}

export interface IServicesProps {
	infrastructure: {
		Uploader: { upload: TUploader };
		Config: any;
		PdfPresenter: IPdfPresenter,
		PlaylistParser: any; // FIXME:
	};
}

interface PopulateOptions {
	/** space delimited path(s) to populate */
	path: string;
	/** optional fields to select */
	select?: any;
	/** optional query conditions to match */
	match?: any;
	/** optional name of the model to use for population */
	model?: string;
	/** optional query options like sort, limit, etc */
	options?: any;
	/** deep populate */
	populate?: PopulateOptions | PopulateOptions[];
}

export interface IPagination {
	page: number;
	perPage: number;
	lastPage: number;
}

export interface IScopeWithPagination {
	pagination: IPagination;
}

export interface IDeletionResult {
	ok: boolean;
	countOfDeleted: number | undefined;
}

// export interface IRestParams {
// 	condition?: any; // FIXME: type
// 	fields?: string[];
// 	limit?: string;
// 	page?: string;
// 	sort?: any; // FIXME: type
// 	populate?: PopulateOptions | PopulateOptions[];
// 	[key: string]: string | number | string[] | undefined | PopulateOptions | PopulateOptions[];
// }

export interface IRestParams {
	fields?: string[];
	sort?: string;
	order?: "asc" | "desc";
	skip?: number;
	limit?: number;
	populate?: PopulateOptions | PopulateOptions[];
	[key: string]: string | number | string[] | undefined | PopulateOptions | PopulateOptions[];
}

export interface IDataAccessObject {
	getAll<Structure>(params: IRestParams): Promise<Structure[]>;
	getById<Structure>(id: string, params?: IRestParams): Promise<Structure | null>;
	createOne<Structure>(item: Structure): Promise<Structure>;
	removeManyByIds(ids: string[]): Promise<IDeletionResult>;

	// FIXME: return type
	removeById(id: string): Promise<any>;
	updateById<Structure>(id: string, doc: object): Promise<Structure | null>;
	updateMany(docs: object[]): Promise<any>;

	appendRelative<Structure>({ id, field }: any, entities: string[]): Promise<Structure | null>;
	removeRelative<Structure>({ id, field }: any, entities: string[]): Promise<Structure | null>;
}

export interface IRestService {
	getAll(): Promise<unknown>;
	getById(id: string): Promise<unknown>;
	createOne(item: object): Promise<unknown>;
	updateById(id: string, item: object): Promise<unknown>;
	updateMany(items: object[]): Promise<unknown>;
	removeById(id: string): Promise<unknown>;
	removeMany(ids: string[]): Promise<unknown>;
	appendRelative({ id, field }: any, entities: string[]): Promise<unknown | null>;
	removeRelative({ id, field }: any, entities: string[]): Promise<unknown | null>;
}

export interface IOfferService {
	getReadableDocument(id: string): Promise<Readable>
}