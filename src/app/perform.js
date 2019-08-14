
// perform.js
// Capture performance metrics.

const PERFORM = true; // eslint-disable-line
let TRACK_AREA = 'cellTypeGene' // only record timings for this area
let BROWSER = false; // true = log browser info

var startTime = 1706190000000;
var prevTime =  1706190000000;

exports.log = function (msg, area=null, reset=false) {
    if (!PERFORM) { return; }
    if (area !== TRACK_AREA) { return; }

    if (reset) { startTime = prevTime = Date.now() }
    var now = Date.now();
    console.error(now - prevTime, now - startTime, msg);
    prevTime = now
};

exports.init = function (area=null) {
    if (!PERFORM) { return; }
    console.error('init:area:', area)
    if (area !== TRACK_AREA) { return; }

    var date = new Date().toString();
    startTime = prevTime = Date.now();
    exports.log('0-init:begin');

    var meta = {
        date: date.slice(4, (date.indexOf('GMT') - 4)),
        appVersion: '"' + navigator.appVersion + '"',
        userAgent: '"' + navigator.userAgent + '"',
        platform: navigator.platform,
        language: navigator.language,
    };

    if (BROWSER) {
        // Output each metadata piece.
        meta.forEach(meta, function(val, key) {
            console.log(key + ',' + val);
        });
    }
};
