import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

const haversine = require('haversine');
const moment = require('moment');

import { withFirebase } from '../../firebase';

import Loading from '../../components/Loading';

import {
    View,
    Button,
    TextInput,
    Text,
    TouchableOpacity,
    Alert,
    Platform
} from 'react-native';

import {
    Permissions,
    Location,
    Icon
} from 'expo';

class RoomSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            markers: [],
            searchVal: '',
            loading: false,
            location: null,
        }
    }

    _loadMarkers = async () => {
        this.setState({ loading: true });

        const { location } = this.state;
        const markerList = [];

        await this.props.firebase.markers().get()
            .then(querySnapshot => {
                querySnapshot.docs.forEach(doc => {
                    markerList.push(doc.data());
                });

                const listMarker = Object.keys(markerList || {}).map(key => ({
                    ...markerList[key],
                    id: key
                }))

                const finalMarkerList = listMarker.map((marker) => {
                    let meterCount = Math.round(haversine(location.coords, marker.coords, { unit: 'meter' }) * 100) / 100;
                    let walkingTime = Math.round(moment.duration((meterCount / 4800), 'hours').asMinutes() * 100) / 100;

                    return { ...marker, materCount: meterCount, walkingTime: walkingTime };
                });

                this.setState({
                    markers: finalMarkerList,
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

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);

        if (status !== 'granted') {
            Alert.alert(
                'Permission not granted',
                [
                    { text: 'Close' },
                ]
            )
            return;
        }

        try {
            let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });

            if (location) {
                this.setState({
                    location,
                },
                    this._loadMarkers
                );
            }
        } catch (error) {
            Alert.alert(
                error.message,
                'Kindly enable your location services if you want to utilize our GPS tracking system.',
                [
                    { text: 'OK' },
                ],
                { cancelable: false }
            )
        }
    }

    _handleSearch = async () => {
        const { location, searchVal } = this.state;

        if (!searchVal) {
            this._loadMarkers();
            return
        }

        this.setState({ loading: true });


        const markerList = [];

        await this.props.firebase.markers().where("tags", "array-contains", searchVal.toLowerCase()).get()
            .then(querySnapshot => {
                querySnapshot.docs.forEach(doc => {
                    markerList.push(doc.data());
                });

                const listMarker = Object.keys(markerList || {}).map(key => ({
                    ...markerList[key],
                    id: key
                }))

                const finalMarkerList = listMarker.map((marker) => {
                    let meterCount = Math.round(haversine(location.coords, marker.coords, { unit: 'meter' }) * 100) / 100;
                    let walkingTime = Math.round(moment.duration((meterCount / 4800), 'hours').asMinutes() * 100) / 100;

                    return { ...marker, materCount: meterCount, walkingTime: walkingTime };
                });

                this.setState({
                    markers: finalMarkerList,
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

    componentDidMount() {
        this._getLocationAsync();
    }

    render() {

        const { markers, loading, searchVal, location } = this.state;

        if (!location || loading) {
            return (
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <View style={{ alignSelf: 'stretch', flex: 3, flexGrow: 1 }}>
                        <Loading />
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center', padding: 20 }}>
                        <Text style={{ textAlign: 'center' }}>Kindly enable your location services first.</Text>
                        <TouchableOpacity
                            onPress={this._getLocationAsync}>
                            <Text style={{ marginTop: 5 }}>Refresh</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <View style={styles.contentContainer}>
                    <TextInput
                        onChangeText={(text) => this.setState({ searchVal: text })}
                        placeholder="Search"
                        style={styles.inputBox}
                        onSubmitEditing={this._handleSearch}
                        name="searchVal"
                        value={searchVal}
                    />
                    <Button
                        onPress={this._handleSearch}
                        title="Search Building"
                        color="#0275d8"
                    />
                </View>
                <ScrollView style={styles.containerMarkerMain}>
                    {markers.map((marker) =>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Location', { markername: marker.name, marker })} key={marker.id}>
                            <View style={styles.containerMarker}>
                                <Text style={styles.markerTitle}>{marker.name}</Text>
                                <View style={{ flexDirection: 'column', alignContent: 'flex-end', justifyContent: 'flex-end' }}>

                                    <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
                                        <Icon.Ionicons
                                            name={Platform.OS === 'ios' ? 'ios-compass' : 'md-compass'}
                                            size={15}
                                            style={{ marginRight: 4 }}
                                            color="#333"
                                        />
                                        <Text style={styles.markerDistanceCount}>
                                            {marker.materCount} m
        </Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
                                        <Icon.Ionicons
                                            name={Platform.OS === 'ios' ? 'ios-walk' : 'md-walk'}
                                            size={15}
                                            style={{ marginRight: 4 }}
                                            color="#333"
                                        />
                                        <Text style={styles.markerDistanceCount}>
                                            {marker.walkingTime} minutes
        </Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        flexDirection: 'column',
        alignItems: 'stretch',
        backgroundColor: '#fff',
    },
    contentContainer: {
        padding: 8,
    },
    inputBox: {
        padding: 10,
        borderColor: 'gray',
        borderWidth: 1,
        height: 50,
        marginTop: 5,
        marginBottom: 5,
    },
    containerMarkerMain: {
        flexGrow: 2,
    },
    containerMarker: {
        backgroundColor: '#d3d3d3',
        padding: 20,
        margin: 10,
        marginBottom: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    markerTitle: {
        fontWeight: 'bold',
        fontSize: 18
    },
    markerDistanceCount: {
        fontSize: 12
    }
});

const withFirebaseRoomSearch = withFirebase(RoomSearch);

export default withFirebaseRoomSearch;
