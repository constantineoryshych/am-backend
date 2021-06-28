import { Campaign, ICampaignStructure } from "./../index";

const _CAMPAIGN_STRUCTURE: ICampaignStructure = {
	_id: "id",
	name: "Campaign 1",
	duration: 10,
	hits: 20,
	start: 1,
	end: 2,
	coef: 1,
	price: 0,
	avatar: "",
	content: [],
	zones: []
};

describe("Campaign Entity test case", (): void => {
	const campaign = new Campaign(_CAMPAIGN_STRUCTURE);

	it("Name setter and getter", (): void => {
		expect(campaign.name).toBe("Campaign 1");

		campaign.name = "Campaign 2";
		expect(campaign.name).toBe("Campaign 2");
	});

	it("Add zone to Campaign", (): void => {
		campaign.addZone("Zone 1");
		expect(campaign.zones).toContain("Zone 1");
	});

	it("Add many zones to Campaign", (): void => {
		campaign.addManyZones(["Zone 2", "Zone 3"]);
		expect(campaign.zones.length).toBe(3);
	});

	it("Remove zone to Campaign", (): void => {
		campaign.removeZone("Zone 3");
		expect(campaign.zones.length).toBe(2);
	});

	it("Remove many zones to Campaign", (): void => {
		campaign.removeManyZones(["Zone 2", "Zone 1"]);
		expect(campaign.zones.length).toBe(0);
	});

	it("Add content to Campaign", (): void => {
		campaign.addContent("Content 1");
		expect(campaign.content).toContain("Content 1");
	});

	it("Add many content to Campaign", (): void => {
		campaign.addManyContent(["Content 2", "Content 3"]);
		expect(campaign.content.length).toBe(3);
	});

	it("Remove content to Campaign", (): void => {
		campaign.removeContent("Content 3");
		expect(campaign.content.length).toBe(2);
	});

	it("Remove many content to Campaign", (): void => {
		campaign.removeManyContent(["Content 2", "Content 1"]);
		expect(campaign.content.length).toBe(0);
	});
});
