import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View, Text, Button, Alert, Platform, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { primaryColor } from "../Styles/Styles";

const MapsScreen = ({navigation,route}) => {
    const [isLoading, setIsLoading] = useState(true);
    const { latitude, longitude } = route.params || {};

    const [selectedLocation, setSelectedLocation] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
    });

    const [region, setRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    useEffect(() => {
        setIsLoading(true); // Start loading when the component mounts

        requestLocationPermission();
    }, []);
     
    const requestLocationPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: "Location Access Permission",
                        message: "We need to access your location to show your current position on the map.",
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK"
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    getCurrentLocation();
                } else {
                    Alert.alert('Permission Denied', 'Location permission is required to use this feature.');
                    setIsLoading(false);
                }
            } catch (err) {
                console.warn(err);
                setIsLoading(false);
            }
        } else {
            getCurrentLocation();
        }
    };

    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;

                setSelectedLocation({ latitude, longitude });
                setRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                });
                setTimeout(() => {
                    setIsLoading(false);
                }, 500);
            },
            (error) => {

                Alert.alert('Error', 'Failed to get current location');
                setIsLoading(false);
            },
            { enableHighAccuracy: true, timeout: 20000 }
        );
    };

    // Handle map tap to set marker location
    const handleMapPress = (e) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;
        setSelectedLocation({ latitude, longitude });
    };

    // Handle marker drag to update marker location
    const handleMarkerDragEnd = (e) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;
        setSelectedLocation({ latitude, longitude });
    };

  const handleSaveLocation = () => {
    Alert.alert(
        'Confirm Location',
        `Latitude: ${selectedLocation.latitude}\nLongitude: ${selectedLocation.longitude}`,
        [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Save',
                onPress: () => {
                    navigation.navigate('RoomCreateScreen', {
                        latitude: selectedLocation.latitude,
                        longitude: selectedLocation.longitude,
                    });
                },
            },
        ]
    );
};

if (isLoading) {
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={primaryColor} />
        </View>
    );
}

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <MapView
                    style={styles.mapStyle}
                    region={region} // Use region to center the map
                    showsUserLocation={true} // Show the user's location
                    customMapStyle={mapStyle}
                    onPress={handleMapPress} // Update location on map tap
                  >
                    <Marker
                        draggable
                        coordinate={selectedLocation}
                        pinColor="red" // Set the color of the marker to red
                        onDragEnd={handleMarkerDragEnd}
                        title={'Selected Location'}
                        description={`Lat: ${selectedLocation.latitude}, Lng: ${selectedLocation.longitude}`}
                    />
                </MapView>
                <View style={styles.coordinateDisplay}>
                    <Text style={styles.coordinateText}>Latitude: {selectedLocation.latitude}</Text>
                    <Text style={styles.coordinateText}>Longitude: {selectedLocation.longitude}</Text>
                </View>
                {/* <Button title="Save Location" onPress={handleSaveLocation} /> */}
                <TouchableOpacity style={styles.saveButton} onPress={handleSaveLocation}>
                    <Image source={require('../../Screens/Images/ic_save.png')} style={styles.saveIcon} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default MapsScreen;

const mapStyle = [
    { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
    {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }],
    },
    {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }],
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{ color: '#263c3f' }],
    },
    {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#6b9a76' }],
    },
    {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#38414e' }],
    },
    {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#212a37' }],
    },
    {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#9ca5b3' }],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#746855' }],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#1f2835' }],
    },
    {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#f3d19c' }],
    },
    {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{ color: '#2f3948' }],
    },
    {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }],
    },
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#17263c' }],
    },
    {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#515c6d' }],
    },
    {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#17263c' }],
    },
];

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    mapStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    coordinateDisplay: {
        position: 'absolute',
        top: 10,
        left: 10,
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 5,
    },
    coordinateText: {
        color: 'white',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    saveButton: {
        position: 'absolute',
        bottom: 80,
        right: 20,
        backgroundColor: primaryColor,
        borderRadius: 30, // Make the button round
        width: 60, // Set width for the button
        height: 60, // Set height for the button
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    saveIcon: {
        width: 30, // Adjust the icon size
        height: 30, // Adjust the icon size
        tintColor: '#FFF', // Optional: Tint the image color if needed
    },
});
