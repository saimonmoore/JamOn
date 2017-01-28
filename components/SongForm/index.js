import React, { Component } from 'react';
import {
  TextInput,
  View,
  Button,
  Keyboard,
} from 'react-native';

import {
  Form,
  InputField, 
  PickerField,
} from 'react-native-form-generator';

import { inject, observer } from 'mobx-react/native';
import {Actions} from 'react-native-mobx';

import autobind from 'autobind-decorator';
import FlexiIcon from '../FlexiIcon';

@inject('songs_store')
@observer
class SongForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  @autobind addOrUpdateSong() {
    Keyboard.dismiss();

    const song = this.props.song;

    if (song) {
      this.updateSong();
    } else {
      this.addSong();
    }

    Actions.pop();
  }

  @autobind addSong() {
    const store = this.props.songs_store;
    store.add(this.state.songForm);
  }

  @autobind updateSong() {
    const store = this.props.songs_store;
    const song = this.props.song;
    const formData = this.state.songForm;
    store.update(song, formData);
  }

  @autobind handleFormChanges(songForm) {
    this.setState({songForm});
  }

  render() {
    const song = this.props.song;
    const buttonLabel = song ? 'Update' : 'Add';

    return (
      <View style={{flex: 1, paddingTop: 22}}>
        <Form
          ref='songForm'
          onChange={this.handleFormChanges}
          label="Personal Information">

          <InputField
            ref='name'
            placeholder="Song Name"
            value = {song ? song.name : ''}
            iconLeft={<FlexiIcon name='text-format' size={20} style={{color:'#793315'}} />}
          />

          <InputField
            ref='author'
            placeholder="Song Author"
            value = {song ? song.author : ''}
            iconLeft={<FlexiIcon name='person-pin' size={20} style={{color:'#793315'}} />}
          />

          <PickerField ref='genre'
            label='Genre'
            value = {song ? song.genre : ''}
            options={{
              pop: 'Pop',
              rock: 'Rock',
              classical: 'Classical',
              flamenco: 'Flamenco'
            }}/>
        </Form>
        <Button
          onPress={this.addOrUpdateSong}
          title={ buttonLabel }
          color="#841584"
        />
      </View>
    );
  }
}

export default SongForm;
