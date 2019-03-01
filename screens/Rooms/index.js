import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';

import RoomSearch from './search';

export default class RoomScreen extends React.Component {
  static navigationOptions = {
    title: 'DNHS Room Finder',
    headerStyle: {
      borderBottomColor: 'rgba(8,158,232,.3)',
      borderBottomWidth: 2,
    },
  };

  _handlerLongClick = () => {
    Alert.alert(
      'Settings',
      'Are you sure you want to go to settings?',
      [
        {
          text: 'Yes', onPress: () => {
            this.props.navigation.navigate('Settings');
          }
        },
        {text: 'Cancel'},
      ],
      { cancelable: false }
    )
  }

  render() {
    return (
      <View style={{
        flex: 1,
        paddingTop: 15,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'stretch',
      }}>
        <View style={{}}>
          <TouchableOpacity
            onLongPress={this._handlerLongClick}>
            <Text style={{
              fontSize: 55,
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#0275d8',
            }}>
              DUMANGAS
            </Text>
          </TouchableOpacity>
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            color: 'grey',
          }}>
            National High School
            </Text>
        </View>

        <View style={{ flexGrow: 2 }}>
          <RoomSearch navigation = {this.props.navigation}/>
        </View>
      </View>
    );
  }

}
