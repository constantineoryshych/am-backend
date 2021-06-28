export {
	CampaignsDAO,
	ConstantsDAO,
	ContentDAO,
	DefaultContentDAO,
	GroupsDAO,
	OffersDAO,
	PlaybacksDAO,
	PlaylistsDAO,
	RatesDAO,
	RolesDAO,
	UsersDAO,
	ZonesDAO
} from "./DAO";

import mongoose, { Mongoose } from "mongoose";

mongoose.set("runValidators", true);
mongoose.Promise = Promise;
const _URL = `mongodb://localhost/`;

export default {
	connect: ({ database, options }: { database: string; options?: mongoose.ConnectionOptions }): Promise<Mongoose> =>
		mongoose.connect(_URL + database, options),
	disconnect: (): Promise<void> => mongoose.disconnect()
};
