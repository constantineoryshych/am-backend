import { ModelPopulateOptions, DocumentQuery, Document } from "mongoose";

export class Populater {
	protected population: ModelPopulateOptions | ModelPopulateOptions[];

	constructor(population?: ModelPopulateOptions | ModelPopulateOptions[]) {
		this.population = population || [];
	}

	public setDefaultPopulation(population: ModelPopulateOptions | ModelPopulateOptions[]): void {
		this.population = population;
	}

	public applyPopulationIfSpecified<Structure>(
		request: DocumentQuery<Structure[], Document>,
		population?: ModelPopulateOptions | ModelPopulateOptions[]
	): DocumentQuery<Structure[], Document> {
		if (population) return request.populate(population);
		if (this.population) return request.populate(this.population);
		return request;
	}
}
