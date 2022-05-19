const express = require('express');
const bodyParser = require("body-parser");
var mysql = require('mysql');



// Create connection
var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    multipleStatements: true,
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


app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('../public'));
app.use(express.json({ limit: '1mb' }));
app.use(bodyParser.json());

//let data = "INSERT into codingData(savedData, date) VALUES ('duration', 'day')";
/*app.get('/', (request, response) => {
  db.query("SELECT * FROM record",
  (err, results, fields) => {
      if (!err) {
        res.send(results);
      } else {
        console.log(err);
      }
    }
  );
});
app.post("/", (req, res) => {
  let bro = req.body;
  const data =
    "SET @ID = ?;SET @Duration = ?;SET @Day = ?;";
  db.query(
    data,
    [
      bro.ID,
      bro.Duration,
      bro.Day,
    ],
    (err, result, fields) => {
      if (err) { 
        throw err;}
      console.log("aqui esta a funcionar parcialmente");
      }
  );
});*/
 app.post('/api', (request, response) => {
  const data = request.body;
  response.json(data);
  db.query(data, (err, result) => {
    if(err) {
        response.status(500);
    } else {
      response.send(data);
    }
});
});
