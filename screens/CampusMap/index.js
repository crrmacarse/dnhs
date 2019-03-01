import React from 'react';

import { withFirebase } from '../../firebase';

import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Modal,
} from 'react-native';

import Loading from '../../components/Loading';

class MapScreen extends React.Component {
  state = {
    modalVisible: false,
    markers: [],
    loading: false
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  componentDidMount() {
    this._loadMarkers();
  }

  _loadMarkers = async () => {
    this.setState({ loading: true });

    const markerList = [];

    await this.props.firebase.markers().orderBy("number").get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
          markerList.push(doc.data());
        });

        const listMarker = Object.keys(markerList || {}).map(key => ({
          ...markerList[key],
          id: key
        }))

        this.setState({
          markers: listMarker,
          loading: false
        });
      }).catch(error => {
        Alert.alert(
          'Internal Error',
          error.message,
          [
            { text: 'OK' },
          ],
          { cancelable: false }
        )
      });
  }

  render() {
    const { markers, loading } = this.state;

    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          onRequestClose={() => {
            console.log("close");
          }}
          visible={this.state.modalVisible}
        >
          <View style={{ flex: 1, justifyContent: 'center', textAlign: 'center', alignItems: 'center' }}>
            <View>
              <Text style={{ fontSize: 20, margin: 15, fontWeight: 'bold' }}>DNHS Campus Map Reference</Text>
            </View>

            <View style={{ flexDirection: 'column' }}>
              {loading && (
                // style={{alignSelf: 'center', flexDirection: 'column-reverse'}*/}
                <View style={{ alignSelf: 'stretch', flex: 2, flexGrow: 1 }}>
                  <Loading />
                </View>
              )}

              {markers.map((marker) =>
                <View key={marker.id} style={{ flexDirection: 'row' }}>
                  <Text style={{
                    fontSize: 15,
                    color: '#b3b3b3',
                    marginRight: 6,
                  }}>
                    {marker.number}.
                  </Text>

                  <Text style={{
                    fontWeight: 'bold',
                    fontSize: 17,
                  }}>
                    {marker.name}
                  </Text>
                </View>
              )}
            </View>

            <View style={{ marginTop: 25 }}>
              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Reference</Text>
              </TouchableOpacity>
            </View>

          </View>
        </Modal>

        <Image
          source={require('../../assets/images/campusmap.png')}
          style={styles.campusMap}
          resizeMode="contain"
        />

        <View
          style={{
            position: 'absolute',
            backgroundColor: 'grey',
            padding: 8,
            top: 15,
            right: 10,
            zIndex: 10
          }}>
          <TouchableOpacity
            onPress={() => {
              this.setModalVisible(true);
            }}>
            <Text style={{ color: 'white', }}>
              Room Reference
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
  campusMap: {
    flex: 1,
    width: undefined,
    height: undefined,
    transform: [{ rotate: '-10deg' }]
  }
});

const withFirebaseMap = withFirebase(MapScreen);

withFirebaseMap.navigationOptions = ({ navigation }) => ({
  title: 'DNHS Campus Map',
  headerStyle: {
    borderBottomColor: 'rgba(8,158,232,.3)',
    borderBottomWidth: 2,
  },
});

export default withFirebaseMap;