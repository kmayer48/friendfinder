// Node Dependencies
var express = require('express');
var path = require('path');

// Set up Express App
var app = express();
var PORT = process.env.PORT || 8080;
app.use(express.static(path.join(__dirname, 'public')));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Server Routing Map 
require('./app/routing/apiRoutes')(app);
require('./app/routing/htmlRoutes')(app);

// Listener - Start the server
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});