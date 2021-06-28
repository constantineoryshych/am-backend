import Jimp from "jimp";

interface IResolution {
	width: number;
	height: number;
}

export async function createThumbnail(source: string, { filename, quality, path, resolution }): Promise<IResolution> {
	const destination = path + filename;
	const jimp = await Jimp.read(source);
	const { width, height } = jimp.bitmap;
	await _save(destination, _resize(jimp, { quality, resolution }));
	return { width, height };
}

function _resize(jimp: Jimp, { quality, resolution }): Jimp {
	return jimp.resize(resolution.width, Jimp.AUTO).quality(quality);
}

function _save(destination: string, jimp: Jimp): Promise<Jimp> {
	return jimp.writeAsync(destination);
}
