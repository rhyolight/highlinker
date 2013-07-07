var request = require('request'),
    jsdom = require('jsdom'),
    highlightStyle = "background-color:yellow";

function updateReferences(url, cb) {
    // $('html').html('');
    // var html = $(page).find('html').html();
    // $(html).appendTo('html');
    // console.log($('html').html());
    jsdom.env({
        url: url,
        scripts: ['http://code.jquery.com/jquery-1.5.min.js'],
        done: function (err, window) {
            if (err) throw err;
            var $ = window.jQuery;
            var $html = $('html');
            // jQuery is now loaded on the jsdom window created from 'agent.body'
            replaceReferentialLinksWithAbsolute($, $html, url);
            cb('<html>' + $html.html() + '</html>');
        }
    });
}

function replaceReference($el, attr, ref, url) {
    var baseUrl;
    
    if (! ref) return;
    
    baseUrl = url.split('/').slice(0, 3).join('/');
    // If this is an absolute reference to the base URL...
    if (ref.indexOf('/') == 0) {
        var newHref = baseUrl + ref;
        console.log('changing ' + ref + ' to ' + newHref);
        $el.attr(attr, newHref);
    }
}

function replaceReferentialLinksWithAbsolute($, $html, url) {
    $html.find('link, a, script').each(function() {
        var $el = $(this);
        var href = $el.attr('href');
        var src = $el.attr('src');
        replaceReference($el, 'href', href, url);
        replaceReference($el, 'src', src, url);
    });
}

function highlightText(body, text) {
    var re, 
        count = 1,
        out = body;
    if (text) {
        re = new RegExp(text, 'g');
        out = body.replace(
            re, function(match, p1, p2, p3, offset, string) {
                return '<span id="highlink-' + (count++) + '" style="' + highlightStyle + '">' + match + '</span>'
            }
        );
    }
    return out;
}

function highlink(url, text, callback) {
    // request.get(url, function(err, response) {
        updateReferences(url, function(body) {
            var highlighted = highlightText(body, text);
            callback(null, highlighted);
        });
    // });
}

module.exports = highlink;