var express = require("express"),
	http = require("http"),
	app = express(),
	toDos = [
		{
			"text" : "Started From The Bottom",
			"tags" : ["rap", "Drake"]
		},
		{
			"text" : "Dolla Dolla Bill Yall",
			"tags" : ["rap", "Wu-Tang"]
		},
		{
			"text" : "Beat it!",
			"tags" : ["pop", "Michael Jackson"]
		},
		{
			"text" : "Started From The Bottom",
			"tags" : ["rap", "Drake"]
		},
		{
			"text" : "Windows Shopper",
			"tags" : ["rap", "50 cent"]
		},
		{
			"text" : "Beat it!",
			"tags" : ["pop", "Michael Jackson"]
		},
		{
			"text" : "TNT",
			"tags" : ["rock", "AC/DC"]
		}
	]
	app.use(express.static(__dirname + "/client"));
	http.createServer(app).listen(3000);
	app.get("/todos.json", function(req, res) {
		res.json(toDos);
	});
	app.post("/todos.json", function(req, res) {
		console.log("Data was send to server!");
		res.json({"message":"You locate on server!"});
	});