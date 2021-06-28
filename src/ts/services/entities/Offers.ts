import { ARestService } from "../ARestService";
import { IOfferService, IDataAccessObject } from "./../_interfaces";
import { IOffer } from "./../../infrastructure/pdf";
import { Readable } from "stream";

interface IPdfPresenter {
	getReadablePDF(offer: IOffer): Readable;
}

export class OffersService extends ARestService implements IOfferService {
	protected resultFieldContainer: string = "offers";
	private _pdfPresenter: IPdfPresenter;

	constructor(_DAO: IDataAccessObject, PdfPresenter: IPdfPresenter) {
		super(_DAO);
		this._pdfPresenter = PdfPresenter;
	}

	public getAll(): Promise<unknown> {
		const method = this._DAO.getAll({ populate: [{ path: "campaign" }] });
		return this.decorateResult(method);
	}

	public getById(id: string): Promise<unknown> {
		const method = this._DAO.getById(id, { populate: [{ path: "campaign", populate: { path: "zones" } }] });
		return this.decorateResult(method);
	}

	public createOne(item: object): Promise<unknown> {
		const method = this._DAO.createOne(item);
		return this.decorateResult(method);
	}

	public updateById(id: string, item: object): Promise<unknown> {
		const method = this._DAO.updateById(id, item);
		return this.decorateResult(method);
	}

	public updateMany(items: object[]): Promise<unknown> {
		const method = this._DAO.updateMany(items);
		return this.decorateResult(method);
	}

	public removeById(id: string): Promise<unknown> {
		const method = this._DAO.removeById(id);
		return this.decorateResult(method);
	}

	public removeMany(ids: string[]): Promise<unknown> {
		const method = this._DAO.removeManyByIds(ids);
		return this.decorateResult(method);
	}

	public appendRelative({ id, field }: any, entities: string[]): Promise<unknown | null> {
		const method = this._DAO.appendRelative({ id, field }, entities);
		return this.decorateResult(method);
	}

	public removeRelative({ id, field }: any, entities: string[]): Promise<unknown | null> {
		const method = this._DAO.removeRelative({ id, field }, entities);
		return this.decorateResult(method);
	}

	public async getReadableDocument(id: string): Promise<Readable> {
		const offer: any = await this._DAO.getById(id, { populate: [{ path: "campaign", populate: { path: "zones" } }] });
		if (offer == null) throw new Error(`Offer ${id} not found`);
		return this._pdfPresenter.getReadablePDF(offer.toObject() as IOffer);
	}

	public async joinOffers(offersIds: string[]): Promise<unknown> {
		const offers: any[] = await this._DAO.getAll({ _id: { "$in": offersIds }} as any);
		if (!offers) return;
		
		const campaigns: string[] = [];
		for (const offer of offers) {
			campaigns.push(...offer.campaign)
		}

		return this._DAO.createOne({ campaigns }).then((): Promise<any> => {
			return this._DAO.removeManyByIds(offersIds);
		});
	}
}
