import { ARouter } from "./../../ARouter";

import { UploadRouter } from "./UploadRouter";
import { ContentRouter } from "./entities/ContentRouter";
import { ConstantsRouter } from "./entities/ConstantsRouter";
import { CampaignsRouter } from "./entities/CampaignsRouter";
import { DefaultContentRouter } from "./entities/DefautContentRouter";
import { GroupsRouter } from "./entities/GroupsRouter";
import { OffersRouter } from "./entities/OffersRouter";
import { PlaybacksRouter } from "./entities/PlaybacksRouter";
import { PlaylistsRouter } from "./entities/PlaylistsRouter";
import { RatesRouter } from "./entities/RatesRouter";
import { RolesRouter } from "./entities/RolesRouter";
import { UsersRouter } from "./entities/UsersRouter";
import { ZonesRouter } from "./entities/ZonesRouter";

import { NdsRouter } from "./NdsRouter";

import { Router } from "express";

const _API_V = "v1";

export class ApiRouter extends ARouter {
	private _API_V: string = _API_V;
	private _BASE_PATH: string = `/api/${this._API_V}`;

	public init(): void {
		const routers = this._initRouters();
		this._attachRoutersToServer(routers);
	}

	private _initRouters(): { router: Router }[] {
		return [
			new UploadRouter(this.services.getUploadService()),
			new ContentRouter(this.services.getContentService()),
			new ConstantsRouter(this.services.getConstantsService()),
			new CampaignsRouter(this.services.getCampaignService()),
			new DefaultContentRouter(this.services.getDefaultContentService()),
			new GroupsRouter(this.services.getGroupsService()),
			new OffersRouter(this.services.getOffersService()),
			new PlaybacksRouter(this.services.getPlaybacksService()),
			new PlaylistsRouter(this.services.getPlaylistsService()),
			new RatesRouter(this.services.getRatesService()),
			new RolesRouter(this.services.getRolesService()),
			new UsersRouter(this.services.getUsersService()),
			new ZonesRouter(this.services.getZonesService()),
			new NdsRouter(this.services.getNdsService())
		];
	}

	private _attachRoutersToServer(routers: { router: Router }[]): void {
		for (const route of routers) {
			this.express.use(this._BASE_PATH, route.router);
		}
	}
}
