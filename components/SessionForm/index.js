import React, { Component } from 'react';
import {
  View,
  Button,
  Keyboard,
} from 'react-native';
import {
  Form,
  InputField,
} from 'react-native-form-generator';
import { inject, observer } from 'mobx-react/native';
import autobind from 'autobind-decorator';
import moment from 'moment';

import FlexiIcon from '../FlexiIcon';
import SessionRecorder from '../Session/Recorder';
import Uuid from '../../lib/uuid';

@observer
@inject('sessions_store')
class SessionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  @autobind onRecordingFinished(audioFileUrl, duration) {
    const formData = this.state.sessionForm;
    Object.assign(formData, { audioFileUrl, duration });
    console.log('[SessionForm#onRecordingFinished] formData: ', formData);
    this.addOrUpdateSession();
  }

  @autobind addOrUpdateSession() {
    Keyboard.dismiss();

    const session = this.session();

    if (session) {
      this.updateSession();
    } else {
      this.addSession();
    }

    const { goBack } = this.props.navigation;
    goBack();
  }

  @autobind addSession() {
    const store = this.props.sessions_store;
    const createdAt = this.createdAt();
    const formData = this.state.sessionForm;
    const song = this.song();
    Object.assign(formData, { createdAt, id: this.sessionId(), song_id: song.id });

    store.add(formData);
  }

  @autobind updateSession() {
    const store = this.props.sessions_store;
    const session = this.session();
    const formData = this.state.sessionForm;
    store.update(session, formData);
  }

  @autobind handleFormChanges(sessionForm) {
    this.setState({ sessionForm });
  }

  createdAt() {
    return moment().format('X');
  }

  sessionId() {
    const uuid = new Uuid();
    return uuid.generateV4();
  }

  session() {
    const { params } = this.props.navigation.state;
    return this.props.session || params.session;
  }

  song() {
    const { params } = this.props.navigation.state;
    return this.props.song || params.song;
  }

  render() {
    const session = this.session();
    const song = this.song();

    return (
      <View style={{ flex: 1, paddingTop: 22 }}>
        <Form
          ref="sessionForm"
          onChange={this.handleFormChanges}
          label="Session Info"
        >

          <InputField
            ref="tempo"
            placeholder="Tempo (bpm)"
            value={session ? session.tempo : ''}
            iconLeft={<FlexiIcon name="text-format" size={20} style={{ color: '#793315' }} />}
          />
        </Form>
        <SessionRecorder onFinished={this.onRecordingFinished} song={song} />
      </View>
    );
  }
}

export default SessionForm;
