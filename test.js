var menuCreator = require('./menu');

var menu = menuCreator();
menu.title = "MINI-MENU";
menu.color = "green";
menu.add("Option one", function() { 
	console.log("Option one");
	menu.show();
});
menu.add("To submenu", function() { 
	submenu.show();
});
menu.add("Exit", function() { console.log("Goodbye")});


var submenu = menuCreator();
submenu.title = "SUBMENU";
submenu.color = "white";
submenu.textcolor = "red";
submenu.add("Token", function() { console.log("Hello"); submenu.show(); });
submenu.add("Exit", function() { 
	menu.show(); 
});


menu.show();