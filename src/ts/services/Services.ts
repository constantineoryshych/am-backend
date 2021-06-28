import { IServicesProps } from "./_interfaces";
import { UploadService } from "./Upload";
import { ContentService } from "./entities/Content";
import { ConstantsService } from "./entities/Constants";
import { CampaignsService } from "./entities/Campaigns";
import { DefaultContentService } from "./entities/DefaultContent";
import { GroupsService } from "./entities/Groups";
import { OffersService } from "./entities/Offers";
import { PlaybacksService } from "./entities/Playbacks";
import { PlaylistsService } from "./entities/Playlists";
import { RatesService } from "./entities/Rates";
import { RolesService } from "./entities/Roles";
import { UsersService } from "./entities/Users";
import { ZonesService } from "./entities/Zones";
import { NdsService } from "./NDS";

import {
	CampaignsDAO,
	ConstantsDAO,
	ContentDAO,
	DefaultContentDAO,
	GroupsDAO,
	OffersDAO,
	PlaybacksDAO,
	PlaylistsDAO,
	RatesDAO,
	RolesDAO,
	UsersDAO,
	ZonesDAO
} from "./../storage";

export class Services {
	constructor(private readonly _props: IServicesProps) {}

	public getUploadService(): UploadService {
		return new UploadService(this._props.infrastructure.Uploader, new ContentDAO());
	}

	public getCampaignService(): CampaignsService {
		return new CampaignsService(new CampaignsDAO());
	}

	public getConstantsService(): ConstantsService {
		return new ConstantsService(new ConstantsDAO());
	}

	public getContentService(): ContentService {
		return new ContentService(new ContentDAO());
	}

	public getDefaultContentService(): DefaultContentService {
		return new DefaultContentService(new DefaultContentDAO());
	}

	public getGroupsService(): GroupsService {
		return new GroupsService(new GroupsDAO());
	}

	public getOffersService(): OffersService {
		return new OffersService(new OffersDAO(), this._props.infrastructure.PdfPresenter);
	}

	public getPlaybacksService(): PlaybacksService {
		return new PlaybacksService(new PlaybacksDAO());
	}

	public getPlaylistsService(): PlaylistsService {
		return new PlaylistsService(new PlaylistsDAO());
	}

	public getRatesService(): RatesService {
		return new RatesService(new RatesDAO());
	}

	public getRolesService(): RolesService {
		return new RolesService(new RolesDAO());
	}

	public getUsersService(): UsersService {
		return new UsersService(new UsersDAO());
	}

	public getZonesService(): ZonesService {
		return new ZonesService(new ZonesDAO());
	}

	public getNdsService(): NdsService {
		return new NdsService(
			{ zones: new ZonesDAO(), playbacks: new PlaybacksDAO(), campaigns: new CampaignsDAO(), defaultContent: new DefaultContentDAO() },
			this._props.infrastructure.Config,
			this._props.infrastructure.PlaylistParser
		);
	}
}
