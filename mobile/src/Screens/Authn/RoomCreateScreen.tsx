import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Alert, PermissionsAndroid, Platform, Linking } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Slider from 'react-native-slider';
import Geolocation from 'react-native-geolocation-service';
import { request, PERMISSIONS } from 'react-native-permissions';
import ProfileComponent from '../molecule/ProfileComponent';
import { primaryColor } from '../Styles/Styles'; // Ensure this is correctly imported
import TeamXLogoImage from '../molecule/TeamXLogoImage';
import TeamXErrorText from '../molecule/TeamXErrorText';
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
    const [whatsappLink, setWhatsappLink] = useState('')
    const [telegramLink, setTelegramLink] = useState('')
    const [preferences, setPreferences] = useState([
        { name: 'Vegetarian', checked: false },
        { name: 'Non-Vegetarian', checked: false },
        { name: 'Smoking', checked: false },
        { name: 'Drinking', checked: false },
    ]);
    const [errors, setErrors] = useState({}); // State for errors
    const [formState, setFormState] = useState<Record<string, any>>({});

    const [roomNameError, setRoomNameError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [capacityError, setCapacityError] = useState('');
    const [locationError, setLocationError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [rentError, setRentError] = useState('');
    const [whatsappLinkError, setWhatsappLinkError] = useState('')
    const [telegramLinkError, setTelegramLinkError] = useState('')
    const [showMap, setShowMap] = useState(false); // State to control map visibility



    const descriptionRef = useRef(null);
    const rentRef = useRef(null);
    const whatsappLinkRef = useRef(null)
    const telegramLinkRef = useRef(null)
    const addressRef = useRef(null);


    const handleSubmitData = () => {
        let hasError = false;
        if (!roomName) {
            setRoomNameError('Please provide your room name')
            hasError = true;
        } else {
            setRoomNameError('')
        }

        if (!description) {
            setDescriptionError('Please provide your description ')
            hasError = true;
        } else {
            setDescriptionError('')
        }
        if (capacity === 0) {
            setCapacityError('Please select a capacity of at least 1')
            hasError = true;
        } else {
            setCapacityError('')
        }

        if (!whatsappLink) {
            setWhatsappLinkError('Please provide your whatsapp link')
            hasError = true;
        } else {
            setWhatsappLinkError('')
        }
        if (!telegramLink) {
            setTelegramLinkError('Please provide your telegram link')
            hasError = true;
        } else {
            setTelegramLinkError('')
        }
        if (!address) {
            setAddressError('Please provide your address')
            hasError = true;
        } else {
            setAddressError('')
        }
        if (!location) {
            setLocationError('Please provide your location')
            hasError = true;
        } else {
            setLocationError('')
        }
        if (!rent) {
            setRentError('Please provide your rent')
            hasError = true;
        } else {
            setRentError('')
        }
        if (!hasError) {
            const formData = {
                roomName,
                description,
                capacity,
                amenities,
                address,
                location,
                roomImages,
                rent,
                whatsappLink,
                telegramLink,
                preferences,
            };
            console.log('Form Data:', formData);
            Alert.alert('Success', 'Room created successfully');
            // navigation.navigate() // Uncomment and implement navigation if needed
        }
    };
    
    
    
    

const requestLocationPermission = async () => {
        try {
            const result = await request(
                Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            );
            return result === 'granted';
        } catch (err) {
            console.warn(err);
            return false;
        }
    };

    const captureLocation = async () => {
        const hasPermission = await requestLocationPermission();
        if (!hasPermission) {
            Alert.alert('Permission Denied', 'Location permission is required to capture your location.');
            return;
        }

        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const locationString = `${latitude}, ${longitude}`;
                console.log('Location fetched:', locationString); // Log the fetched location
                setLocation(locationString);

            },
            (error) => {
                Alert.alert('Error', 'Unable to retrieve your location.');
                console.error(error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
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
        return (
            <ScrollView style={styles.imageContainer}>
                <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
                    <ProfileComponent setImageUri={handleAddRoomImage} />
                </View>
                {roomImages.map((imageObj, index) => (
                    <View style={{ height: 70, width: 280, backgroundColor: '#e6daf1', paddingTop: 10, paddingBottom: 10, paddingLeft: 10, borderRadius: 10, marginTop: 10 }}>
                        <View key={index} style={styles.roomImageWrapper}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={{ uri: imageObj }} style={styles.roomImage} />
                                <Text style={{ color: '#000', fontSize: 14, marginRight: 80 }}>
                                    {imageObj.length > 50 ? `${imageObj.substring(0, 50)}...` : imageObj}

                                </Text>
                            </View>
                            <TouchableOpacity
                                style={styles.removeButton}
                                onPress={() => handleRemoveRoomImage(index)}
                            >
                                <Image source={require('../Images/ic_delete.png')} style={styles.deleteIcon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}

            </ScrollView>
        );
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
                    style={[styles.input]}
                    value={roomName}
                    onChangeText={setRoomName}
                    placeholder='Enter room name'
                    onSubmitEditing={() => descriptionRef.current.focus()}
                />
                <TeamXErrorText errorText={roomNameError} />

            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Description</Text>
                <TextInput
                    ref={descriptionRef}
                    style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    placeholder='Enter your description'
                    onSubmitEditing={() => rentRef.current.focus()}
                />
                <TeamXErrorText errorText={descriptionError} />

            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Rent</Text>
                <TextInput
                    ref={rentRef}
                    style={[styles.input]}
                    value={rent}
                    onChangeText={setRent}
                    keyboardType="numeric"
                    placeholder='Enter your room rent'
                    onSubmitEditing={() => whatsappLinkRef.current.focus()}

                />
                <TeamXErrorText errorText={rentError} />

            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Capacity</Text>
                <Slider
                    value={capacity}
                    onValueChange={setCapacity}
                    minimumValue={0}
                    maximumValue={20}
                    step={1}
                    minimumTrackTintColor='#814ABF'
                    maximumTrackTintColor="#d3d3d3"
                    thumbTintColor='#814ABF'
                />
                <Text style={{ color: '#814ABF' }}>Selected Capacity: {capacity}</Text>
                <TeamXErrorText errorText={capacityError} />

            </View>


            <View style={styles.inputGroup}>
                <Text style={styles.label}>Whatsapp Link</Text>
                <View style={[styles.input, { flexDirection: 'row', alignItems: 'center', }]}>
                    <Image source={require('../Images/ic_whatsApp.png')} tintColor={'white'} style={{ marginRight: 10, tintColor: '#1B8755' }} />
                    <TextInput
                        ref={whatsappLinkRef}
                        style={[styles.linkText, { flex: 1,}]}
                        placeholder='Enter WhatsApp link'
                        value={whatsappLink}
                        onChangeText={setWhatsappLink}
                        onSubmitEditing={() => telegramLinkRef.current.focus()}

                    />

                </View>
                <TeamXErrorText errorText={whatsappLinkError} />

            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Telegram Link</Text>
                <View style={[styles.input, { flexDirection: 'row', alignItems: 'center', }]}>
                    <Image source={require('../Images/ic_telegram.png')} tintColor={'white'} style={{ marginRight: 10, tintColor: '#3DA7DC' }} />
                    <TextInput
                        ref={telegramLinkRef}
                        style={[styles.linkText, { flex: 1,  }]}
                        placeholder='Enter Telegram link'
                        value={telegramLink}
                        onChangeText={setTelegramLink}
                        onSubmitEditing={() => addressRef.current.focus()}

                    />

                </View>
                <TeamXErrorText errorText={telegramLinkError} />

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
                    ref={addressRef}
                    style={[styles.input, errors.address && styles.inputError]}
                    value={address}
                    onChangeText={setAddress}
                    placeholder='Enter your address'
                />
                <TeamXErrorText errorText={addressError} />

            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Location</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                        style={[styles.input, { flex: 1 }, errors.location && styles.inputError]}
                        value={location}
                        onChangeText={setLocation}
                        placeholder='Select your location'
                    />
                    <View>
                        <TouchableOpacity onPress={captureLocation} >
                            <Image source={require('../Images/ic_location.png')} style={{ width: 30, height: 34, marginLeft: 10, tintColor: primaryColor }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <TeamXErrorText errorText={locationError} />

            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Room Images</Text>
                <View  >
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
    slider: {
        width: '100%',
        height: 40,
    },
    sliderValue: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 10,
        color: '#333',
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
    inputError: {
        borderColor: 'red',
    },
    linkText: {
        fontSize: 18,
        color: '#000',
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
        paddingBottom: 20,
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
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 10,
    },
    roomImageWrapper: {
        marginRight: 10,
        position: 'relative',
    },


    removeButton: {
        position: 'absolute',
        top: 5,
        right: -6,



    },
    deleteIcon: {
        width: 30,
        height: 30,
        tintColor: primaryColor, // Color of delete icon
    },
});

export default RoomCreateScreen;
