import React, { Component } from 'react';
import {
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
import moment from 'moment';
import autobind from 'autobind-decorator';

import FlexiIcon from '../FlexiIcon';
import Uuid from '../../lib/uuid';
import Genres from '../../lib/genres';

@observer
@inject('songs_store')
class SongForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  @autobind addOrUpdateSong() {
    Keyboard.dismiss();

    const song = this.song();

    if (song) {
      this.updateSong();
    } else {
      this.addSong();
    }

    const { goBack } = this.props.navigation;
    goBack();
  }

  @autobind addSong() {
    const store = this.props.songs_store;
    const formData = this.state.songForm;
    const createdAt = this.createdAt();
    Object.assign(formData, { createdAt, id: this.songId() });
    store.add(formData);
  }

  @autobind updateSong() {
    const store = this.props.songs_store;
    const song = this.song();
    const formData = this.state.songForm;
    store.update(song, formData);
  }

  @autobind handleFormChanges(songForm) {
    this.setState({ songForm });
  }

  song() {
    const { params } = this.props.navigation.state;
    return this.props.song || params.song;
  }

  createdAt() {
    return moment().format('X');
  }

  songId() {
    const uuid = new Uuid();
    return uuid.generateV4();
  }

  render() {
    const song = this.song();
    const genres = new Genres().asOptions();
    const buttonLabel = song ? 'Update' : 'Add';

    return (
      <View style={{ flex: 1, paddingTop: 22 }}>
        <Form
          ref="songForm"
          onChange={this.handleFormChanges}
          label="Personal Information"
        >

          <InputField
            ref="name"
            placeholder="Song Name"
            value={song ? song.name : ''}
            iconLeft={<FlexiIcon name="text-format" size={20} style={{ color: '#793315' }} />}
          />

          <InputField
            ref="author"
            placeholder="Song Author"
            value={song ? song.author : ''}
            iconLeft={<FlexiIcon name="person-pin" size={20} style={{ color: '#793315' }} />}
          />

          <PickerField
            ref="genre"
            label="Genre"
            value={song ? song.genre : ''}
            options={genres}
          />
        </Form>
        <Button
          onPress={this.addOrUpdateSong}
          title={buttonLabel}
          color="#841584"
        />
      </View>
    );
  }
}

export default SongForm;
