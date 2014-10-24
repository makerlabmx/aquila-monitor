// aquila-monitor.js

/*
	Command line monitor for the Aquila API
*/

var argv = require("minimist")(process.argv.slice(2));
var argText = "Use: aquila-monitor --url <Hub server url> --user <User name> --password <Password> --verbose\n"

// default config:
var config = {
	url: "http://localhost:8080",
	user: "Admin",
	password: "Admin",
	verbose: false
};

var parseArgs = function(args)
{
	// Show argument help and exit if --help
	if(argv.help)
	{
		console.log(argText);
		process.exit();
	}
	// Show arg help and continue if didnt use any.
	if(!argv.url && !argv.user && !argv.password && !argv.verbose) console.log(argText);

	// get args
	if(argv.verbose) config.verbose = true;
	if(argv.url) config.url = String(argv.url);
	if(argv.user) config.user = String(argv.user);
	if(argv.password) config.password = String(argv.password);

	console.log("Server: ", config.url);
	console.log("User: ", config.user, "\n");
	//console.log("Passwrod:", config.password);
};

parseArgs(argv);

var Aquila = require("aquila-client");
aq = new Aquila(config.url);
var repl = require("repl");
var fs = require("fs");
var path = require("path");

var helpText = "Loading help... try again later.";

// Load help text
fs.readFile(path.resolve(__dirname, "helpText.txt"), "utf8", function(err, data)
	{
		if(err) return console.log("ERROR: ", err.message);

		helpText = data;
	});

help = function()
{
	console.log(helpText);
};

aq.login(config.user, config.password, function(err)
	{
		if(err) return console.log("ERROR: ", err.message);

		if(config.verbose)
		{
			aq.manager.socket.on("deviceAdded", function(){ console.log("\nLOG: Device Added"); });
			aq.manager.socket.on("deviceRemoved", function(){ console.log("\nLOG: Device Removed"); });
			aq.manager.socket.on("event", function(device, eventN, param){ 
					console.log("\nLOG: Got Event from: ", device.name, ", Event: ", eventN, ", Param: ", param);
				});
		}

		console.log("Monitor Ready\nFor help type 'help()'\n");
		repl.start(">");
	});