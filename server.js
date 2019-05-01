//Install express server
const express = require('express');
const path = require('path');

const app = express();

const port = process.env.PORT || 8080

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist'));

/*app.get('/!*', function(req,res) {

  res.sendFile(path.join(__dirname+'/dist/index.html'));
});

app.get('*', function(req, res){
  res.sendFile(__dirname + '/app/index.html', res);
});*/


app.get('/*', function(req, res){
  res.sendFile(__dirname + '/dist/index.html', res);
});

/*app.get('/dist/:file', function(req, res){
  res.sendFile(__dirname + '/'+req.params.file, res);
});*/

// Start the app by listening on the default Heroku port
app.listen(port);
