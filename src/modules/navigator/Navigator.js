import {Platform} from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation';

import CounterViewContainer from '../counter/CounterViewContainer';
import ColorViewContainer from '../colors/ColorViewContainer';

const headerColor = '#39babd';
const activeColor = 'white';

import Icon from 'react-native-vector-icons/MaterialIcons';

// Root navigator is a StackNavigator
const AppNavigator = StackNavigator({
  Home: {screen: CounterViewContainer},
  InfiniteColorStack: {screen: ColorViewContainer}
});

export default AppNavigator;
