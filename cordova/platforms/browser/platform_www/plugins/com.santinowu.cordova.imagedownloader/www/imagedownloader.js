cordova.define("com.santinowu.cordova.imagedownloader.imagedownloader", function(require, exports, module) { var exec = require('cordova/exec'),
    ImageDownloader = function () {};

ImageDownloader.prototype.download = download;

module.exports = new ImageDownloader();

/**
 * Invoke plugin for downloading image from URL
 *
 * @param {String} url
 * @param {Function} successFn
 * @param {Function} failureFn
 */
function download(url, successFn, failureFn) {
    exec(successFn, failureFn, 'ImageDownloader', 'download', [ url ]);
}

});
