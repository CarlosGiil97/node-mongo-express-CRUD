const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient

const app = express();
app.set('view engine', 'ejs')

const connectionString = "mongodb+srv://carlos_test:2rV-jpFeK5T9Vnv@cluster0.3k8lr.mongodb.net/Cluster0?retryWrites=true&w=majority"

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')

    app.post('/quotes', (req, res) => {
      quotesCollection.insertOne(req.body)
        .then(result => {
          res.redirect('/list')
        })
        .catch(error => console.error(error))
    })

    app.get('/list', (req, res) => {
      db.collection('quotes').find().toArray()
        .then(results => {
          res.render('index.ejs', { quotes: results })
        })
        .catch(error => console.error(error))
      // ...
    })

  })
  .catch(error => console.error(error))

// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(3000, function() {
    console.log('listening on 3000')
  })

// // We normally abbreviate `request` to `req` and `response` to `res`.
app.get('/',  (req, res) => {
    // do something here
    //res.send('Hello World')
    res.sendFile(__dirname + '/index.html')
  })

// app.post('/quotes', (req, res) => {
//   console.log(req.body)
// })