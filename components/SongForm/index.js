import React, { Component } from 'react';
import {
  TextInput,
  View,
  Button,
} from 'react-native';

import {
  Form,
  InputField, 
  PickerField,
} from 'react-native-form-generator';

import { inject, observer } from 'mobx-react/native';

import autobind from 'autobind-decorator';
import FlexiIcon from '../FlexiIcon';

@inject('songs_store')
@observer
class SongForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  @autobind addSong() {
    // Will probably need to persist state to localstorage
    // between scenes.
    const store = this.props.songs_store;
    store.add(this.state.songForm);
  }

  @autobind handleFormChanges(songForm) {
    this.setState({songForm});
  }

  render() {

    return (
      <View style={{flex: 1, paddingTop: 22}}>
        <Form
          ref='songForm'
          onChange={this.handleFormChanges}
          label="Personal Information">

          <InputField
            ref='name'
            placeholder="Song Name"
            iconLeft={<FlexiIcon name='text-format' size={20} style={{color:'#793315'}} />}
          />

          <InputField
            ref='author'
            placeholder="Song Author"
            iconLeft={<FlexiIcon name='person-pin' size={20} style={{color:'#793315'}} />}
          />

          <PickerField ref='genre'
            label='Genre'
            options={{
              pop: 'Pop',
              rock: 'Rock',
              classical: 'Classical',
              flamenco: 'Flamenco'
            }}/>
        </Form>
        <Button
          onPress={this.addSong}
          title="Add"
          color="#841584"
          accessibilityLabel="Press to add the song"
        />
      </View>
    );
  }
}

export default SongForm;
