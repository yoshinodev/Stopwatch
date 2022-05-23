const express = require('express');
require('dotenv').config()
const bodyParser = require("body-parser");
var mysql = require('mysql');



// Create connection
var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    multipleStatements: true,
    dateStrings: true,
    database : 'codingtestedb'
});

// Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});
module.exports = db;

const app = express();
app.use(express.json());

app.listen(3000, () => console.log('listening at 3000'));

app.use(express.static('../public'));
app.use(express.json({ limit: '1mb' }));

app.post("/create", async (req, res) => {
  const { savedData, date } = req.body;

try{
  db.query(
    "INSERT INTO record (Duration, Day) VALUES (?, ?)",
    [savedData, date],
    (err, results, fields) =>{
      if (err) {
        console.log("Error while inserting a record into the database...", err);
        return res.send();
      }

      return res
      .json({ message: "new record successfully created!" });
    }
  );
} catch (err) {
  console.log(err);
  return res.send();
}
console.log("SUCCESS! NEW RECORD...")
});

