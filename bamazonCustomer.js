//=====================COMMAND LINE FUNCTIONS======================

//Requiring npm packages
var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("console.table"); 

var tableValues;

//Establishing connection
var connection = mysql.createConnection ({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "root",
	database: "bamazon_db"
});

connection.connect(function(err) {
	//throws error if occurs
	if(err) throw err;
	//checking if connected
	console.log("Connected as ID: " + connection.threadId);
	//ending connection
	// connection.end();
	//reading the table initially
	readProducts();
});

//The start function:Displays table, then ask questions

function readProducts() {
	console.log("Items in Store: \n");

	//READing the database
	connection.query("SELECT * FROM products", function(err, res) {
		//if error occurs
		if (err) throw err;

		//checking if the results are logged
		// console.log("TEST results:\n" + res);

		//for loop to go throw the whole table
		for (var i = 0; i < res.length; i++) {
			// console.log(res[i].item_id + "||" + res[i].product_name + "||" + res[i].department_name + "||" + res[i].price + "||" + res[i].stock_quantity);
			tableValues = [
			[res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
			];

			//creating a table
			console.table(["id", "name", "department", "price", "stock"], tableValues);
		};

		//creating a table
		// console.table(["id", "name", "department", "price", "stock"], tableValues);

	});
	//terminating connection
	connection.end();

};




