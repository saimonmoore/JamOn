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
} from 'react-native-form-generator';

import { inject, observer } from 'mobx-react/native';
import {Actions} from 'react-native-mobx';

import autobind from 'autobind-decorator';
import FlexiIcon from '../FlexiIcon';
import moment from 'moment';

@inject('sessions_store')
@observer
class SessionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  @autobind addOrUpdateSession() {
    Keyboard.dismiss();

    const session = this.props.session;

    if (session) {
      this.updateSession();
    } else {
      this.addSession();
    }

    Actions.pop();
  }

  @autobind addSession() {
    const store = this.props.sessions_store;
    const date = moment().format();
    const timestamp = moment().format('X');
    const formData = this.state.sessionForm;
    const song = this.props.song;
    const session_id = `session-${timestamp}`;
    console.log('[SessionForm#addSession] song: ', this.song);
    console.log('[SessionForm#addSession] state: ', this.state);
    console.log('[SessionForm#addSession] date: ', date);
    console.log('[SessionForm#addSession] formData 1: ', formData);
    Object.assign(formData, { date, id: session_id, song_id: song.name });
    console.log('[SessionForm#addSession] formData 2: ', formData);

    store.add(formData);
  }

  @autobind updateSession() {
    const store = this.props.sessions_store;
    const session = this.props.session;
    const formData = this.state.sessionForm;
    console.log('[SessionForm#updateSession] formData: ', formData);
    store.update(session, formData);
  }

  @autobind handleFormChanges(sessionForm) {
    console.log('[SessionForm#handleFormChanges] sessionForm: ', sessionForm);
    this.setState({sessionForm});
  }

  render() {
    const session = this.props.session;
    const buttonLabel = session ? 'Update' : 'Record';

    return (
      <View style={{flex: 1, paddingTop: 22}}>
        <Form
          ref='sessionForm'
          onChange={this.handleFormChanges}
          label="Session Info">

          <InputField
            ref='bps'
            placeholder="Beats per second"
            value = {session ? session.bps : ''}
            iconLeft={<FlexiIcon name='text-format' size={20} style={{color:'#793315'}} />}
          />
        </Form>
        <Button
          onPress={this.addOrUpdateSession}
          title={ buttonLabel }
          color="#841584"
        />
      </View>
    );
  }
}

export default SessionForm;