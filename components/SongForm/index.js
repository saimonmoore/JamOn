import React, { Component } from 'react';
import {
  TextInput,
  View,
} from 'react-native';

class SongForm extends Component {
  render() {
    return (
      <View style={{flex: 1, paddingTop: 22}}>
        <TextInput
          style={{height: 40}}
          placeholder="Song Name"
          onChangeText={(name) => this.setState({name})}
        />
      </View>
    );
  }
}

export default SongForm;
