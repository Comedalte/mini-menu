var colors = require('colors');
var keypress = require('keypress');
var readline = require('readline');


var currentMenu = null;
var rl = null;

// hack variable
var firstmenu = true;
 
keypress(process.stdin);

var menu = function() {

	var obj = {};

	var self = this;

	obj.items = [];
	obj.title = "MENU";
	obj.textcolor = "white";
	obj.color = "blue";

	obj.add = function(title, callback) {
		this.items.push({title: title, callback: callback});
	}
	

	obj.selected = 0;
	

	obj.show = function() {
		rl = readline.createInterface({
		  input: process.stdin,
		  output: process.stdout
		});
		currentMenu = obj;
		if (!firstmenu) {
			first = true;
		} else {
			firstmenu = false;
		}
		obj.print();

	};

	obj.print = function() {
		

		rl.write("                                                \n"[obj.textcolor][bgColor(obj.color)]);
		var title = pad("     "+obj.title,49)+"\n";
		rl.write(title[obj.textcolor][bgColor(obj.color)]);
		rl.write(" ---------------------------------------------- \n"[obj.textcolor][bgColor(obj.color)]);	
		
		for (var i=0; i<obj.items.length; i++) {
			var str = pad(" "+(i+1)+". "+obj.items[i].title)+"\n";
			if (obj.selected == i)
				rl.write(str[obj.color][bgColor(obj.textcolor)]);
			else
				rl.write(str[obj.textcolor][bgColor(obj.color)]);
		}
		
		rl.write("                                                \n"[obj.textcolor][bgColor(obj.color)]);
		rl.write(" \n".white.bgBlack);

	}

	function bgColor(color) {
		return "bg"+color.substring(0,1).toUpperCase()+color.substring(1);
	}

	// hack variable
	var first = true;

	obj.clear = function(up) {
		var extra = 5;
		if (first) {
			first = false;
			extra++;
		}

		readline.moveCursor(rl,0,-1*(extra+obj.items.length+up));
		readline.cursorTo(rl, 0);
		readline.clearScreenDown(rl);		
	}

	function pad(string, padding) {
		if (typeof padding !== "number")
			padding = 49;
		return string + new Array(padding-string.length).join(" ");
	}

	
	
	return obj;
}

// listen for the "keypress" event 
process.stdin.on('keypress', function (ch, key) {

	readline.moveCursor(rl,-1,0);
	readline.clearScreenDown(rl);

	if (key && key.ctrl && key.name == 'c') {
		console.log("\n");
		process.stdin.pause();
	}

	if (key.hasOwnProperty("name") && key.name=="down") {

		if (currentMenu.selected+1<currentMenu.items.length) {
			currentMenu.selected++;
			currentMenu.clear(0);
			currentMenu.print();
		}
		
	}

	if (key.hasOwnProperty("name") && key.name=="up") {
		if (currentMenu.selected>0) 
			currentMenu.selected--;

		currentMenu.clear(0);
		currentMenu.print();

	}

	if (key.hasOwnProperty("name") && key.name=="return") {

		currentMenu.clear();
		rl.close();
		r1 = null;			
		currentMenu.items[currentMenu.selected].callback();
	}

});

process.stdin.setRawMode(true);
process.stdin.resume();

module.exports = exports = menu;