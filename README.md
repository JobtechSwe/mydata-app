# mydata-app
An example app for managing consents and viewing data

## Prerequisites

### OS X
* Install Android Studio
* Install Watchman `brew install watchman`
* Install React Native cli `npm install -g react-native-cli`

### Linux and Android
* Install Android Studio https://developer.android.com/studio/install
  * In the project directory create the file `android/local.properties` with the content `sdk.dir = /home/USERNAME/Android/Sdk`
  * Approve the licenses of the SDK packages by running ` /home/USERNAME/Android/Sdk/tools/bin/sdkmanager --licenses`
  * If you get `Could not find tools.jar` then you need to point gradle to the JDK installation.
    * You can find it with `2>/dev/null find / -name tools.jar -path "*jdk*"`
    * If you don't have JDK installed then install it
    * Create the file `~/.gradle/gradle.properties` with the line `org.gradle.java.home = /PATH/TO/JDK`
  * Set up the device which will run the app (API Level 26, Android 8.0) https://facebook.github.io/react-native/docs/getting-started.html#preparing-the-android-device
  * Start the device that will run the app from Android Studio, virtual devices are under Tools->AVD Manager
* (Optionally, if you want it to automatically reload on code change) Install Watchman https://facebook.github.io/watchman/docs/install.html#installing-from-source
* Install React Native cli `npm install -g react-native-cli`

## Config
* Create a `.env` in project root with `OPERATOR_URL=http://localhost:3000`
* Run `react-native link react-native-config`

## Run
```bash
react-native run-ios
react-native run-android
```
If the app doesn't open automatically go into apps and find MyData

React debug menu available on ios with ⌘d and on android with ⌘m / ctrl+m
