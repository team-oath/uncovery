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