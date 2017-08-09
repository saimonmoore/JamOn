import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

import Sound from 'react-native-sound';
import autobind from 'autobind-decorator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2b608a',
  },
  controls: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  progressText: {
    paddingTop: 50,
    fontSize: 50,
    color: '#fff',
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
    color: '#B81F00',
  },
});


class SessionPlayer extends Component {
  audioFilePath() {
    const session = this.props.session;
    return session.audioFileUrl;
  }

  @autobind async _play() {
    const audioPath = this.audioFilePath();

    // These timeouts are a hacky workaround for some issues with react-native-sound.
    // See https://github.com/zmxv/react-native-sound/issues/89.
    // TODO: Check if necessary
    setTimeout(() => {
      const sound = new Sound(audioPath, '', (error) => {
        if (error) {
          console.log('failed to load the sound', error);
        }
      });

      setTimeout(() => {
        sound.play((success) => {
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        });
      }, 100);
    }, 100);
  }

  render() {
    return (
      <TouchableHighlight style={styles.button} onPress={this._play}>
        <Text style={styles.activeButtonText}>
          PLAY
        </Text>
      </TouchableHighlight>
    );
  }
}

export default SessionPlayer;
