// This file belongs in Xcode > Libraries > React > Base

// Objective-C
#import "RCTBridgeModule.h"
#import <AssetsLibrary/AssetsLibrary.h>
#import "RCTCustom.h"
#import <UIKit/UIKit.h>

@interface ReadImageData : NSObject <RCTBridgeModule>
@end

@implementation ReadImageData

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(processString:(NSString *)input callback:(RCTResponseSenderBlock)callback)
{
  
  // Create NSURL from uri
  NSURL *url = [[NSURL alloc] initWithString:input];
  
  // Create an ALAssetsLibrary instance. This provides access to the
  // videos and photos that are under the control of the Photos application.
  ALAssetsLibrary *library = [[ALAssetsLibrary alloc] init];
  
  // Using the ALAssetsLibrary instance and our NSURL object open the image.
  [library assetForURL:url resultBlock:^(ALAsset *asset) {
    
    // Create an ALAssetRepresentation object using our asset
    // and turn it into a bitmap using the CGImageRef opaque type.
    CGImageRef imageRef = [[asset defaultRepresentation] fullResolutionImage];
    
    //Maintain aspect ratio, using maximum width of 500 and maximum height of 500.
    CGFloat ratioHeight = (500.0f / CGImageGetWidth(imageRef));
    CGFloat ratioWidth = (500.0f / CGImageGetHeight(imageRef));
    
    CGFloat ratio = MIN(ratioHeight, ratioWidth);
    
    CGFloat newHeight = ratio * CGImageGetWidth(imageRef);
    CGFloat newWidth = ratio * CGImageGetHeight(imageRef);
    
    UIImageOrientation orientation = UIImageOrientationUp;
    NSNumber* orientationValue = [asset valueForProperty:@"ALAssetPropertyOrientation"];
    if (orientationValue != nil) {
      orientation = [orientationValue intValue];
    }
    
    if (orientation == UIImageOrientationLeft || orientation == UIImageOrientationRight){
      CGFloat temp = newHeight;
      newHeight = newWidth;
      newWidth = temp;
    }
    
    //Draw WxH image on WxH canvas.
    UIImage *img = [UIImage imageWithCGImage:imageRef scale:1 orientation:orientation];
    UIGraphicsBeginImageContext(CGSizeMake(newWidth,newHeight));
    [img drawInRect:CGRectMake(0, 0, newWidth, newHeight)];
    UIImage *destImage = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();

    // Create UIImageJPEGRepresentation from CGImageRef
    NSData *imageData = UIImageJPEGRepresentation(destImage, 1);
    
    // Convert to base64 encoded string
    NSString *base64Encoded = [imageData base64EncodedStringWithOptions:0];
    
    NSString *width = [[NSNumber numberWithFloat:newWidth] stringValue];
    NSString *height = [[NSNumber numberWithFloat:newHeight] stringValue];
    
    //Trigger the callback with our data
    callback(@[base64Encoded,width,height]);
    
  } failureBlock:^(NSError *error) {
    NSLog(@"that didn't work %@", error);
  }];
  
}
@end
