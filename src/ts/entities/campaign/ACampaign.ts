import { ICampaignStructure } from "./ICampaignStructure";

export abstract class ACampaign implements ICampaignStructure {
	_id: string;
	name: string;
	duration: number;
	hits: number;
	start: number;
	end: number;
	coef: number;
	price: number;
	avatar: string;

	constructor({ _id, name, duration, hits, start, end, content, zones, coef, price, avatar }: ICampaignStructure) {
		this._id = _id;
		this.name = name;
		this.duration = duration;
		this.hits = hits;
		this.start = start;
		this.end = end;
		this.coef = coef;
		this.price = price;
		this.avatar = avatar;

		this.addManyContent(content);
		this.addManyZones(zones);
	}

	abstract get content(): string[];
	abstract get zones(): string[];
	abstract get additionalPrice(): number;

	abstract setCoefficient(coef: number): void;
	
	abstract setAvatar(content: string): void;

	abstract addContent(contentId: string): void;
	abstract addZone(zoneId: string): void;

	abstract removeContent(contentId: string): void;
	abstract removeZone(zoneId: string): void;

	abstract addManyContent(contentIds: string[]): void;
	abstract addManyZones(zonesIds: string[]): void;

	abstract removeManyContent(contentIds: string[]): void;
	abstract removeManyZones(zonesIds: string[]): void;
}
