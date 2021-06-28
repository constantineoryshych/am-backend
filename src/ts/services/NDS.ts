import { IDataAccessObject } from "./_interfaces";

interface IDAOSet {
	zones: IDataAccessObject;
	playbacks: IDataAccessObject;
	campaigns: IDataAccessObject;
	defaultContent: IDataAccessObject;
}

export class NdsService {
	constructor(private readonly _DAO: IDAOSet, private readonly _Config: any, private readonly _PlaylistParser: any) {}

	public async getPlaySequence(playerId: string): Promise<unknown> {
		try {
			const player = await this._getPlayer(playerId);
			const sequence = await this._getSequence(player.id);
			const campaign = await this._getCampaign(sequence);

			const content = this._collectContent(player, campaign);
			console.log(content)
			const result = this._parse(sequence, campaign.duration, content);
			
			return JSON.stringify(result);
		} catch (err) {
			console.log(err.message);
			return this._defaultSequence();
		}
	}
	

	private async _getPlayer(playerId: string): Promise<any> {
		const player: any = await this._DAO.zones.getById(playerId, {});
		if (!player) throw new Error("Player not exist");
		return player;
	}

	private async _getSequence(playerId: string): Promise<any> {
		const playbacks: any = await this._DAO.playbacks.getAll({ zone: playerId, populate: { path: "playlist" }} );
		if (!playbacks) throw new Error("Playback not found");
	
		const sequence: string[] =  playbacks[playbacks.length - 1].playlist.sequence;
		return sequence;
	}

	private async _getCampaign(sequence: string[]): Promise<any> {
		const campaigns: any = await this._DAO.campaigns.getAll({ _id: { "$in": sequence }, populate: { path: "content" }} as any);
		return campaigns[0];
	}

	private _collectContent(player, campaign) {
		const content = {};
		content[campaign.id] = { name: "defaultContent" };
		for (const item of campaign.content) {
			if (item.width !== player.width || item.height !== player.height) continue;
			content[campaign.id] = { name: item.name, duration: item.duration };
		}

		return content;
	}

	private _parse(sequence, duration, content): any {
		console.log(sequence)
		const parser = new this._PlaylistParser({
			sequence: sequence,
			duration: duration,
			BLOCK_SIZE: this._Config.constants.timeBlock,
			content: {
				default: { name: "defaultContent" },
				...content
			}
		});
		parser.parse();
		return parser.getResult();
	}

	private _defaultSequence(): any {
		return `{data: []}`
	}
}
