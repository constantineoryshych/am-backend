import { IInputProps, IPlaylist } from "./_interfaces";

import { Playlist } from "./Playlist";

export class PlaylistParser {
	private _sequence: (string | number)[];
	private _content: any;
	private _repeatsForImage: number;

	private _playlist: Playlist;

	constructor({ sequence, duration, content, BLOCK_SIZE }: IInputProps) {
		this._sequence = sequence;
		this._content = content;
		this._repeatsForImage = duration / BLOCK_SIZE;

		this._playlist = new Playlist();
	}

	public getResult(): IPlaylist {
		return this._playlist.getResult();
	}

	public parse(): void {
		for (const item of this._sequence) {
			this._handleItem(item);
		}
	}

	private _handleItem(item: string | number): void {
		if (typeof item === "number") {
			return this._fillEmptyBlocks(item);
		}

		if (this._content[item]) {
			return this._fillContentBlock(item);
		}

		this._fillInvalidBlock();
	}

	private _fillEmptyBlocks(emptyBlocksCount: number): void {
		this._playlist.appendImageContent(this._getContentName(), emptyBlocksCount);
	}

	private _fillInvalidBlock(): void {
		this._fillEmptyBlocks(this._repeatsForImage);
	}

	private _fillContentBlock(contentId: string): void {
		const content = this._getContentName(contentId);

		if (this._isContentHasDuration(contentId)) {
			this._playlist.appendVideoContent(content);
			return;
		}

		this._playlist.appendImageContent(content, this._repeatsForImage);
	}

	private _isContentHasDuration(contentId: string): boolean {
		return typeof this._content[contentId].duration === "number" && this._content[contentId].duration > 0;
	}

	private _getContentName(contentId: string = "default"): string {
		return this._content[contentId].name;
	}
}
