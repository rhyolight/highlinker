var highlink = require('./highlink');

function highLinkHandler(req, res) {
    highlink(req.query.url, req.query.highlight, function(err, body) {
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('Content-Length', body.length);
        res.end(body);
    });
}

module.exports = function() {
    return highLinkHandler;
};