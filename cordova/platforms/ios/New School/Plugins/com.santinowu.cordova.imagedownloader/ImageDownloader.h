#import <Cordova/CDVPlugin.h>

@interface ImageDownloader : CDVPlugin {}

- (void) download:(CDVInvokedUrlCommand*)command;

@end
