import moment from "moment";
import { headerInfo, headerGreeting } from "./../../../document/offer";

interface IOffer {
	created: number;
	until: number;
}

interface ICampaign {
	periodStart: number;
	periodEnd: number;
}

export function getHeader(offer: IOffer, campaign: ICampaign): object[] {
	const offerPeriod = _getOfferPeriod(offer);
	const campaignPeriod = _getCampaignPeriod(campaign);

	return [headerInfo(offerPeriod, "UAB “Jūrmala”"), headerGreeting(campaignPeriod, "Vilnius, Kaunas and Palanga")];
}

function _getOfferPeriod(offer: IOffer): [string, string] {
	const dateCreated = moment.unix(offer.created).format("MM-DD-YYYY HH:mm:ss");
	const dateDuring = moment.unix(offer.until).format("MM-DD-YYYY HH:mm:ss");
	return [dateCreated, dateDuring];
}

function _getCampaignPeriod(campaign: ICampaign): [string, string] {
	const periodStart = moment.unix(campaign.periodStart).format("MM-DD-YYYY HH:mm:ss");
	const periodEnd = moment.unix(campaign.periodEnd).format("MM-DD-YYYY HH:mm:ss");
	return [periodStart, periodEnd];
}
