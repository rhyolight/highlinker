var express = require('express'),
    highlink = require('./highlink/handler'),
    app = express();

app.get('/highlink', highlink());

var port = process.env.PORT || 5000;

app.listen(port, function() {
  console.log("Listening on " + port);
});