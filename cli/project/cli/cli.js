var readline = require('readline');
var events = require('events');
var e = new events.EventEmitter();
var os = require ("os");
var fs = require("fs");
var path = require("path");
const chalk = require('chalk');

var userPath = path.join(__dirname, "../users");
// console.log(userPath, "path");

// fs.readFile(userPath, (err, data) => {
// 	if(err) console.log(err);
// 	console.log(data, "in read File");
// })

var userData = "";
// ====================================================
// function to read folder and files inside it 
// ====================================================


// fetchUserInfo()

var cli = {};
var width = process.stdout.columns

// padding function
var padding = (char, width) => {
	var space = "";
	var mid = width / 2
	var margin =  Math.floor(mid) - char.length;
	for(var i = 0; i < (margin-20); i++){
		space += " ";
	}
	return space;
}

// verticle line unction
var verticleLine = (val) => {
	for(var i = 0; i < val; i++){
		console.log("")
	}
}

// horizontal line function
var hrLine = (width = 0) => {
	var line = ""
	for(var i = 0; i < width; i++){
		line += "-"
	}
	console.log(line);
}

// centring an text
var center = (width=0, char) => {
	var newchar = " ";
	var newWidth = width - char.length;
	var mid = Math.floor(newWidth / 2);
	for(var i = 0; i <= mid+10; i++){
		newchar += " ";
	}
	newchar += char;
	console.log(newchar)
	return " ";
}

// ===================================================
// help object
// ===================================================
var help = {
	man: "Shows the manual of command",
	date: "sows the current date and time",
	stats: "Show the system specifications",
	help: "shows you the all commands",
	exit: "Exit the server",
	"user-info": "Shows the list of all users"
}

// ===================================================
// event listeners
// ===================================================
e.on("exit", (val) => {
	process.exit(0)
})

e.on("man", (val) => {
	showMan();
})

e.on("help", (val) => {
	var text = "Useful commands"; 
	showMan();
})

e.on("date", (val) => {
	showDate()
})

e.on("stats", (val) => {
	showStats()
})

e.on("list-users", (val) => {
	fetchUserInfo();
})

// ===================================================
// cli methods
// ===================================================
cli.processInput = (val) => {
	var predefined = ["exit", "stats", "man","date", "help", "list-users"];
	var flag = false;
	predefined.some(value => {
		if(val.toLowerCase().indexOf(value) > -1){
			flag = true;
			e.emit(value, val)
		}else return;
	})
	if(!flag){
		console.log("match not found");
	}
}

cli.init = () => {
  console.log('CLI is running');
  // to start cli with prompt
  const rl = readline.createInterface({
	  input: process.stdin,
	  output: process.stdout,
	  prompt:">"
	});
	rl.prompt()
	rl.on("line", (val) => {
		cli.processInput(val);
	})
	rl.prompt()
};

module.exports = cli;

// to get the terminal width
// console.log(process.stdout.columns, "check width");


var showDate = () => {
	var date = new Date().toDateString();
	var time = new Date().toTimeString().split(" ").shift();
	var timeZone = new Date().toTimeString().split(" ").splice(1, 1);
	hrLine(width);
	verticleLine(2)
	console.log(center(width, chalk.red.bold("Current Date")));
	verticleLine(2)
	hrLine(width);
	verticleLine(2)
	console.log(`  ${chalk.blue('date :')} ${chalk.green(padding("date", width))} ${chalk.green(date)}`);
	verticleLine(2)
	console.log(`  ${chalk.blue('time :')} ${chalk.green(padding("time", width))} ${chalk.green(time)}`);
	verticleLine(2)
	console.log(`  ${chalk.blue('timezone :')} ${chalk.green(padding("timezone", width))} ${chalk.green(timeZone)}`);
	verticleLine(2);
}

var showStats = () => {
	hrLine(width);
	verticleLine(2);
	console.log(center(width, chalk.green.bold("Your system status is")));
	verticleLine(2);
	hrLine(width);
	verticleLine(2);
	console.log(`  ${chalk.blue("CPU's :")} ${chalk.green(padding("CPU's", width))} ${chalk.green(os.cpus()[0].model)}`);
	verticleLine(2);
	console.log(`  ${chalk.blue("CPU's :")} ${chalk.green(padding("CPU's", width))} ${chalk.green(os.cpus()[0].speed)}`);
	verticleLine(2);
	console.log(`  ${chalk.blue("Free Memory :")} ${chalk.green(padding("Free Memory", width))} ${chalk.green(os.freemem())}`);
	verticleLine(2);
	console.log(`  ${chalk.blue("Total Memory :")} ${chalk.green(padding("Total Memory", width))} ${chalk.green(os.totalmem())}`);
	verticleLine(2);
	console.log(`  ${chalk.blue("Uptime :")} ${chalk.green(padding("Uptime", width))} ${chalk.green(os.uptime())}`);
	verticleLine(2);
}

// show manual function
var showMan = () => {
	hrLine(width);
	verticleLine(2)
	console.log(center(width, chalk.red.bold("Use man command name for more info")));
	verticleLine(1)
	hrLine(width);

	for (var key in help){
		var space = padding(key, width);
		verticleLine(2);
		console.log(`  ${chalk.blue(key)} ${chalk.blue(":")} ${space} ${chalk.green(help[key])}`);
		verticleLine(2);
	}
	hrLine(width);
	return "";
}


var showUser = (obj) => {
	hrLine(width);
	verticleLine(2)
	console.log(center(width, chalk.darkred.bold("All users")));
	verticleLine(1)
	hrLine(width);

	for (var key in obj){
		var space = padding(key, width);
		verticleLine(2);
		console.log(`  ${chalk.blue(key)}, : ${space}, ${chalk.orange(obj[key])}`);
		verticleLine(2);
	}
	hrLine(width);
	return "";
}


var fetchUserInfo = () => {
	var space = padding("Name", 100);

	// user info header
	hrLine(width);
	verticleLine(2)
	console.log(center(width, chalk.red.bold("User info")));
	verticleLine(2)

	fs.readdir(userPath, (err, files) => {
	  files.forEach(file => {
	    var line = "";
	    var filePath = path.join(userPath,file);
	    fs.readFile(filePath, (err, data) => {
	    	if (err) console.log("error found in reading file");

	    	// always parse the file date because fs will always return string
	   		var user = JSON.parse(data);
	    	line += `  ${chalk.red('Name:')}  ${space} ${chalk.green(user.name)} ${chalk.red("age")}: ${chalk.green(user.age)} ${chalk.red("email")}: ${chalk.green(user.email)} ${chalk.red("country")}: ${chalk.green(user.country)}`;

	    	hrLine(width);
				verticleLine(2)
	    	console.log(line);
	    	verticleLine(2)
	    })
	  });
	});
}