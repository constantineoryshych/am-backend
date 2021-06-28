import { IPlaylistsService } from "../../../_interfaces";
import { ARestRouter } from "../ARestRouter";

export class PlaylistsRouter extends ARestRouter<IPlaylistsService> {
	protected _BASE_PATH: string = `/playlists`;

	constructor(service: IPlaylistsService) {
		super(service);
		this.initHandlers();
	}
}
