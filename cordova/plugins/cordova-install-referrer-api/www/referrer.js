module.exports = {
    get: function () {
        return new Promise(function(resolve, reject) {
            cordova.exec(resolve, reject, 'Referrer', 'get');
        });
    }
};