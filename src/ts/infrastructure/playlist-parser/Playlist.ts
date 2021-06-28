import { IPlaylist, IPlaylistItem } from "./_interfaces";

enum CONTENT_TYPE {
	PICTURE = "picture",
	VIDEO = "video"
}

export class Playlist {
	private _result: IPlaylist;

	constructor() {
		this._result = [];
	}

	public getResult(): IPlaylist {
		return this._result;
	}

	public appendVideoContent(content: string): void {
		this._append(content, CONTENT_TYPE.VIDEO);
	}

	public appendImageContent(content: string, times: number = 1): void {
		this._append(content, CONTENT_TYPE.PICTURE, times);
	}

	private _append(item: string, type: CONTENT_TYPE, times: number = 1): void {
		for (let i = 0; i < times; i++) {
			this._result.push(this._getObjectForItem(item, type));
		}
	}

	private _getObjectForItem(item: string, type: CONTENT_TYPE): IPlaylistItem {
		if (type === CONTENT_TYPE.PICTURE) {
			return this._getWithPicture(item);
		}

		return this._getWithVideo(item);
	}

	private _getWithPicture(item: string): IPlaylistItem {
		return {
			picture: item,
			video: ""
		};
	}

	private _getWithVideo(item: string): IPlaylistItem {
		return {
			picture: "",
			video: item
		};
	}
}
