### For the developer

- Install missing libraries via:

    `cd Android/Sdk/tools; ./android`

- Build and install app in device/emulator via:

    `react-native run-android`

- Start watchman via (Ensure you have an empty .watchmanconfig file in project
  root:

    `watchman watch-project .`

- Start packager via:

    `react-native start`

- Enable logging via:

    `adb logcat`
