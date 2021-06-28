import { RequestHandler } from "express";
import { Readable } from "stream";
import { IDataAccessObject } from "../services/_interfaces";

export enum HTTP_STATUS {
	OK = 200,
	CREATED = 201,
	ACCEPTED = 202,
	NOT_FOUND = 404,
	FORBIDDEN = 403,
	NOT_ACCEPTABLE = 406,
	INTERNAL_SERVER_ERROR = 500,
	NOT_IMPLEMENTED = 503
}

export interface IServerProps {
	port?: number;
	services: IServices;
}

export interface IServer {
	start(): Promise<void>;
	stop(): Promise<void | Error>;
}

export enum MIDDLEWARE {
	CORS = "cors",
	CORB = "corb",
	BODY_PARSER = "bodyParserJson",
	COOKIE_PARSER = "cookieParser"
}

export interface IMiddleware {
	getHandler(name: MIDDLEWARE): RequestHandler;
}

export interface IUploadService {
	upload(source: Readable, cb: (err: null | Error) => void): void;
}

export interface INdsService {
	getPlaySequence(playerId: string): Promise<unknown>;
}

export enum REST_METHOD {
	GET = "getAll",
	GET_BY_ID = "getById",
	DELETE = "removeMany",
	DELETE_BY_ID = "removeById",
	UPDATE = "updateMany",
	UPDATE_BY_ID = "updateById",
	CREATE_ONE = "createOne",
	APPEND_RELATIVE = "appendRelative",
	REMOVE_RELATIVE = "removeRelative"
}

export interface IRestService {
	[REST_METHOD.GET]: () => Promise<any>;
	[REST_METHOD.GET_BY_ID]: (id: string) => Promise<any>;
	[REST_METHOD.DELETE]: (ids: string[]) => Promise<any>;
	[REST_METHOD.DELETE_BY_ID]: (id: string) => Promise<any>;
	[REST_METHOD.UPDATE]: (item: any[]) => Promise<any>;
	[REST_METHOD.UPDATE_BY_ID]: (id: string, item: any) => Promise<any>;
	[REST_METHOD.CREATE_ONE]: (item: any) => Promise<any>;
	[REST_METHOD.APPEND_RELATIVE]: ({ id, field }: any, entities: string[]) => Promise<any>;
	[REST_METHOD.REMOVE_RELATIVE]: ({ id, field }: any, entities: string[]) => Promise<any>;
}

export interface ICampaignsService extends IRestService {}
export interface IConstantsService extends IRestService {}
export interface IContentService extends IRestService {}
export interface IDefaultContentService extends IRestService {}
export interface IGroupsService extends IRestService {}
export interface IOffersService extends IRestService {
	getReadableDocument(id: string): Promise<Readable>;
	joinOffers(offersIds: string[]): Promise<void>;
}
export interface IPlaybacksService extends IRestService {}
export interface IPlaylistsService extends IRestService {}
export interface IRatesService extends IRestService {}
export interface IRolesService extends IRestService {}
export interface IUsersService extends IRestService {}
export interface IZonesService extends IRestService {}

export interface IServices {
	getUploadService(): IUploadService;
	getCampaignService(): ICampaignsService;
	getConstantsService(): IConstantsService;
	getContentService(): IContentService;
	getDefaultContentService(): IDefaultContentService;
	getGroupsService(): IGroupsService;
	getOffersService(): IOffersService;
	getPlaybacksService(): IPlaybacksService;
	getPlaylistsService(): IPlaylistsService;
	getRatesService(): IRatesService;
	getRolesService(): IRolesService;
	getUsersService(): IUsersService;
	getZonesService(): IZonesService;
	getNdsService(): INdsService;
}

export interface IRouter {
	init(): void;
}
