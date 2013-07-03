var express = require('express'),
    highlink = require('./highlink/handler'),
    app = express();

app.get('/highlink', highlink());

app.listen(3000);