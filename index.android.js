import {Provider} from 'react-redux';
import store from './src/redux/store';
import AppViewContainer from './src/modules/AppViewContainer';
import React, {Component} from 'react';
import {AppRegistry, BackAndroid, Alert} from 'react-native';
import {NavigationActions} from 'react-navigation';

class PepperoniAppTemplate extends Component {
  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.navigateBack);
  }

  navigateBack() {
    const navigatorState = store.getState().get('navigatorState');
    const currentStackScreen = navigatorState.get('index');

    if (currentStackScreen !== 0) {
      store.dispatch(NavigationActions.back());
      return true;
    }


    Alert.alert(
      'Alert Exit',
      'Really want to exit?',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => BackAndroid.exitApp()},
      ],
      { cancelable: false }
    )
    // otherwise let OS handle the back button action
    return true;
  }

  render() {
    return (
      <Provider store={store}>
        <AppViewContainer />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('PepperoniAppTemplate', () => PepperoniAppTemplate);
