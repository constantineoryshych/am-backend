import { IPrices, logo as header, footer, pageMargins, styles } from "./../../document/offer";

import { getHeader } from "./header";
import { getFooter } from "./footer";
import { getZonesTable } from "./table-zones";

const _STYLES_AND_COLONTITLES = { pageMargins, styles, header, footer };
const _TAX_PERCENTAGE = 0.21;

interface IZone {
	name: string;
	width: number;
	height: number;
	description: string;
	price: number;
}

interface ICampaign {
	duration: number;
	hits: number;
	periodStart: number;
	periodEnd: number;
	price: number;
	coef: number;
	zones: IZone[];
}

export interface IOffer {
	created: number;
	until: number;
	campaigns: ICampaign[];
}

export function getPDFDocument(offer: IOffer): Object {
	const { campaigns } = offer;

	const content = [...getHeader(offer, campaigns[0]), getZonesTable(campaigns[0]), getFooter(_getCalculatePrice(campaigns[0]))];
	const pdfDocument = _createDocument(content);

	return pdfDocument;
}

function _getCalculatePrice(campaign: ICampaign): IPrices {
	const coef = 100 - (campaign.coef * 100);
	const price = campaign.price * campaign.coef;
	const tax = round(price * _TAX_PERCENTAGE);
	const taxedPrice = round(tax + price);

	return {
		price: price,
		coef,
		tax,
		taxedPrice
	};
}

function _createDocument(content: object[]): Object {
	return {
		..._STYLES_AND_COLONTITLES,
		content,
		pageBreakBefore: function(currentNode, followingNodesOnPage) {
			return currentNode.headlineLevel === 1 && followingNodesOnPage.length === 0;
		}
	};
}

export function round(number: number): number {
	return Math.round(number * 100) / 100;
}
