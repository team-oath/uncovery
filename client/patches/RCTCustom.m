// This file belongs in Xcode > Libraries > React > Base

// Objective-C
#import "RCTBridgeModule.h"
#import <AssetsLibrary/AssetsLibrary.h>
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
    
    CGFloat maxSize = 500.0f;
    
    // Create an ALAssetRepresentation object using our asset
    CGImageRef imageRef = [[asset defaultRepresentation] fullResolutionImage];
    
    // Should we rotate the image?
    UIImageOrientation orientation = UIImageOrientationUp;
    NSNumber* orientationValue = [asset valueForProperty:@"ALAssetPropertyOrientation"];
    if (orientationValue != nil) {
      orientation = [orientationValue intValue];
    }
    
    //Create UIImage reference
    UIImage *img = [UIImage imageWithCGImage:imageRef scale:1 orientation:orientation];

    //Determine new size.
    CGFloat aspect = img.size.width / img.size.height;
    CGSize newSize;
    
    if (img.size.width > img.size.height) {
      newSize = CGSizeMake(maxSize, maxSize / aspect);
    } else {
      // Height is greater.
      // Set width to 500px.
      newSize = CGSizeMake(maxSize * aspect, maxSize);
    }
    
    //UIGraphics to create a new image
    UIGraphicsBeginImageContextWithOptions(newSize, NO, 1.0);
    CGRect newImageRect = CGRectMake(0.0, 0.0, newSize.width, newSize.height);
    [img drawInRect:newImageRect];
    UIImage *newImage = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    
    // Create UIImageJPEGRepresentation from CGImageRef
    NSData *imageData = UIImageJPEGRepresentation(newImage, 0.9);
    
    // Convert to base64 encoded string
    NSString *base64Encoded = [imageData base64EncodedStringWithOptions:0];
    
    //Trigger the callback with our data
    callback(@[base64Encoded, [[NSNumber numberWithFloat:newImage.size.width] stringValue], [[NSNumber numberWithFloat:newImage.size.height] stringValue]]);
    
  } failureBlock:^(NSError *error) {
    NSLog(@"that didn't work %@", error);
  }];
  
}
@end
