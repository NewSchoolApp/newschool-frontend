# file-downloader
Cordova plugin to download a List of files or a single file to the Phone, check consistency and unzip if necessary (Android and ios)


## install
```
cordova plugin add cordova-plugin-file-downloader
```

## usage

### Initialize the downloader

```javascript
downloader.init({folder: "yourPersistantAppFolder", unzip: true});
```
options:

- **folder**: folder to store downloads in [required]
- **fileSystem**: fileSystem to store downloads in (use cordova.file.* to be platform independent)
- **unzip**: *true* -> unzip after download is enabled [default: *false*]
- **check**: *true* -> md5sum of file is checked after download [default: *false*]
- **delete**: *true* -> delete after unpack a zipfile [default: *true*]
- **noMedia**: *true* -> prevent gallery from scan files on android [default: *true*]
- **wifiOnly**: *true* -> only Download when connected to Wifi, else fires ``DOWNLOADER_noWifiConnection`` event [default: *false*]

### Download single file

```javascript
downloader.get("http://yourhost.de/some.zip");
```

### Download multiple files

```javascript
downloader.getMultipleFiles([
  {url:"http://yourhost.de/some1.zip"},
  {url:"http://yourhost.de/some2.zip"},
  {url:"http://yourhost.de/some3.zip"}
]);
```
### Abort download in progress
You have to re-init downloader after aborting an transfer

```javascript
downloader.abort();
```

### Events
```javascript
document.addEventListener(eventName, function(event){
  var data = event.data;
});

eventNames:
DOWNLOADER_initialized        data:none
DOWNLOADER_gotFileSystem      data:[cordova.fileSystem fileSystem]
DOWNLOADER_gotFolder          data:[cordova.fileEntry folder]
DOWNLOADER_error              data:[object error]
DOWNLOADER_noWifiConnection   data:none
DOWNLOADER_downloadSuccess    data:[cordova.fileEntry entry]
DOWNLOADER_downloadError      data:[object error]
DOWNLOADER_downloadProgress   data:[number percentage, string fileName]
DOWNLOADER_unzipSuccess       data:[string fileName]
DOWNLOADER_unzipError         data:[string fileName]
DOWNLOADER_unzipProgress      data:[number percentage, string fileName]
DOWNLOADER_fileRemoved        data:[cordova.fileEntry entry]
DOWNLOADER_fileRemoveError    data:[cordova.fileEntry entry]
DOWNLOADER_getFileError       data:[object error]
DOWNLOADER_fileCheckSuccess   data:[string md5sum, string fileName]
DOWNLOADER_fileCheckFailed    data:[string calculatedMd5sum, string md5, string fileName])
DOWNLOADER_fileCheckError     data:[object error]
```

## Full Examples

### Download file some.txt to folder testApp
```javascript
downloader.init({folder: "testApp"});
downloader.get("http://yourhost.de/some.txt");
```

### Download file some.txt to folder testApp and give it a new name
```javascript
downloader.init({folder: "testApp"});
downloader.get("http://yourhost.de/some.txt", null, "ohername.txt");
```

### Download file some.zip to testApp, extract it and delete it afterwards
```javascript
downloader.init({folder: "testApp", unzip: true});
downloader.get("http://yourhost.de/some.zip");
```

### Download file some.zip to testApp, extract it and don't delete it afterwards
```javascript
downloader.init({folder: "testApp", unzip: true, delete: false});
downloader.get("http://yourhost.de/some.zip");
```

### Download file some.zip to testApp, check if md5sum matches given string and extract it and delete it afterwards
```javascript
downloader.init({folder: "testApp", unzip: true, check: true});
downloader.get("http://yourhost.de/some.zip", "3f4ea2219aa321ef5cd3143ea33076ab");
```

### Download file abort.zip and abort download, the download another.zip
```javascript
downloader.init({folder: "testApp", unzip: true, check: true});
downloader.get("http://yourhost.de/abort.zip");
downloader.abort();
downloader.init({folder: "testApp", unzip: true, check: true});
downloader.get("http://yourhost.de/another.zip");
```

### Download multiple zip-files to testApp, check if md5sum matches given string and extract it and delete it afterwards
```javascript
downloader.init({folder: "testApp", unzip: true, check: true});
downloader.getMultipleFiles([
  {url: "http://yourhost.de/some1.zip", md5:"1f4ea2219aa321ef5cd3143ea33076ac"},
  {url: "http://yourhost.de/some2.zip", md5:"2f4ea2219aa321ef5cd3143ea33076ad"},
  {url: "http://yourhost.de/some3.zip", md5:"3f4ea2219aa321ef5cd3143ea33076ae"}
]);
```
