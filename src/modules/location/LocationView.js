import React, {PropTypes, Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  MapView
} from 'react-native';

// Load sample locations from JSON file
const locationData = require('../../data/sampleLocations.json');
// Set initial default location
const location = locationData.London;

const randomPicker = () => Math.floor(Math.random() * location.length);
/**
 * Sample view to demonstrate navigation patterns.
 * @TODO remove this module in a live application.
 */
class LocationView extends Component {
  static displayName = 'LocationView';

  static propTypes = {
    index: PropTypes.number.isRequired,
    office: PropTypes.string.isRequired,
    navigationStateActions: PropTypes.shape({
      pushRoute: PropTypes.func.isRequired
    })
  };

  onNextPress = () => {
    const index = this.props.index;
    this.props.navigationStateActions.pushRoute({
      key: `Place_${index + 1}`,
      title: `Place Screen #${index + 1}`
    });
  };

  render() {

    const place = location[randomPicker()];
    const marker = [
      {
        latitude: place.latitude,
        longitude: place.longitude,
        title: place.name,
        subtitle: place.type
      }
    ];
    const region = {
      latitude: place.latitude,
      longitude: place.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005
    };

    return (
      <View style={[styles.container]}>
        <Text style={styles.city}>
          {this.props.office}
        </Text>
        <Text onPress={this.onNextPress} style={styles.placeTitle}>
          {place.name}
        </Text>
        <Text style={styles.placeInfo}>
          Type: {place.type}
        </Text>
        <Text style={styles.placeInfo}>
          Distance: {place.distance}
        </Text>
        <MapView
          style={styles.map}
          region={region}
          annotations={marker}
        />
        <Text style={styles.placeAddress}>
          {place.address}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  placeTitle: {
    fontSize: 30
  },
  placeInfo: {
    fontSize: 20
  },
  placeAddress: {
    fontSize: 15,
    width: 300,
    textAlign: 'center'
  },
  map: {
    height: 150,
    width: 250,
    margin: 10,
    borderWidth: 1,
    borderColor: '#000000'
  },
  city: {
    paddingBottom: 40
  }
});

export default LocationView;