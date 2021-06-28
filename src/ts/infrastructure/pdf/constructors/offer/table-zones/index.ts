import moment from "moment";
import { tableHeader } from "./../../../document/offer";

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
	zones: IZone[];
}

export function getZonesTable(campaign: ICampaign): object {
	return {
		table: {
			dontBreakRows: true,
			widths: [70, 45, 75, 154, 57, 55],
			body: [tableHeader, ...campaign.zones.map(_getRow.bind(null, campaign))]
		}
	};
}

function _getRow(campaign: ICampaign, zone: IZone): string[] {
	const summaryForZone = _getSumForZone(campaign);
	return [zone.name, `${zone.width}x${zone.height}`, "24/7", zone.description, `${zone.price}`, `${summaryForZone * zone.price}`];
}

function _getSumForZone(campaign: ICampaign): number {
	const { duration, hits, periodStart, periodEnd } = campaign;
	const countHours = moment.unix(periodEnd).diff(moment.unix(periodStart), "hour");
	return countHours * duration * hits;
}
