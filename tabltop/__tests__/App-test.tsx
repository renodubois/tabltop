/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

// TODO: React Navigation causes this to fail, and I'm not quite sure why.
it('renders correctly', () => {
  renderer.create(<App />);
});
