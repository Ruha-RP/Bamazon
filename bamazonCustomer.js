//=====================COMMAND LINE FUNCTIONS======================

//Requiring npm packages
var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("console.table"); 

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
	connection.end();
});




////
// console.table([
//   {//column 1
//     //row:data,
//   }, {//column 2
//     //row:data,
//   }
// ]);

