//=====================COMMAND LINE FUNCTIONS======================

//Requiring npm packages
var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("console.table"); 
var chalk = require("chalk");

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
	// console.log("Connected as ID: " + connection.threadId);

	console.log(chalk.bgYellow("\nWELCOME TO BAMAZON!\n"));

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
		console.log(chalk.yellow("\nOur Products:\n"));

		//for loop to go throw the whole table
		for (var i = 0; i < res.length; i++) {

			//displays items to customer
			console.log(chalk.cyan(res[i].item_id + "||" + res[i].product_name + "||" + res[i].department_name + "||" + res[i].price));
			
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
				message:"What is the ID of the product you'd like to purchase?",
				
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
				message: "How many would you like to buy?",
				
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
				// console.log("TEST: working");

//===========================================CORRESPONDING WITH DATABASE====================================

				//obtaining the index (hence the -1) that will extract the product name & other properties
				var chosenId = answer.itemid - 1;

				//this will assign a variable to contain the customer's product
				var selectedProductDetails = res[chosenId];

				//checking if it works, output in form of an object
				// console.log(selectedProductDetails);

//===========================================PURCHASE CONDITIONS====================================

				//checking if user's quantity input is registered
				// console.log("Quantity selected by customer: " + answer.quantity)

				//An if else statement to check product availability
				if (answer.quantity <= selectedProductDetails.stock_quantity) {

					console.log(chalk.magenta("\nCongratulations on your purchase(s)!\n"));

//===========================================UPDATE INVENTORY====================================
					
					//creating a new global variable that will hold the new value
					var updatedStock;

					//the function that minus sold goods from unsold
					function updateStock() {
						updatedStock = selectedProductDetails.stock_quantity - answer.quantity;
					};

					//calling the function
					updateStock();


					//updating the databse to reflect changes
					connection.query(
						"UPDATE `bamazon_db`.`products` SET ? WHERE ?",
						[{
							stock_quantity: updatedStock
						}
						,{
							item_id: answer.itemid
						}]
					)

				}

				else {

					//informs user about unavailability
					console.log(chalk.red("Insufficient Quantity!\n"));
				}

				askAgain();

			});
				

		});

};

//======================================NEXT STEPS=========================================================

//This function asks the user what they want to do after their initial input
function askAgain() {

  inquirer
    .prompt({
      name: "nextSteps",
      type: "list",
      message: "Would you like to continue shopping?",
      choices: ["YES", "NO"]
    })
    .then(function(answer) {
      
      if (answer.nextSteps.toUpperCase() === "NO") {

        console.log(chalk.yellow("\nHope you had a pleasant experience. Come again soon!\n"));

        //turns off the connection from db
        connection.end();
      }

      else {

      	//the first function is called again
      	readProducts();


      } 

    });
}















