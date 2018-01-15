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

//===============================DISPLAYS STORE CONTENTS================================
function readProducts() {

	//READing the database
	connection.query("SELECT * FROM products", function(err, res) {
		//if error occurs
		if (err) throw err;

		//checking if the results are logged
		// console.log("TEST results:\n" + res);

		//gives products information
		console.log("\nItems available at Bamazon:\n")

		//for loop to go throw the whole table
		for (var i = 0; i < res.length; i++) {
			console.log(res[i].item_id + "||" + res[i].product_name + "||" + res[i].department_name + "||" + res[i].price + "||" + res[i].stock_quantity);
			// tableValues = [
			// [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
			// ];

			// //creating a table
			// console.table(["id", "name", "department", "price", "stock"], tableValues);
		};
		console.log("\n");

		//creating a table
		// console.table(["id", "name", "department", "price", "stock"], tableValues);
	
	//calls the next command
	askAction();

	});

};


//=====================================COMMUNICATES WITH USER=====================================

//this function asks the user what they want to buy and how many

function askAction() {

	//uses the inquirer package
	inquirer
		.prompt([
		{
			name:"item",
			type:"input",
			message: "What is the ID of the product you'd like to purchase?",

		},
		{
			name:"quantity",
			type:"input",
			message:"How many would you like to buy?",
			//this function ensures that a number is input
			validate: function(value) {
				if (isNaN(value) === false) {
					return true;
				}
				return false;
			}
		}
		]).then(function(answer) {
			console.log("TEST: working");
		})

}





