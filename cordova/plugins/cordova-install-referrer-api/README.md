Cordova Play Install Referrer API
========================

This plugin captures the referrer value passed when an android app is installed using [Play Install Referrer API](https://developer.android.com/google/play/installreferrer/overview.html).

## Install

`cordova plugins add cordova-install-referrer-api`

## Usage

```javascript
cordova.plugins.referrer.get().then((referrer) => {
    console.log(referrer);
    
    // Result:
    // {
    //     clickTimestamp: 0,
    //     installBeginTimestamp: 0,
    //     referrer: "utm_source=google-play&utm_medium=organic"
    // }    
}).catch((error) => {
    console.error(error);
    
    // Result:
    // {
    //     error: 1
    // }
});
```