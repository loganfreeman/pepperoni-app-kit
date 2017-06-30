import {Platform} from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation';

import CounterViewContainer from '../counter/CounterViewContainer';
import ColorViewContainer from '../colors/ColorViewContainer';

const headerColor = '#39babd';
const activeColor = 'white';

import Icon from 'react-native-vector-icons/MaterialIcons';


export const CloseButton = (props) => {
  let testButton = <TouchableHighlight onPress={() => props.navigation.goBack(null)}>
    <Icon name='close' style={styles.headerButtonIcon} />
  </TouchableHighlight>
  return testButton
}

export const SettingsButton = (props) => (
  <TouchableHighlight onPress={() => props.navigate('Settings')}>
    <Icon name='more-vert' style={styles.headerButtonIcon} />
  </TouchableHighlight>
)


// TabNavigator is nested inside StackNavigator
export const MainScreenNavigator = TabNavigator({
  Counter: {screen: CounterViewContainer},
  Color: {screen: ColorViewContainer}
}, {
  tabBarOptions: {
    ...Platform.select({
      android: {
        activeTintColor: activeColor,
        indicatorStyle: {backgroundColor: activeColor},
        style: {backgroundColor: headerColor}
      }
    })
  }
});

MainScreenNavigator.navigationOptions = {
  title: 'UTAH Fishing',
  header: ({ navigate }) => ({
    titleStyle: {color: 'white'},
    style: {
      backgroundColor: headerColor,
      elevation: 1 // disable header elevation when TabNavigator visible
    },
  })
};

// Root navigator is a StackNavigator
const AppNavigator = StackNavigator({
  Home: {screen: CounterViewContainer},
  InfiniteColorStack: {screen: ColorViewContainer}
});

export default AppNavigator;
