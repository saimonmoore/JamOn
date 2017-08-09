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

  state = {
    playing: false,
    loaded: false,
  };

  componentDidMount() {
    this.loadAudio().then((sound) => {
      console.log('Sound loaded: ', sound, sound.isLoaded());
      this.setState({ loaded: true, sound });
    });
  }

  componentWillUnmount() {
    if (!this.state.loaded) return;
    const sound = this.state.sound;
    sound.release();
  }

  loadAudio() {
    const audioPath = this.audioFilePath();
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        const sound = new Sound(audioPath, '', (error) => {
          if (error) {
            console.log('failed to load the sound', error);
            reject(Error("Can't load audio"));
          }

          resolve(sound);
        });
      }, 100);
    });

    return promise;
  }

  audioFilePath() {
    const session = this.props.session;
    return session.audioFileUrl;
  }

  @autobind async _play() {
    if (!this.state.loaded) return;
    const sound = this.state.sound;

    setTimeout(() => {
      this.setState({ playing: true });
      sound.play((success) => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
        this.setState({ playing: false });
      });
    }, 100);
  }

  @autobind async _stop() {
    if (!this.state.playing) return;
    const sound = this.state.sound;

    setTimeout(() => {
      sound.stop(() => {
        this.setState({ playing: false });
        console.log('Sound stopped playing');
      });
    }, 100);
  }

  @autobind async _pause() {
    if (!this.state.playing) return;
    const sound = this.state.sound;

    setTimeout(() => {
      sound.pause(() => {
        this.setState({ playing: false });
        console.log('Sound paused');
      });
    }, 100);
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

  render() {
    return (
      <View style={styles.container} >
        <View style={styles.controls} >
          {this._renderButton('▶', this._play, !this.state.playing)}
          {this._renderButton('⏸', this._pause, this.state.playing)}
          {this._renderButton('⏹', this._stop, this.state.playing)}
        </View>
      </View>
    );
  }
}

export default SessionPlayer;
