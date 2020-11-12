# file-md5
Cordova MD5 checksum plugin for Android and iOS. The plugin reads large files in chunks and build the md5sum incrementally. It can process much larger files then read the complete content in memory and process it in place.

## install
```
cordova plugin add cordova-plugin-file-md5
```

## usage
``fileEntry`` is a ``org.apache.cordova.file.FileEntry``
```
function win(md5sum){
    console.log("MD5SUM: " + md5sum);
}
function fail(error){
    console.log("Error-Message: " + error);
}
md5chksum.file(fileEntry, win, fail);
```
