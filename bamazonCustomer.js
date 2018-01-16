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

	connection.query("SELECT * FROM products", function(err,res) {

		//uses the inquirer package
		inquirer
			.prompt([
			{
				name:"itemid",
				type:"input",
				message: "What is the ID of the product you'd like to purchase?",
				//this function ensures that a number is input
				validate: function(value) {
					if (isNaN(value) === false) {
						return true;
					}
					return false;
				}
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

				//Checking if its working
				console.log("TEST: working");

//===========================================CORRESPONDING WITH DATABASE====================================

				//obtaining the index (hence the -1) that will extract the product name & other properties
				var chosenId = answer.itemid - 1;

				//this will assign a variable to contain the customer's product
				var selectedProductDetails = res[chosenId];

				//checking if it works, output in form of an object
				console.log(selectedProductDetails);

//===========================================PURCHASE CONDITIONS====================================

				//checking if user's quantity input is registered
				console.log("Quantity selected by customer: " + answer.quantity)

				//An if else statement to check product availability
				if (answer.quantity <= selectedProductDetails.stock_quantity) {

					console.log("Congratulations on your purchase(s)!");


					//updating the databse to reflect changes
					connection.query(
						"UPDATE `bamazon_db`.`products` SET ? WHERE ?",
						[{
							stock_quantity: parseInt(answer.quantity)
						}
						,{
							item_id: answer.itemid
						}]
					)


				}

				else {

					//informs user about unavailability
					console.log("Insufficient Quantity!");
				}

				
			});
				

			// connection.end();

		});

};

//===========================================UPDATE INVENTORY====================================









