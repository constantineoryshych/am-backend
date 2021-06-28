import { IPlaybacksService } from "../../../_interfaces";
import { ARestRouter } from "../ARestRouter";

export class PlaybacksRouter extends ARestRouter<IPlaybacksService> {
	protected _BASE_PATH: string = `/playbacks`;

	constructor(service: IPlaybacksService) {
		super(service);
		this.initHandlers();
	}
}
