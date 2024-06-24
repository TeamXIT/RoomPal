import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Alert, PermissionsAndroid, Platform, Linking } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Geolocation from 'react-native-geolocation-service';
import ProfileComponent from '../molecule/ProfileComponent';
import { primaryColor } from '../Styles/Styles'; // Ensure this is correctly imported
import TeamXLogoImage from '../molecule/TeamXLogoImage';
const RoomCreateScreen = () => {
    const [roomName, setRoomName] = useState('');
    const [description, setDescription] = useState('');
    const [capacity, setCapacity] = useState(0);
    const [amenities, setAmenities] = useState([
        { name: 'Wi-Fi', image: require('../Images/ic_wifi.png'), checked: false },
        { name: 'Kitchen', image: require('../Images/ic_kitchen.png'), checked: false },
        { name: 'Air Conditioning', image: require('../Images/ic_airconditioner.png'), checked: false },
        { name: 'Bathroom', image: require('../Images/ic_bathRoom.png'), checked: false },
        { name: 'Parking', image: require('../Images/ic_parking.png'), checked: false },
    ]);
    const [address, setAddress] = useState('');
    const [location, setLocation] = useState(null);
    const [roomImages, setRoomImages] = useState([]); // State to hold room images URI
    const [rent, setRent] = useState('');
    const [preferences, setPreferences] = useState([
        { name: 'Vegetarian', checked: false },
        { name: 'Non-Vegetarian', checked: false },
        { name: 'Smoking', checked: false },
        { name: 'Drinking', checked: false },
    ]);
    const [error, setError] = useState(null);

    const getLocation = async () => {
        const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        if (granted) {
            Geolocation.getCurrentPosition(
                position => {
                    console.log(position);
                    setLocation(position);
                },
                error => {
                    // See error code charts below.
                    console.log(error.code, error.message);
                    setLocation(false);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
            );
        } else {
            const permission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            if (permission === PermissionsAndroid.RESULTS.GRANTED) {
                Geolocation.getCurrentPosition(
                    position => {
                        console.log(position);
                        setLocation(position);
                    },
                    error => {
                        // See error code charts below.
                        console.log(error.code, error.message);
                        setLocation(false);
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
                );
            } else if (permission === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
                Alert.alert(
                    'Location Permission',
                    'You need to enable location permission in the device settings to use this feature.',
                    [
                        {
                            text: 'OK',
                            onPress: () => Linking.openSettings(),
                        },
                    ],
                    { cancelable: false },
                );
            } else {
                console.log('Location permission not granted');
            }
        }
    };

const handleAmenityChange = (index) => {
        const updatedAmenities = [...amenities];
        updatedAmenities[index].checked = !updatedAmenities[index].checked;
        setAmenities(updatedAmenities);
    };

    const handlePreferenceChange = (index) => {
        const updatedPreference = [...preferences];
        updatedPreference[index].checked = !updatedPreference[index].checked;
        setPreferences(updatedPreference);
    };

    const handleSubmitData = () => {
        console.log('Form submitted:', {
            roomName,
            description,
            capacity,
            amenities,
            address,
            location,
            roomImages,
            rent,
            preferences,
        });
    };

    const increaseCapacity = () => {
        setCapacity(capacity + 1);
    };

    const decreaseCapacity = () => {
        if (capacity > 0) {
            setCapacity(capacity - 1);
        }
    };

    const handleAddRoomImage = (imageUri) => {
        setRoomImages([...roomImages, imageUri]);
    };

    const handleRemoveRoomImage = (index) => {
        if (index >= 0 && index < roomImages.length) {
            const updatedImages = [...roomImages];
            updatedImages.splice(index, 1);
            setRoomImages(updatedImages);
        }
    };

    const renderRoomImages = () => {
        const rows = [];
        for (let i = 0; i < roomImages.length; i += 3) {
            const rowImages = roomImages.slice(i, i + 3);
            rows.push(
                <View key={i} style={styles.imageRow}>
                    {rowImages.map((imageUri, index) => (
                        <View key={index} style={styles.imageWrapper}>
                            <Image source={{ uri: imageUri }} style={styles.roomImage} />
                            <TouchableOpacity
                                style={styles.removeButton}
                                onPress={() => handleRemoveRoomImage(i + index)}
                            >
                                <Image source={require('../Images/ic_delete.png')} style={styles.deleteIcon} />
                            </TouchableOpacity>
                        </View>
                    ))}
                    {rowImages.length < 3 && (
                        <ProfileComponent setImageUri={handleAddRoomImage} />
                    )}
                </View>
            );
        }
        if (roomImages.length % 3 === 0) {
            rows.push(
                <View key={roomImages.length} style={styles.imageRow}>
                    <ProfileComponent setImageUri={handleAddRoomImage} />
                </View>
            );
        }
        return rows;
    };

    return (
        <ScrollView style={styles.container}>
            <View style={{ alignSelf: 'center' }}>
                <TeamXLogoImage />
            </View>
            <Text style={styles.title}>Create Room</Text>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Room Name</Text>
                <TextInput
                    style={styles.input}
                    value={roomName}
                    onChangeText={setRoomName}
                    placeholder='Enter room name'
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Description</Text>
                <TextInput
                    style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    placeholder='Enter your description'
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Rent</Text>
                <TextInput
                    style={styles.input}
                    value={rent}
                    onChangeText={setRent}
                    keyboardType="numeric"
                    placeholder='Enter your room rent'
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Capacity</Text>
                <View style={styles.capacityContainer}>
                    <TextInput
                        style={[styles.input, styles.capacityInput, { marginRight: 20 }]}
                        value={capacity.toString()}
                        editable={false}
                    />
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity onPress={increaseCapacity}>
                            <Image source={require('../Images/ic_plus.png')} style={{ height: 20, width: 20 }} tintColor={primaryColor} />
                        </TouchableOpacity>
                        <View style={[styles.capacityButton, { alignItems: 'center' }]}>
                            <Image source={require('../Images/ic_capacity.png')} tintColor={primaryColor} />
                        </View>
                        <TouchableOpacity onPress={decreaseCapacity}>
                            <Image source={require('../Images/ic_minus.png')} style={{ height: 20, width: 20 }} tintColor={primaryColor} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Whatsapp Link</Text>
                <TouchableOpacity
                    style={[styles.input, { flexDirection: 'row', alignItems: 'center', gap: 20, backgroundColor: '#1B8755' }]}>
                    <Image source={require('../Images/ic_whatsApp.png')} tintColor={'white'} />
                    <Text style={styles.linkText}>WhatsApp Link</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Telegram Link</Text>
                <TouchableOpacity
                    style={[styles.input, { flexDirection: 'row', alignItems: 'center', gap: 20, backgroundColor: '#3DA7DC' }]}>
                    <Image source={require('../Images/ic_telegram.png')} tintColor={'white'} />
                    <Text style={styles.linkText}>Telegram Link</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Amenities</Text>
                <View style={styles.checkboxGroup}>
                    {amenities.map((amenity, index) => (
                        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                            <CheckBox
                                value={amenity.checked}
                                onValueChange={() => handleAmenityChange(index)}
                                style={styles.checkbox}
                            />
                            <Image source={amenity.image} style={{ width: 24, height: 24, marginRight: 10 }} />
                            <Text>{amenity.name}</Text>
                        </View>
                    ))}
                </View>
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Address</Text>
                <TextInput
                    style={styles.input}
                    value={address}
                    onChangeText={setAddress}
                    placeholder='Enter your address'
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Location</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                        style={[styles.input, { flex: 1 }]}
                        value={location}
                        onChangeText={setLocation}
                        placeholder='Select your location'
                    />
                    <View>
                        <TouchableOpacity onPress={getLocation} >
                            <Image source={require('../Images/ic_location.png')} style={{ width: 24, height: 24, marginLeft: 10 }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Room Images</Text>
                <View style={styles.imageContainer}>
                    {renderRoomImages()}
                </View>
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Preferences</Text>
                <View style={styles.checkboxGroup}>
                    {preferences.map((preference, index) => (
                        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                            <CheckBox
                                value={preference.checked}
                                style={styles.checkbox}
                                onValueChange={() => handlePreferenceChange(index)}
                            />
                            <Text>{preference.name}</Text>
                        </View>
                    ))}
                </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmitData}>
                <Text style={styles.buttonText}>Create</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFFFFF'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        alignSelf: 'center',
        color: primaryColor,
    },
    inputGroup: {
        marginBottom: 15,
    },
    label: {
        color: primaryColor,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        height: 50,
        borderColor: '#000',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 10,
        fontSize: 18,
        color: '#000',
    },
    linkText: {
        fontSize: 18,
        color: '#fff',
    },
    capacityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    capacityInput: {
        flex: 1,
        textAlign: 'center',
    },
    capacityButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 5,
        marginHorizontal: 5,
        borderColor: primaryColor,
        borderWidth: 2,
    },
    checkboxGroup: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    checkbox: {
        marginRight: 10,
    },
    button: {
        backgroundColor: primaryColor,
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 40,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    imageContainer: {
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 10,

        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 10,


    },
    imageRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 10,
    },
    roomImage: {
        width: 60,
        height: 60,
        borderRadius: 5,
        marginRight: 10,
    },
    imageWrapper: {
        position: 'relative',
    },
    removeButton: {
        position: 'absolute',
        top: -3,
        right: 2,



    },
    deleteIcon: {
        width: 20,
        height: 20,
        tintColor: '#fff', // Color of delete icon
    },
});

export default RoomCreateScreen;
