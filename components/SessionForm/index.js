import React, { Component } from 'react';
import {
  View,
  Keyboard,
  StyleSheet,
} from 'react-native';
import {
  Form,
  PickerField,
} from 'react-native-form-generator';
import { inject, observer } from 'mobx-react/native';
import autobind from 'autobind-decorator';
import moment from 'moment';

import FlexiIcon from '../FlexiIcon';
import SessionRecorder from '../Session/Recorder';
import Uuid from '../../lib/uuid';
import Tempo from '../../lib/tempo';

@observer
@inject('sessions_store')
class SessionForm extends Component {
  constructor(props) {
    super(props);
    const session = this.session();
    this.state = { selectedTempo: session ? session.tempo : 'unselected' };
  }

  @autobind onRecordingFinished(audioFileUrl, duration) {
    const formData = this.state.sessionForm || {};
    Object.assign(formData, { audioFileUrl, duration });
    console.log('[SessionForm#onRecordingFinished] formData: ', formData);
    this.addOrUpdateSession();
  }

  @autobind addOrUpdateSession() {
    Keyboard.dismiss();

    const session = this.session();
    const song = this.song();

    if (session) {
      this.updateSession();
    } else {
      this.addSession();
    }

    const { navigate } = this.props.navigation;
    navigate('Song', { song });
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
    this.setState({ sessionForm, selectedTempo: sessionForm && sessionForm.tempo });
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

  renderRecorder() {
    const song = this.song();
    const sessionForm = this.state.sessionForm;
    const tempoLabel = sessionForm && sessionForm.tempo;
    const tempo = tempoLabel && Number.parseInt(tempoLabel, 10);
    console.log('========> sessionForm:', sessionForm, tempoLabel, tempo);

    if (tempo > 0) {
      return (<SessionRecorder onFinished={this.onRecordingFinished} song={song} />);
    }
  }

  render() {
    const session = this.session();
    const tempo = new Tempo();
    const selectedTempo = this.state.selectedTempo;
    console.log('=====> selectedTempo: ', selectedTempo);
    const tempoOptions = tempo.asOptions();

    return (
      <View style={styles.container}>
        <Form
          ref="sessionForm"
          onChange={this.handleFormChanges}
          label="Session Info"
        >

          <PickerField
            ref="tempo"
            label="Tempo"
            value={selectedTempo}
            options={tempoOptions}
            containerStyle={styles.picker}
            iconLeft={<FlexiIcon name="text-format" size={20} style={{ color: '#793315' }} />}
          />
          {this.renderRecorder()}
        </Form>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  picker: {
    width: 150,
  },
});

export default SessionForm;
