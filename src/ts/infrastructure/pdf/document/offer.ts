const _FONTS_DIR = process.cwd() + "/public/frontend/style/fonts";
const _LOGO_PATH = process.cwd() + "/public/photo_2019-03-21_16-43-55.jpg";

export interface IPrices {
	price: number;
	tax: number;
	taxedPrice: number;
	coef: number;
}

export const fonts = {
	Roboto: {
		normal: _FONTS_DIR + "/Ubuntu-Regular.ttf",
		bold: _FONTS_DIR + "/Ubuntu-Bold.ttf",
		italics: _FONTS_DIR + "/Ubuntu-Italic.ttf",
		bolditalics: _FONTS_DIR + "/Ubuntu-BoldItalic.ttf",
		light: _FONTS_DIR + "/Ubuntu-Light.ttf"
	}
};

export const pageMargins = [40, 60, 40, 35];

export const styles = {
	headerText: {
		fontSize: 14,
		light: true
	},
	tableHeader: {
		bold: true,
		fontSize: 13,
		color: "black"
	}
};

export const logo = {
	image: _LOGO_PATH,
	fit: [100, 100],
	alignment: "right",
	margin: [0, 25, 15, 0]
};

export const headerInfo = ([periodstart, periodEnd]: [string, string], to: string) => {
	return {
		text: [
			`ADVERTISING CAMPAIGN COMMERCIAL OFFER \n
			Offer generated on ${periodstart}, offer valid it ${periodEnd} \n
			From: VĮ Lietuvos oro uostai \n
			To: ${to}`
		],
		style: "headerText"
	};
};

export const headerGreeting = ([periodstart, periodEnd]: [string, string], receiver: string) => {
	return {
		alignment: "justify",
		columns: [
			{
				text: [
					`Hello,\n\nThis is automatically generated offer 
					for advertising campaign for Vilnius, ${receiver} airports 
					during period ${periodstart} to ${periodEnd}.`
				],
				margin: [0, 25, 20, 30]
			}
		],
		style: "subHeader"
	};
};

export const tableHeader = [
	"Advertising Placement number.",
	"Size",
	"Impresions / display time",
	"Advertising placement location",
	// "Price for one month excl. VA",
	"Price for one hit with default duration",
	"Price for whole period excl. VAT"
].map((columnName: string) => ({
	text: columnName,
	style: "tableHeader"
}));

export const tableFooter = ({ price, tax, taxedPrice, coef }: IPrices) => {
	return [
		["Addition coef:", coef + "%" ],
		["Suma (be PVM):", price],
		["PVM (21%):", tax],
		["Suma su PVM:", taxedPrice]
	].map(([text, value]: [string, string]) => [
		{
			text,
			style: "tableHeader"
		},
		value
	])
};

export const footer = {
	columns: [
		{
			text: "Valstybės įmonė\nRodūnios kelias 10A\n02189 Vilnius"
		},
		{
			text: "Tel. (8 5) 273 9326\nFaks. (8 5) 232 9122\nEl. p. info@ltou.lt\nwww.ltou.lt"
		},
		{
			text: "Duomenys kaupiami ir saugomi\nJuridinių asmenų registre\nKodas 120864074"
		}
	],
	margin: [40, -35]
};
