var request = require('request'),
    $ = require('jquery'),
    highlightStyle = "background-color:yellow";

function updateReferences(body) {
    var $html = $(body);
}

function replaceReferentialLinksWithAbsolute(html) {
    return html;
}

function highlightText(body, text) {
    var re = new RegExp(text, 'g');
    return body.replace(
        re, '<span style="' + highlightStyle + '">' + text + '</span>'
    );
}

function highlink(url, text, callback) {
    request.get(url, function(err, response) {
        var absolute = replaceReferentialLinksWithAbsolute(response.body);
        var highlighted = highlightText(absolute, text);
        callback(err, highlighted);
    });
}

module.exports = highlink;