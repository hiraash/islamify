Package.describe({
	name: "velocity:test-proxy",
	summary: "Dynamically created package to expose test files to mirrors",
	version: "0.0.4",
	debugOnly: true
});

Package.on_use(function (api) {
	api.use("coffeescript", ["client", "server"]);
	api.add_files("tests/mocha/client/app-test.js",["client"]);
	api.add_files("tests/mocha/client/route-test.js",["client"]);
	api.add_files("tests/mocha/server/server-test.js",["server"]);
});