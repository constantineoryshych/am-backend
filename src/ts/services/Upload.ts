import { IncomingMessage } from "http";
import { IDataAccessObject } from "./_interfaces";
import { ObjectId } from "bson";

interface IResolution {
	width: number;
	height: number;
	filename: string;
	duration?: number;
}

export type TUploader = (source: IncomingMessage, namechunk: string, cb: (err: Error | null, resolution: IResolution | null) => void) => void;

export class UploadService {
	constructor(private readonly _uploader: { upload: TUploader }, private readonly _DAO: IDataAccessObject) {}

	upload(source: IncomingMessage, cb: (err: Error | null) => void): void {
		const namechunk = new ObjectId().toHexString();
		
		this._uploader.upload(source, namechunk, (err: Error, resolution: IResolution): void => {
			if (err) return cb(err);

			const { width, height, duration, filename, type } = resolution as any;

			this._DAO
				.createOne({ _id: namechunk, name: filename, type, width, height, duration: duration ? duration : 10 })
				.then((): void => {
					cb(null);
				})
				.catch(cb);
		});
	}
}
