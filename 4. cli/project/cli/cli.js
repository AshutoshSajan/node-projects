var readline = require('readline');
var events = require('events');
var e = new events.EventEmitter();
var os = require ("os");

var cli = {};
var width = process.stdout.columns

console.log("os.cpus()", os.uptime(), os.tmpdir(), os.freemem);

// padding function
var padding = (char) => {
	var space = "";
	var margin =  50 - char.length;
	for(var i = 0; i < margin; i++){
		space += " ";
	}
	return space;
}

// padding("hello", width);

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
var center = (width=0, char="") => {
	newchar = char;
	var newWidth = width - char.length;
	var mid = Math.floor(newWidth / 2);
	for(var i = 0; i <= mid; i++){
		newchar = " " + newchar;
	}
	console.log(newchar)
	return "";
}

// manual function
var showMan = () => {
	hrLine(width);
	verticleLine(2)
	console.log(center(width, "Use man command name for more info"));
	verticleLine(1)
	hrLine(width);

	for (var key in help){
		var space = padding(key);
		verticleLine(2);
		console.log(key, space, help[key]);
		verticleLine(2);
	}
	hrLine(width);
	return "";
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
	console.log(val, "in exit event listener")
	process.exit(0)
})

e.on("man", (val) => {
	console.log(val, help, "in man event listener")
	showMan();
})

e.on("help", (val) => {
	var text = "Useful commands"; 
	showMan();
})

e.on("date", (val) => {
	console.log(new Date, val, "in date event listener")
	showDate()
})

e.on("stats", (val) => {
	// console.log(val, "in stats event listener")
	showStats()
	os.cpus()
})

e.on("list-users", (val) => {
	console.log("in list-users event listener")
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
	console.log(center(width, "Current Date"));
	verticleLine(2)
	hrLine(width);
	verticleLine(2)
	console.log(`date : ${padding("date")} ${date}`);
	verticleLine(2)
	console.log(`time : ${padding("time")} ${time}`);
	verticleLine(2)
	console.log(`timezone : ${padding("timezone")} ${timeZone}`);
	verticleLine(2);
}

var showStats = () => {
	// padding(date);
	hrLine(width);
	verticleLine(2)
	console.log(center(width, "Your system status is"));
	verticleLine(2)
	hrLine(width);

	verticleLine(2)
	console.log(`cpus : ${padding("cpus")} ${"sadssdfsd"}`);
	verticleLine(2)
	console.log(`free memory : ${padding("free memory")} ${"dsfsdfsdfsd"}`);
	verticleLine(2)

	// var  = new Date().toTimeString().split(" ").splice(1, 1)
}