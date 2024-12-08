/**
 * @format
 */

import {AppRegistry} from 'react-native';
import RootNavigator from './RootNavigator';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => RootNavigator);
