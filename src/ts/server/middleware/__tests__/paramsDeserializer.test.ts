import { parser } from "../paramsDeserializer";

describe("Deserialiser parameters", (): void => {
	it("pagination", (): void => {
		const _LIMIT = "invalid";
		const _SKIP = "@#";

		const source: string = `skip=${_SKIP}&limit=${_LIMIT}`;
		const { limit, skip } = parser(source);

		expect(limit).toBeUndefined();
		expect(skip).toBeUndefined();
	});

	it("sorting", (): void => {
		const _SORT = "name";
		const _ORDER = "acs";

		const source: string = `sort=${_SORT}&order=${_ORDER}`;
		const { sort, order } = parser(source);

		expect(sort).toBe(_SORT);
		expect(order).toBeUndefined();
	});

	it("select fields", (): void => {
		const _FIELD_NAME = "";
		const _FIELD_TYPE = "";

		const source: string = `fields=${_FIELD_NAME},${_FIELD_TYPE}`;
		const { fields } = parser(source);

		expect(fields).toBeUndefined();
	});

	describe("filtration", (): void => {
		it("in", (): void => {
			const _GROUP_ID1 = "";
			const _GROUP_ID2 = "";

			const source: string = `groups=in:${_GROUP_ID1},${_GROUP_ID2}`;
			const { groups } = parser(source);

			expect(groups).toBeUndefined();
		});

		it("not", (): void => {
			const _GROUP_ID1 = "";
			const _GROUP_ID2 = "";

			const source: string = `groups=nin:${_GROUP_ID1},${_GROUP_ID2}`;
			const { groups } = parser(source);

			expect(groups).toBeUndefined();
		});
	});
});

/**
 * {
 * 	fields: ["name", "type"],
 * 	sort: "name", 
 * 	order: "asc",
 * 	skip: 20,
 * 	limit: 10,
 * 	filters: {
 * 		type: "adv",
 * 		width: {
 * 			$in: [1920, 1080]
 * 		},
 * 		height: {
 * 			$nin: [1920, 1080]
 * 		},
 * 		// $or, $and not yet supported 
 * 		date: { 
 * 			$gte: 123,
 * 			$lt: 223
 * 		}
 * 	}
 * }
 * 
 * 
 * /?fields=name,type&sort=name&order=asc&skip=20&limit=10&filters=
 */
