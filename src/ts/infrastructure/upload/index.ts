import { IncomingMessage } from "http";
import { ReadStream, createWriteStream } from "fs";
import BusBoy from "busboy";
import { createThumbnail } from "./createThumbnail";
import { createSnapshotFromVideo } from "./videoSnapshot";

interface IParameters {
	thumb: {
		path: string;
		resolution: {
			width: number;
			height: number;
		};
		quality: number;
	};
	original: {
		path: string;
		inner: string;
	};
}

interface IResolution {
	width: number;
	height: number;
	filename: string;
	type: string;
	duration?: number;
}

export class Uploader {
	private _parameters: IParameters;

	constructor(parameters: IParameters) {
		this._parameters = parameters;
	}

	public upload(source: IncomingMessage, namechunk: string, cb: (err: Error | null, resolution: IResolution | null) => void): void {
		const busBoy = new BusBoy({ headers: source.headers });

		source.pipe(busBoy);

		let type: string;

		busBoy.on("file", (_fieldname: string, file: ReadStream, filename: string, _encoding: string, mimetype: string): void => {
			console.log("file detected", _fieldname, filename, _encoding, mimetype);
			const extensionArray = filename.split(".");
			const extension = "." + extensionArray[extensionArray.length - 1];

			const dest = createWriteStream(this._parameters.original.path + namechunk + extension);
			dest.on("error", (err: Error): void => {
				cb(err, null);
			});

			dest.on("close", () => {
				const { quality, path, resolution } = this._parameters.thumb;
				if (mimetype === "video/mp4") {
					createSnapshotFromVideo(this._parameters.original.path, namechunk + extension, path)
						.then((result: IResolution) => {
							cb(null, { ...result, filename, type });
						})
						.catch((err: Error): void => {
							console.log(`Snapshot was not created for ${filename}: ${err.message}`, err);
						});
				} else {
					createThumbnail(this._parameters.original.path + namechunk + extension, { filename: namechunk + extension, quality, path, resolution })
						.then(result => {
							cb(null, { ...result, filename, type });
						})
						.catch((err: Error): void => {
							console.log(`Thumbnail was not created for ${filename}: ${err.message}`);
						});
				}
			});

			file.pipe(dest);
		});

		busBoy.on("field", (fieldname: string, val: string): void => {
			console.log("field detected", fieldname, val);
			if (fieldname === "type") type = val;
		});

		busBoy.on("finish", (): void => {
			console.log("Done parsing form");
			// cb(null, resultResolution);
		});

		busBoy.on("close", (): void => {
			console.log("close parsing form");
		});

		busBoy.on("error", (err: Error): void => {
			console.log("Error parsing form");
			cb(err, null);
		});

		source.on("end", (): void => {
			console.log("Source stream end");
			busBoy.end();
		});
	}
}
