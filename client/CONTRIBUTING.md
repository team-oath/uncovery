#Privy
##Frontend Setup

With React Native in its infancy, we currently use version 0.3.11. Newer versions can produce unexpected results.

1. **Clone Repository**  
    `git clone git@github.com:team-oath/uncovery.git`  

2. **Install Dependencies**  
    `npm install`  

3. **Modify Dependencies**  

    You'll notice a 'patches' folder inside 'client'.
        
   1. Manually copy `client/patches/react-native-camera` into `client/node_modules/react-native-camera`
  2. Manually copy `client/patches/RCTCustom.m` into `client/node_modules/react-native/React/Base`  

3. **Xcode Setup**
    1. Open Xcode.  

    2. In the project navigator, right click Libraries ➜ Add Files to "privy". Go to `node_modules/react-native-camera` and add `RCTCamera.xcodeproj`  

    3. In the project navigator, select your project. Add libRCTCamera.a to your project's Build Phases ➜ Link Binary With Libraries.  

    4. Click `RCTCamera.xcodeproj` in the project navigator and go the `Build Settings` tab. Make sure `All` is toggled on (instead of `Basic`). Look for `Header Search Paths` and make sure it contains both `$(SRCROOT)/../react-native/React` and `$(SRCROOT)/../../React` - mark both as recursive.

##Running the application

The application needs to compile before it runs.

**To run in Xcode simulator:**  

Select desired device and click build. The compilation is taken care of for you.
  
**To run on iPhone:**  

1. With WiFi enabled, plug in your device and select it from the device list / active scheme.  

2. Update line 34 of `AppDelegate.m` to use `your machine's IP address` instead of `localhost`.  

3. Click build.

##Submitting the application
You can submit the application to the app store which lets you send the application to beta testers through TestFlight.

1. In terminal, navigate to the `client/` directory. Start the server with `npm start`  

2. In another terminal tab, navigate to the `client/` directory and run: `curl 'http://localhost:8081/index.ios.bundle?dev=false&minify=true' -o iOS/main.jsbundle`

3. Comment out line 34. Uncomment line 37. This tells Xcode to use the newly compiled file. The application is no longer depending on your server.

4. Select `privy` from the Project navigator. Make sure only `portrait` is selected under `device orientation`.

5. Update the version number.

6. Make sure your device is selected from device list / active schema. Click `Product > Archive > Validate` and follow the prompts.

7. If validation is successful, click `Submit to App Store` and follow the prompts.

8. Open iTunes connect. Select `Apps > Privy > Prerelease`. Once the new version appears, turn on `TestFlight Beta Testing`
