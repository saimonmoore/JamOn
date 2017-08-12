import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Platform,
  PermissionsAndroid,
} from 'react-native';

import { AudioRecorder, AudioUtils } from 'react-native-audio';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2b608a',
  },
  controls: {
    flex: -1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  progressText: {
    paddingTop: 10,
    fontSize: 20,
    color: 'blue',
  },
  button: {
    padding: 20,
  },
  disabledButtonText: {
    color: '#eee',
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  activeButtonText: {
    fontSize: 20,
    color: 'red',
  },
});


// Being recorded to: /data/user/0/com.jamon/files/test.aac
class SessionRecorder extends Component {
  state = {
    currentTime: 0.0,
    recording: false,
    stoppedRecording: false,
    finished: false,
    audioPathPrefix: AudioUtils.DocumentDirectoryPath,
    audioFileEncoding: 'aac',
    hasPermission: undefined,
  };

  componentDidMount() {
    this._checkPermission().then((hasPermission) => {
      this.setState({ hasPermission });

      if (!hasPermission) return;

      this.prepareRecordingPath();

      AudioRecorder.onProgress = (data) => {
        this.setState({ currentTime: Math.floor(data.currentTime) });
      };

      AudioRecorder.onFinished = (data) => {
        // Android callback comes in the form of a promise instead.
        if (Platform.OS === 'ios') {
          this._finishRecording(data.status === 'OK', data.audioFileURL);
        }
      };
    });
  }

  audioFilePath() {
    const audioPathPrefix = this.state.audioPathPrefix;
    const audioFileName = this.audioFileName();
    return `${audioPathPrefix}/${audioFileName}`;
  }

  audioFileName() {
    const song = this.props.song;
    const fileName = song ? song.name : 'untitled';
    const encoding = this.state.audioFileEncoding;

    return `jam-session-${fileName}-${Date.now()}.${encoding}`;
  }

  prepareRecordingPath() {
    const audioPath = this.audioFilePath();

    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: 'Low',
      AudioEncoding: 'aac',
      AudioEncodingBitRate: 32000,
    });
  }

  _checkPermission() {
    if (Platform.OS !== 'android') {
      return Promise.resolve(true);
    }

    const rationale = {
      title: 'Microphone Permission',
      message: 'JamOn needs access to your microphone so you can record audio.',
    };

    return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, rationale)
      .then((result) => {
        console.log('Permission result:', result);
        return (result === true || result === PermissionsAndroid.RESULTS.GRANTED);
      });
  }

  _renderButton(title, onPress, active) {
    const style = (active) ? styles.activeButtonText : styles.buttonText;

    return (
      <TouchableHighlight style={styles.button} onPress={onPress}>
        <Text style={style}>
          {title}
        </Text>
      </TouchableHighlight>
    );
  }

  async _pause() {
    if (!this.state.recording) {
      console.warn('Can\'t pause, not recording!');
      return;
    }

    this.setState({ stoppedRecording: true, recording: false });

    try {
      const filePath = await AudioRecorder.pauseRecording();

      // Pause is currently equivalent to stop on Android.
      if (Platform.OS === 'android') {
        this._finishRecording(true, filePath);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async _stop() {
    if (!this.state.recording) {
      console.warn('Can\'t stop, not recording!');
      return;
    }

    this.setState({ stoppedRecording: true, recording: false });

    try {
      const filePath = await AudioRecorder.stopRecording();

      if (Platform.OS === 'android') {
        this._finishRecording(true, filePath);
      }
      return filePath;
    } catch (error) {
      console.error(error);
    }
  }

  async _record() {
    if (this.state.recording) {
      console.warn('Already recording!');
      return;
    }

    if (!this.state.hasPermission) {
      console.warn('Can\'t record, no permission granted!');
      return;
    }

    if (this.state.stoppedRecording) {
      this.prepareRecordingPath();
    }

    this.setState({ recording: true });

    try {
      const filePath = await AudioRecorder.startRecording();
      console.log('recording audio to: ', filePath);
    } catch (error) {
      console.error(error);
    }
  }

  _finishRecording(didSucceed, audioFilePath) {
    this.setState({ finished: didSucceed });
    this.props.onFinished(audioFilePath, this.state.currentTime);
    console.log(`Finished recording of duration ${this.state.currentTime} seconds at path: ${audioFilePath}`);
  }

  render() {
    const recording = this.state.recording;

    return (
      <View style={styles.controls}>
        {this._renderButton('⏺', () => this._record(), recording)}
        {this._renderButton('⏹', () => this._stop())}
        <Text style={styles.progressText}>{ this.state.currentTime }s</Text>
      </View>
    );
  }
}

export default SessionRecorder;
