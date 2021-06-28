import PdfPrinter from "pdfmake";
import { Readable } from "stream";
import { fonts } from "./document/offer";

import { IOffer, getPDFDocument } from "./constructors/offer";

export { IOffer };

export class PdfPresenter {
	private static _PDF = new PdfPrinter(fonts);

	public static createPDF(docDefinition: Object): Readable {
		return PdfPresenter._PDF.createPdfKitDocument(docDefinition);
	}

	public static getReadablePDF(offer: IOffer): Readable {
		let document = getPDFDocument(offer);
		return PdfPresenter.createPDF(document);
	}
}
