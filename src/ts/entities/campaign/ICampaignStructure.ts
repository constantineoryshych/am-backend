export interface ICampaignStructure {
	_id: string;
	name: string;
	duration: number;
	hits: number;
	start: number;
	end: number;
	content: string[];
	zones: string[];
	coef: number;
	price: number;
	avatar: string;
}

export interface ICampaignRequired {
	start: 123;
	end: 125;
	duration: 10;
	hits: 10;
}
