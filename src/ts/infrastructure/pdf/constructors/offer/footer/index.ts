import { tableFooter, IPrices } from "./../../../document/offer";

export function getFooter(prices: IPrices): object {
	return {
		table: {
			widths: [131, 55],
			body: tableFooter(prices)
		},
		margin: [306, -1, 0, 0]
	};
}
