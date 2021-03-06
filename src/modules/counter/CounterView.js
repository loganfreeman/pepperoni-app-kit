import React, {PropTypes, Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  Button,
  ListView
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {List} from 'immutable';

import { Toolbar } from 'react-native-material-ui';

class CounterView extends Component {
  static displayName = 'CounterView';

  constructor(props){
      super(props);
      var ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 != r2
      });
      this.state = {
        dataSource:ds
      }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.counter)
    })
  }

  static navigationOptions = {
    headerTitle: 'Hot Spots'
  }

  static propTypes = {
    counter: PropTypes.oneOfType([PropTypes.instanceOf(List), PropTypes.instanceOf(Array)]).isRequired,
    userName: PropTypes.string,
    userProfilePhoto: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    counterStateActions: PropTypes.shape({
      reset: PropTypes.func.isRequired,
      random: PropTypes.func.isRequired
    }).isRequired,
    navigate: PropTypes.func.isRequired
  };

  reset = () => {
    this.props.counterStateActions.reset();
  };

  random = () => {
    this.props.counterStateActions.random();
  };

  bored = () => {
    this.props.navigate({routeName: 'Color'});
  };

  renderRow = (rowData) => {
    return (
      <View style={styles.row}>
        <View>
            <Text style={styles.rowTitle}>{rowData[0]}</Text>
        </View>
        <View>
            <Text style={styles.rowMessage}>{rowData[4]}</Text>
        </View>
        <View>
            <Text style={styles.rowMessage}>{rowData[5]}</Text>
        </View>
    </View>
    );
  }

  render() {
    const loadingStyle = this.props.loading
      ? {backgroundColor: '#eee'}
      : null;

    return (
      <View style={styles.container}>


      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}
        enableEmptySections={true}
      />

      </View>
    );
  }
}

const circle = {
  borderWidth: 0,
  borderRadius: 40,
  width: 80,
  height: 80
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  userContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  userProfilePhoto: {
    ...circle,
    alignSelf: 'center'
  },
  counterButton: {
    ...circle,
    backgroundColor: '#349d4a',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20
  },
  counter: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  },
  welcome: {
    textAlign: 'center',
    color: 'black',
    marginBottom: 5,
    padding: 5
  },
  linkButton: {
    textAlign: 'center',
    color: '#CCCCCC',
    marginBottom: 10,
    padding: 5
  },
  row:{
          backgroundColor:'#ef553a',
          paddingTop:10,
          paddingBottom:20,
          paddingLeft:20,
          paddingRight:20,
          borderRadius:10
      },
  rowTitle:{
      fontWeight:'bold',
      color:'#fff',
      textAlign:'center',
      fontSize:20,
      marginBottom:10
  },
  rowMessage:{
      color:'#fff',
      fontSize:16
  }
});

export default CounterView;
