# @beratkara/react-native-jitsi-meet
React native wrapper for Jitsi Meet SDK

## Important notice

Jitsi Meet SDK is a packed React Native SDK. Running react-native-jitsi-meet will run this React Native SDK inside your React Native app. We know that this is suboptimal but sadly we did not find any other solution without massive rewrite of Jitsi Meet SDK. Compatibility with other libraries used internally by Jitsi Meet SDK might be broken (version mismatch) or you might experience performance issues or touch issues in some edge cases.

## Install

`npm i @beratkara/react-native-jitsi-meet` 

## Use (react-native: >= "0.60")

The following component is an example of use:

```
import React, { useEffect } from 'react';
import { View } from 'react-native';
import JitsiMeet, { JitsiMeetView } from '@beratkara/react-native-jitsi-meet';

const VideoCall = () => {
  const onConferenceTerminated = (nativeEvent) => {
    /* Conference terminated event */
  }

  const onConferenceJoined = (nativeEvent) => {
    /* Conference joined event */
  }

  const onConferenceWillJoin= (nativeEvent) => {
    /* Conference will join event */
  }

  useEffect(() => {
    setTimeout(() => {
      const url = 'https://meet.jit.si/react-native'; // can also be only room name and will connect to jitsi meet servers
      const userInfo = { displayName: 'User', email: 'user@example.com', avatar: 'https:/gravatar.com/avatar/abc123' };
      const options = {
        audioMuted: false,
        audioOnly: false,
        videoMuted: false,
        subject: "your subject",
        token: "your token jwt"
      };
      const audioOptions = {
        subject: "your subject",
        token: "your token jwt"
      };
      const meetFeatureFlags = {
        addPeopleEnabled: true,
        calendarEnabled: true,
        callIntegrationEnabled: true,
        chatEnabled: true,
        closeCaptionsEnabled: true,
        inviteEnabled: true,
        androidScreenSharingEnabled: true,
        liveStreamingEnabled: true,
        meetingNameEnabled: true,
        meetingPasswordEnabled: true,
        pipEnabled: true,
        kickOutEnabled: true,
        conferenceTimerEnabled: true,
        videoShareButtonEnabled: true,
        recordingEnabled: true,
        reactionsEnabled: true,
        raiseHandEnabled: true,
        tileViewEnabled: true,
        toolboxAlwaysVisible: false,
        toolboxEnabled: true,
        welcomePageEnabled: false,
      };
      JitsiMeet.call(url, userInfo, options, meetFeatureFlags);
      /* You can also use JitsiMeet.audioCall(url, userInfo, audioOptions, meetFeatureFlags) for audio only call */
      /* You can programmatically end the call with JitsiMeet.endCall() */
    }, 500);
  }, [])

  return (
    <View style={{ backgroundColor: 'black', flex: 1 }}>
        <JitsiMeetView
            onConferenceTerminated={onConferenceTerminated}
            onConferenceJoined={onConferenceJoined}
            onConferenceWillJoin={onConferenceWillJoin}
            style={{flex: 1, height: '100%', width: '100%'}}
        />
    </View>
  )
}

export default VideoCall;
```

### Events

You can add listeners for the following events:
- onConferenceJoined
- onConferenceTerminated
- onConferenceWillJoin


### Changes I made to run on version 0.63.4

## Android Install

```
I removed the codepush plugin because I couldn't run it with codepush .
```

1.) In `package.json`, add/replace the following lines:

```
"release-build": "rm -rf android/app/src/main/assets/app.bundle && react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/app.bundle --assets-dest android/app/build/intermediates/res/merged/release/ && rm -rf android/app/src/main/res/drawable-* && rm -rf android/app/src/main/res/raw/* && cd android && ./gradlew assembleRelease && cd ..",
"debug-build": "rm -rf android/app/src/main/assets/app.bundle && react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/app.bundle --assets-dest android/app/src/main/res/ && cd android && ./gradlew assembleDebug && cd .."
```

2.) In `android/build.gradle`, add/replace the following lines:

