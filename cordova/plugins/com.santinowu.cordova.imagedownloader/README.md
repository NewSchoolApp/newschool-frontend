cordova-plugin-imagedownloader
==============================

The cordova plugin for downloading image into gallery.

Supported platforms
-------------------

* iOS
* Android

Installation
------------

```
cordova plugin add cordova-plugin-imagedownloader --variable PHOTOLIBRARY_USAGE_DESCRIPTION="explain why you require accessing Photo"
```

> The variable `PHOTOLIBRARY_USAGE_DESCRIPTION` is only for iOS to explain why you require accessing Photo, defaults to "Requires permission for saving image into Photos".

Usage
-----

Downloads an images from URL.

```js
window.imagedownloader
    .download(
        'http://cordova.apache.org/static/img/cordova_bot.png',
        function successFn() {
            alert('Image was downloaded');
        },
        function failureFn() {
            alert('Fail to download image');
        }
    );
```

License
-------

[MIT](/LICENSE)
