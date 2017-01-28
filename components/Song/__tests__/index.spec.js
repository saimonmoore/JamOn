import 'react-native';
import React from 'react';
import Song from '../index.js';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('with a song', () => {
  const song = {name: 'Man of Constant Sorrow', author: 'Dick Burnett', genre: 'Traditional'};

  const component = renderer.create(
    <Song song={song} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});
