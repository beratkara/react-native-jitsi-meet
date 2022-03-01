/**
 * @providesModule JitsiMeet
 */

import { NativeModules, requireNativeComponent } from 'react-native';

export const JitsiMeetView = requireNativeComponent('RNJitsiMeetView');
export const JitsiMeetModule = NativeModules.RNJitsiMeetModule
const call = JitsiMeetModule.call;
const audioCall = JitsiMeetModule.audioCall;
const endCall = JitsiMeetModule.endCall;
JitsiMeetModule.call = (url, userInfo, meetOptions, meetFeatureFlags) => {
  userInfo = userInfo || {};
  meetOptions = meetOptions || {};
  meetFeatureFlags = meetFeatureFlags || {};
  call(url, userInfo, meetOptions, meetFeatureFlags);
}
JitsiMeetModule.audioCall = (url, userInfo, meetOptions, meetFeatureFlags) => {
  userInfo = userInfo || {};
  meetOptions = meetOptions || {};
  meetFeatureFlags = meetFeatureFlags || {};
  audioCall(url, userInfo, meetOptions, meetFeatureFlags);
}
JitsiMeetModule.endCall = () => {
  endCall();
}
export default JitsiMeetModule;


