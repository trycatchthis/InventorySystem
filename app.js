const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const multer = require('multer');
const upload = multer();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = "mongodb+srv://admin:CCPS530@finalexam.khuib.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const dbName = 'FinalExam';
var db, collection;


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(upload.array()); 


app.get('/', function (req, res) {
	res.sendFile( __dirname + '/index.html');
})


app.listen(3000, function () {
	console.log('Example app listening on port 3000 with MongoDB!')
})

  
MongoClient.connect(url)
	.then(client => {
		console.log('Successfully connected to database')
		db = client.db(dbName)
		collection = db.collection('Inventory')	
	})
	.catch(console.error)


app.get('/inventory/part/add', function (req, res) {
	res.sendFile( __dirname + '/add.html');
})


app.post('/inventory/part/add', function (req, res) {
	console.log(req.body)
 
	collection = db.collection('Inventory'); 
	collection.insertOne(req.body)
		.then(result => {
			res.redirect('/inventory/part/add')
		})
})


app.get('/inventory/part/data', function (req, res) {
	console.log('list from MongoDB')
	var result
	
	collection = db.collection('Inventory'); 
	collection.find().toArray(function (error, result) {
		if(error) {
            return response.status(500).send(error);
        }
		else{
			res.send(result);
		}
	});
})

app.get('/inventory/part/list', function (req, res) {
	res.sendFile( __dirname + '/list.html');
})