```
buildscript {
    ext {
        buildToolsVersion = "30.0.2"
        minSdkVersion = 24
        compileSdkVersion = 30
        targetSdkVersion = 30
        googlePlayServicesAuthVersion = "19.0.0"
        kotlinVersion = "1.4.31"
        excludeAppGlideModule = true
        androidXCore = "1.0.2"
    }
    repositories {
        google()
        jcenter()
    }
    dependencies {
        classpath("com.android.tools.build:gradle:4.1.3")
        classpath 'com.google.gms:google-services:4.3.10'
        classpath 'com.google.firebase:firebase-crashlytics-gradle:2.8.1'
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlinVersion"
    }
}

configurations.all {
    resolutionStrategy {
        force "com.facebook.soloader:soloader:0.9.0"
    }
}

allprojects {
    repositories {
        mavenLocal()
        maven {
            url("$rootDir/../node_modules/react-native/android")
        }
        maven {
            url("$rootDir/../node_modules/jsc-android/dist")
        }

        maven {
            url "https://sdk.smartlook.com/android/release"
        }

        maven {
            url "https://github.com/jitsi/jitsi-maven-repository/raw/master/releases"
        }

        google()
        jcenter()
        maven { url 'https://www.jitpack.io' }
    }
}
```

2.) In `android/app/build.gradle`, add/replace the following lines:

```
project.ext.react = [
    enableHermes: false,
    entryFile: "index.js",
    bundleAssetName: "app.bundle",
]

packagingOptions {
    pickFirst 'lib/x86/libc++_shared.so'
    pickFirst 'lib/x86/libjsc.so'
    pickFirst 'lib/x86_64/libjsc.so'
    pickFirst 'lib/arm64-v8a/libjsc.so'
    pickFirst 'lib/arm64-v8a/libc++_shared.so'
    pickFirst 'lib/x86_64/libc++_shared.so'
    pickFirst 'lib/armeabi-v7a/libc++_shared.so'
    pickFirst 'lib/armeabi-v7a/libjsc.so'
    exclude 'META-INF/DEPENDENCIES'
    exclude 'META-INF/LICENSE'
    exclude 'META-INF/LICENSE.txt'
    exclude 'META-INF/license.txt'
    exclude 'META-INF/NOTICE'
    exclude 'META-INF/NOTICE.txt'
    exclude 'META-INF/notice.txt'
    exclude 'META-INF/ASL2.0'
    exclude("META-INF/*.kotlin_module")
}

dependencies {
    implementation 'androidx.multidex:multidex:2.0.1'
    implementation "com.squareup.okhttp3:okhttp:4.9.0"
    implementation "androidx.annotation:annotation:1.3.0"
    implementation 'androidx.appcompat:appcompat:1.3.1'
    implementation 'androidx.legacy:legacy-support-v4:1.0.0'
    implementation "com.android.support:appcompat-v7:28.0.0"
    implementation(project(':beratkara_react-native-jitsi-meet')) {
      exclude group: 'com.facebook.react',module:'react-native-locale-detector'
      exclude group: 'com.facebook.react',module:'react-native-vector-icons'
      exclude group: 'com.facebook',module:'hermes'
      // Un-comment any packages below that you have added to your project to prevent `duplicate_classes` errors
      exclude group: 'com.facebook.react',module:'react-native-async-storage'
      //exclude group: 'com.facebook.react',module:'react-native-community_netinfo'
      //exclude group: 'com.facebook.react',module:'react-native-svg'
      //exclude group: 'com.facebook.react',module:'react-native-fetch-blob'
      exclude group: 'com.facebook.react',module:'react-native-webview'
      //exclude group: 'com.facebook.react',module:'react-native-linear-gradient'
      //exclude group: 'com.facebook.react',module:'react-native-sound'
      exclude group: 'com.facebook.react',module:'react-native-splash-screen'
      exclude group: 'com.facebook.react',module:'react-native-google-signin'
      exclude group: 'com.facebook.react',module:'react-native-device-info'
      exclude group: 'org.webkit',module:'android-jsc'
      transitive = true
    }

    if (enableHermes) {
        def hermesPath = "../../node_modules/hermesvm/android/";
        debugImplementation files(hermesPath + "hermes-debug.aar")
        releaseImplementation files(hermesPath + "hermes-release.aar")
    } else {
        implementation jscFlavor
    }
}
```

3.) I installed packages

```
npm i hermesvm
npm i @react-native-community/netinfo@5.0.0
react-native link @react-native-community/netinfo
npm i jsc-android
```

4.) In `android/app/src/main/java/com/xxx/MainApplication.java` add/replace the following methods:

```
  import androidx.annotation.Nullable; // <--- Add this line if not already existing
  ...
    @Override
    protected String getJSMainModuleName() {
      return "index";
    }

    @Override
    protected @Nullable String getBundleAssetName() {
      return "app.bundle";
    }
```
