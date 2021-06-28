import { ACampaign } from "./ACampaign";

export class Campaign extends ACampaign {
	private _content: Set<string> = new Set();
	private _zones: Set<string> = new Set();

	get content(): string[] {
		return Array.from(this._content);
	}

	get zones(): string[] {
		return Array.from(this._zones);
	}

	get additionalPrice(): number {
		return this.price * this.coef;
	}

	public setCoefficient(coef: number): void {
		this.coef = coef;
	}

	public setAvatar(content: string): void {
		this.avatar = content;
	}

	public addContent(contentId: string): void {
		this._content.add(contentId);
	}

	public addZone(zoneId: string): void {
		this._zones.add(zoneId);
	}

	public removeContent(contentId: string): void {
		this._content.delete(contentId);
	}

	public removeZone(zoneId: string): void {
		this._zones.delete(zoneId);
	}

	public addManyContent(contentIds: string[]) {
		for (const content of contentIds) {
			this.addContent(content);
		}
	}

	public addManyZones(zonesIds: string[]) {
		for (const zone of zonesIds) {
			this.addZone(zone);
		}
	}

	public removeManyContent(contentIds: string[]) {
		for (const content of contentIds) {
			this.removeContent(content);
		}
	}

	public removeManyZones(zonesIds: string[]) {
		for (const zone of zonesIds) {
			this.removeZone(zone);
		}
	}
}
