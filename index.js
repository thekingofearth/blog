var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
  extended: true
}))


//
// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://aayush:test1234@cluster0.ndxjj.mongodb.net/mydb";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("mydb").collection("users");
//   // perform actions on the collection object
//   client.close();
// });

mongoose.connect('mongodb+srv://aayush:test1234@cluster0.ndxjj.mongodb.net/mydb',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var db = mongoose.connection;

db.on('error', ()=>console.log("Error in connection to Database"))
db.once('open', ()=>console.log("Connected to Database"))

app.post("/signup", (req, res)=>{
    var email = req.body.email;
    var feedback = req.body.feedback;


    var data = {
        "email": email,
        "feedback": feedback,
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Added Successfully");
    });

    return res.redirect('subscribe_success.html')
})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}


app.get("/", (req, res)=>{

    res.set({
        "Allow-access-Allow-Origin": "*"
    })
    return res.redirect('index.html');
}).listen(port);

console.log("listening on port 3000");
