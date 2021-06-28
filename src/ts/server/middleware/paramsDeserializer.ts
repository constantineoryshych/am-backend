import { Response, Request, NextFunction } from "express";

interface IOperator {
	$in?: string | number[];
	$nin?: string | number[];
	$gte?: string | number;
	$lte?: string | number;
	$gt?: string | number;
	$lt?: string | number;
}

interface IParams {
	fields?: string[];
	sort?: string;
	order?: "asc" | "desc";
	skip?: number;
	limit?: number;
}

interface IParsedParams extends IParams {
	[key: string]: string | number | IOperator | string[] | undefined;
}

export const paramsDeserializer = (req: Request, res: Response, next: NextFunction): void => {
	next();
};

export function parser(url: string): IParsedParams {
	const result: { [key: string]: string } = {};

	const pairs = _getSeparatedPairs(url);

	for (const pair of pairs) {
		_reducePair(result, pair);
	}

	_parseOperators(result);
	return _normiliseTypes(result);
}

function _getSeparatedPairs(params: string): string[] {
	return params.split("&");
}

function _reducePair(memo: IParsedParams, pair: string): IParsedParams {
	const [key, value] = pair.split("=");
	memo[key] = value;
	return memo;
}

function _normiliseTypes(memo: { [key: string]: string }): IParsedParams {
	const result: IParsedParams = {};

	if (memo.limit) {
		result.limit = Number(memo.limit);
		if (Number.isNaN(result.limit)) delete result.limit;
	}

	if (memo.skip) {
		result.skip = Number(memo.skip);
		if (Number.isNaN(result.skip)) delete result.skip;
	}

	if (memo.fields) {
		result.fields = memo.fields.split(",");
	}

	return { ...memo, ...result };
}

function _parseOperators(params): void {
	for (const key in params) {
		const value = params[key] as string;
		const [operator, sequence] = value.split(":");
		// const [operator, sequence] = value.split("%3A");
		if (!sequence) continue;
		params[key] = { [`$${operator}`]: sequence.indexOf(",") > -1 ? sequence.split(",") : sequence } as any;
	}
}
