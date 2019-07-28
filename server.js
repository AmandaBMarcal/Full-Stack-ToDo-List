const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient //Interacting with MongoDB

var db, collection;

const url = "mongodb+srv://amandavbm7:amandavbm7@cluster0-kqimt.mongodb.net/test?retryWrites=true&w=majority";
const dbName = "ToDo_List";

// let userLikes = [] // My array of user likes


app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))


app.get('/', (req, res) => {
  //console.log(db)
  var todoList = db.collection('ToDo_List').findOne().then(function (todoList, err) {
    if (err) return console.log(err)
    res.render('index.ejs', {todoList: todoList})
  })
})

app.put('/setList', (req, res) => {     // Add to List
  db.collection('ToDo_List')   //collection in the todo list
  .findOneAndUpdate({name: req.body.name}, {
    $set: {
      list: req.body.list
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})



// Make a post request that creates a list for you


// Every submit is creating an individual doc in the database
