import { PlaylistParser } from "./../PlaylistParser";

describe("Playlist Parser specification", (): void => {

	describe("Parse single campaign", (): void => {
		const parser = new PlaylistParser({
			sequence: ["contentId", 5, "contentId", 5],
			duration: 10,
			BLOCK_SIZE: 10,
			content: {
				default: { name: "defaultContent" },
				contentId: {
					name: "imageContent.jpg"
				}
			}
		});
		
		beforeAll((): void => {
			parser.parse();
		})
		
		it("result not empty", (): void => {
			const result: any[] = parser.getResult() as any[];
			expect(result.length).toBeGreaterThan(0);
		});

		it("summary duration", (): void => {
			const SUMMARY = 12;
			const result: any[] = parser.getResult() as any[];
			expect(result.length).toBe(SUMMARY);
		});

		it("order", (): void => {
			const result: any[] = parser.getResult() as any[];

			for (const key in result) {
				if (Number(key) == 0 || Number(key) == 6) expect(result[key].picture).toBe("imageContent.jpg");
				else expect(result[key].picture).toBe("defaultContent");
			}
		});
	})
});
