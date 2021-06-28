import { parser } from "../paramsDeserializer";

describe("Deserialiser parameters", (): void => {
	it("pagination", (): void => {
		const _LIMIT = 10;
		const _SKIP = 20;

		const source: string = `skip=${_SKIP}&limit=${_LIMIT}`;
		const { limit, skip } = parser(source);

		expect(limit).toBe(_LIMIT);
		expect(skip).toBe(_SKIP);
	});

	it("sorting", (): void => {
		const _SORT = "name";
		const _ORDER = "asc";

		const source: string = `sort=${_SORT}&order=${_ORDER}`;
		const { sort, order } = parser(source);

		expect(sort).toBe(_SORT);
		expect(order).toBe(_ORDER);
	});

	it("select fields", (): void => {
		const _FIELD_NAME = "name";
		const _FIELD_TYPE = "type";

		const source: string = `fields=${_FIELD_NAME},${_FIELD_TYPE}`;
		const { fields } = parser(source);

		expect(fields.length).toBe(2);
		expect(fields).toContain(_FIELD_NAME);
		expect(fields).toContain(_FIELD_TYPE);
	});

	describe("filtration", (): void => {
		it("in", (): void => {
			const _GROUP_ID1 = "group_some_id";
			const _GROUP_ID2 = "group_some_id";

			const source: string = `groups=in:${_GROUP_ID1},${_GROUP_ID2}`;
			const { groups } = parser(source);

			expect(groups["$in"]).toContain(_GROUP_ID1);
			expect(groups["$in"]).toContain(_GROUP_ID2);
		});

		it("not", (): void => {
			const _GROUP_ID1 = "group_some_id";
			const _GROUP_ID2 = "group_some_id";

			const source: string = `groups=nin:${_GROUP_ID1},${_GROUP_ID2}`;
			const { groups } = parser(source);

			expect(groups["$nin"]).toContain(_GROUP_ID1);
			expect(groups["$nin"]).toContain(_GROUP_ID2);
		});

		it("gte", (): void => {
			const _GTE = "123"; 

			const source: string = `date=gte:${_GTE}`;
			const { date } = parser(source);
			expect(date["$gte"]).toBe(_GTE);
		});

		it("lt", (): void => {
			const _LT = "123"; 

			const source: string = `date=lt:${_LT}`;
			const { date } = parser(source);
			expect(date["$lt"]).toBe(_LT);
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
