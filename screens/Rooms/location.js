import React from 'react';

import { withFirebase } from '../../firebase';

import { Marker } from 'react-native-maps';

import {
  View,
  Alert,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ImageBackground,
  Platform
} from 'react-native';

import {
  MapView, Icon,
} from 'expo';

class LocationScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  /*

  pass to setImageModalVisible the image then display in modal the image via state

  */

  state = {
    location: null,
    name: null,
    description: null,
    number: null,
    materCount: null,
    walkingTime: null,
    loading: true,
    layer: 'satellite',
    tags: [],
    moreInfo: [],
    selectedImgUrl: 'https://scontent.fmnl9-1.fna.fbcdn.net/v/t1.0-1/c0.0.200.200a/11148583_700748856722198_4462099662081086326_n.jpg?_nc_cat=110&_nc_ht=scontent.fmnl9-1.fna&oh=262c873f30b04afd3b4c99fb1f23d7ea&oe=5D1C99B6',
    modalVisible: false,
    modaIlmage: null,
    modalImageVisible: false,
  };

  _renderMarkerLocation = async () => {
    this.setState({ loading: true });

    let marker = this.props.navigation.getParam('marker');

    if (!marker) {
      Alert.alert(
        'Missing Location',
        'Kindly reach out for the developer to fix this issue',
        [
          { text: 'Close' },
        ],
        { cancelable: false }
      )
      return;
    }

    this.setState({
      location: marker.coords,
      name: marker.name,
      description: marker.description,
      number: marker.number,
      materCount: marker.materCount,
      walkingTime: marker.walkingTime,
      imageUrl: marker.imageUrl,
      tags: marker.tags,
      moreInfo: marker.moreInfo,
      loading: false,
    })
  }


  setImageModalVisible(visible) {
    this.setState({ modalImageVisible: visible });
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  componentDidMount() {
    this._renderMarkerLocation();
  }

  render() {

    const { location,
      layer,
      name,
      description,
      number,
      materCount,
      walkingTime,
      moreInfo,
      imageUrl,
      selectedImgUrl,
      tags,
    } = this.state;

    if (!location) {
      return (
        <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text style={{ textAlign: 'center' }}>There seems to be an error</Text>
          <Text style={{ marginTop: 5 }}>Kindly contact the developers to fix this issue.</Text>
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{
            flex: 1,
            zIndex: -1
          }}
          mapType={layer}
          minZoomLevel={18}
          showsCompass
          loadingEnabled
          showsMyLocationButton
          moveOnMarkerPress={false}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922 / 2.5,
            longitudeDelta: 0.0421 / 2.5,
          }}
        >

          <Marker
            pinColor="skyblue"
            coordinate={location}
            title={name + ' is here!'}
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}
          />

        </MapView>


        <Modal
          animationType="fade"
          transparent
          onRequestClose={() => {
            this.setModalVisible(false)
          }}
          visible={this.state.modalVisible}
        >
          <TouchableWithoutFeedback onPress={() => this.setModalVisible(false)}>
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}>
              <View style={{ paddingTop: 25, paddingBottom: 25, width: '55%', height: '92%', backgroundColor: '#fff', justifyContent: "center", alignItems: 'center' }}>
                <View style={{ alignItems: 'center', flexDirection: 'row', marginBottom: 5 }}>
                  <Text style={{
                    fontSize: 15,
                    color: '#b3b3b3',
                    marginRight: 6,
                  }}>
                    {number}.
                </Text>

                  <Text style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                  }}>
                    {name}</Text>
                </View>

                <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Icon.Ionicons
                      name={Platform.OS === 'ios' ? 'ios-compass' : 'md-compass'}
                      size={15}
                      style={{ marginRight: 4 }}
                      color="#333"
                    />
                    <Text style={{ fontSize: 12 }}>
                      {materCount} m
                    </Text>
                  </View>
                  <Text style={{ paddingLeft: 2, backgroundColor: "#d3d3d3", marginLeft: 10, marginRight: 10 }}>
                  </Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Icon.Ionicons
                      name={Platform.OS === 'ios' ? 'ios-walk' : 'md-walk'}
                      size={15}
                      style={{ marginRight: 4 }}
                      color="#333"
                    />
                    <Text style={{ fontSize: 12 }}>
                      {walkingTime} minutes
                    </Text>
                  </View>
                </View>


                <View style={{ alignItems: 'center', flexDirection: 'row', marginBottom: 5 }}>
                  {imageUrl && imageUrl.map((img, index) =>
                    <TouchableWithoutFeedback onPress={() => {
                      this.setState({selectedImgUrl: img})
                      this.setImageModalVisible(true)
                    }
                    } key={index}>
                      <Image
                        style={{ width: 65, height: 65 }}
                        source={{uri: img}}

                      />
                    </TouchableWithoutFeedback>
                  )}
                </View>

                <View style={{
                  alignItems: 'center',
                  padding: 3,
                }}>
                  <Text style={{
                    textAlign: 'center',
                    fontStyle: 'italic'
                  }}>{description}</Text>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                  {tags.map((tag, index) =>
                    <Text key={index}
                      style={{
                        backgroundColor: "#d3d3d3",
                        padding: 2,
                        paddingLeft: 5,
                        paddingRight: 5,
                        borderRadius: 500,
                        marginLeft: 3
                      }}
                    >#{tag}
                    </Text>
                  )}
                </View>

                <TouchableOpacity
                  style={{
                    marginTop: 15
                  }}
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}>
                  <Text>Hide Information</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <Modal
          animationType="slide"
          transparent={false}
          presentationStyle="fullScreen"
          onRequestClose={() => {
            this.setImageModalVisible(false)
          }}
          visible={this.state.modalImageVisible}
        >
          <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: '#fff', justifyContent: "center", alignItems: 'center' }}>

              <View style={{ flex: 2, alignItems: 'center', flexDirection: 'row' }}>
                <ImageBackground
                  style={{ width: '100%', height: '100%' }}
                  source={{uri: selectedImgUrl}}
                />
              </View>

              <View style={{
                flex: 0,
                position: 'absolute',
                top: 5,
                right: 5,
                zIndex: 1030,
              }}>
                <TouchableOpacity
                  onPress={() => {
                    this.setImageModalVisible(!this.state.modalImageVisible);
                  }}>
                  <Icon.Ionicons
                    name={Platform.OS === 'ios' ? 'ios-close-circle' : 'md-close-circle'}
                    size={40}
                    style={{ marginRight: 8 }}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <View style={{
          position: 'absolute',
          backgroundColor: '#0275d8',
          top: 10,
          left: 15,
          zIndex: 10,
        }}>
          <TouchableOpacity
            onPress={() => {
              this.setModalVisible(true);
            }}>
            <Text
              style={{
                color: '#fff',
                padding: 8
              }}>More Information
            </Text>
          </TouchableOpacity>
        </View>
      </View >
    );
  }
}

const withFirebaseLocation = withFirebase(LocationScreen);

withFirebaseLocation.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('markername', 'Location Finder'),
  headerStyle: {
    borderBottomColor: 'rgba(8,158,232,.3)',
    borderBottomWidth: 2,
  },
});

export default withFirebaseLocation;


