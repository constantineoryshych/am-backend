// FIXME: type declaration
export default {
	env: "development",
	host: "localhost",
	port: 9009,
	db: {
		database: "am",
		options: { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }
	},
	thumb: {
		path: process.cwd() + "/existent/thumbnail/",
		resolution: {
			width: 100,
			height: 100
		},
		quality: 20
	},
	original: {
		path: process.cwd() + "/existent/origin/",
		inner: "/existent/origin/"
	},
	ftp: null,
	ftpToggle: false
};
