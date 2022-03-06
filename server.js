const express = require('express');
const app = express();

app.listen(3000, function() {
    console.log('listening on 3000')
  })

// We normally abbreviate `request` to `req` and `response` to `res`.
app.get('/',  (req, res) => {
    // do something here
    //res.send('Hello World')
    res.sendFile(__dirname + '/index.html')


  })