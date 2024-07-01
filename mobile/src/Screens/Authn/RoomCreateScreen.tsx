import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  PermissionsAndroid,
  Platform,
  Linking,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Slider from 'react-native-slider';
import DropDownPicker from 'react-native-dropdown-picker';
import Geolocation from 'react-native-geolocation-service';
import {request, PERMISSIONS} from 'react-native-permissions';
import ProfileComponent from '../molecule/ProfileComponent';
import {primaryColor, styles} from '../Styles/Styles'; // Ensure this is correctly imported
import TeamXLogoImage from '../molecule/TeamXLogoImage';
import TeamXErrorText from '../molecule/TeamXErrorText';
import {useDispatch} from 'react-redux';
import {createRoom} from '../../reducers/room/roomSlice';
const RoomCreateScreen = () => {
  const dispatch = useDispatch();
  const [roomName, setRoomName] = useState('individual');
  const [details, setDetails] = useState('good');
  const [availability, setAvailability] = useState(6);
  const [amenities, setAmenities] = useState([
    {name: 'Wi-Fi', image: require('../Images/ic_wifi.png'), checked: true},
    {
      name: 'Kitchen',
      image: require('../Images/ic_kitchen.png'),
      checked: true,
    },
    {
      name: 'Air Conditioning',
      image: require('../Images/ic_airconditioner.png'),
      checked: false,
    },
    {
      name: 'Bathroom',
      image: require('../Images/ic_bathRoom.png'),
      checked: false,
    },
    {
      name: 'Parking',
      image: require('../Images/ic_parking.png'),
      checked: false,
    },
  ]);
  const [address, setAddress] = useState('dummy');
  const [location, setLocation] = useState(null);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [roomImages, setRoomImages] = useState([]); // State to hold room images URI
  const [rent, setRent] = useState(15000);
  const [floor, setFloor] = useState(1);
  const [roomType, setRoomType] = useState('individual'); // State for room type
  const [roomTypeOpen, setRoomTypeOpen] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState('');
  const [telegramLink, setTelegramLink] = useState('');
  const [preferences, setPreferences] = useState([
    {name: 'Vegetarian', checked: true},
    {name: 'Non-Vegetarian', checked: true},
    {name: 'Smoking', checked: false},
    {name: 'Drinking', checked: false},
    
  ]);
  const [errors, setErrors] = useState({}); // State for errors
  const [formState, setFormState] = useState<Record<string, any>>({});

  const [roomNameError, setRoomNameError] = useState('');
  const [detailsError, setDetailsError] = useState('');
  const [availabilityError, setAvailabilityError] = useState('');
  const [locationError, setLocationError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [rentError, setRentError] = useState('');
  const [floorError, setFloorError] = useState('');
  const [roomTypeError, setRoomTypeError] = useState(''); // State for room type
  const [whatsappLinkError, setWhatsappLinkError] = useState('');
  const [telegramLinkError, setTelegramLinkError] = useState('');
  const [lookingForMale, setLookingForMale] = useState(false);
const [lookingForFemale, setLookingForFemale] = useState(false);
const [lookingForFamily, setLookingForFamily] = useState(false);
  

  const [showMap, setShowMap] = useState(false); // State to control map visibility

  const detailsRef = useRef(null);
  const rentRef = useRef(null);
  const floorRef = useRef(null);
  const whatsappLinkRef = useRef(null);
  const telegramLinkRef = useRef(null);
  const addressRef = useRef(null);

  const handleSubmitData = async () => {
    let hasError = false;
    if (!roomName) {
      setRoomNameError('Please provide your room name');
      hasError = true;
    } else {
      setRoomNameError('');
    }

    if (!details) {
      setDetailsError('Please provide your details ');
      hasError = true;
    } else {
      setDetailsError('');
    }
    if (availability === 0) {
      setAvailabilityError('Please select a capacity of at least 1');
      hasError = true;
    } else {
      setAvailabilityError('');
    }

    if (!whatsappLink) {
      setWhatsappLinkError('Please provide your whatsapp link');
      hasError = true;
    } else {
      setWhatsappLinkError('');
    }
    if (!telegramLink) {
      setTelegramLinkError('Please provide your telegram link');
      hasError = true;
    } else {
      setTelegramLinkError('');
    }
    if (!address) {
      setAddressError('Please provide your address');
      hasError = true;
    } else {
      setAddressError('');
    }
    // if (!location) {
    //   setLocationError('Please provide your location');
    //   hasError = true;
    // } else {
    //   setLocationError('');
    // }
    if (!rent) {
      setRentError('Please provide your rent');
      hasError = true;
    } else {
      setRentError('');
    }
    if (!floor) {
      setFloorError('Please provide your floor');
      hasError = true;
    } else {
      setFloorError('');
    }
    if (!roomName) {
      setRoomTypeError('Please select your room type');
      hasError = true;
    } else {
      setRoomTypeError('');
    }

    if (!hasError) {
      const  gender='male';
      const formData = {
        roomName,
        details,
        availability,
        amenities,
        address,
        location,
        roomImages,
        rent,
        floor,
        roomType,
        whatsappLink,
        telegramLink,
        preferences,
      };
      await dispatch(createRoom( 
      roomName,
      details,
      availability,
      roomType,
      floor,
      rent,
      location,
      amenities,
      gender
      ));
      console.log('Form Data:', formData);
      Alert.alert('Success', 'Room created successfully');
      // navigation.navigate() // Uncomment and implement navigation if needed
    }
  };

  const requestLocationPermission = async () => {
    try {
      const result = await request(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
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
      Alert.alert(
        'Permission Denied',
        'Location permission is required to capture your location.',
      );
      return;
    }

    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        const locationString = `${latitude}, ${longitude}`;
        console.log('Location fetched:', locationString); // Log the fetched location
        setLocation(locationString);
      },
      error => {
        Alert.alert('Error', 'Unable to retrieve your location.');
        console.error(error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };
  const handleAmenityChange = index => {
    const updatedAmenities = [...amenities];
    updatedAmenities[index].checked = !updatedAmenities[index].checked;
    setAmenities(updatedAmenities);
  };

  const handlePreferenceChange = index => {
    const updatedPreference = [...preferences];
    updatedPreference[index].checked = !updatedPreference[index].checked;
    setPreferences(updatedPreference);
  };

  const handleAddRoomImage = imageUri => {
    setRoomImages([...roomImages, imageUri]);
  };

  const handleRemoveRoomImage = index => {
    if (index >= 0 && index < roomImages.length) {
      const updatedImages = [...roomImages];
      updatedImages.splice(index, 1);
      setRoomImages(updatedImages);
    }
  };

  const getLatitudeDirection = lat => (lat >= 0 ? 'N' : 'S');
  const getLongitudeDirection = lon => (lon >= 0 ? 'E' : 'W');

  const handleLookingForMaleChange = () => {
    setLookingForMale(!lookingForMale);
  };
  
  const handleLookingForFemaleChange = () => {
    setLookingForFemale(!lookingForFemale);
  };
  
  const handleLookingForFamilyChange = () => {
    setLookingForFamily(!lookingForFamily);
  };
  

  const renderRoomImages = () => {
    const [roomName, setRoomName] = useState('');
    const [details, setDetails] = useState('');
    const [availability, setAvailability] = useState(0);
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
    const [floor, setFloor] = useState('');
    const [roomType, setRoomType] = useState(''); // State for room type
    const [roomTypeOpen, setRoomTypeOpen] = useState(false);
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
    const [detailsError, setDetailsError] = useState('');
    const [availabilityError, setAvailabilityError] = useState('');
    const [locationError, setLocationError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [rentError, setRentError] = useState('');
    const [floorError, setFloorError] = useState('');
    const [roomTypeError, setRoomTypeError] = useState(''); // State for room type
    const [whatsappLinkError, setWhatsappLinkError] = useState('')
    const [telegramLinkError, setTelegramLinkError] = useState('')

    const [showMap, setShowMap] = useState(false); // State to control map visibility



    const detailsRef = useRef(null);
    const rentRef = useRef(null);
    const floorRef = useRef(null);
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

        if (!details) {
            setDetailsError('Please provide your details ')
            hasError = true;
        } else {
            setDetailsError('')
        }
        if (availability === 0) {
            setAvailabilityError('Please select a capacity of at least 1')
            hasError = true;
        } else {
            setAvailabilityError('')
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
        // if (!location) {
        //     setLocationError('Please provide your location')
        //     hasError = true;
        // } else {
        //     setLocationError('')
        // }
        if (!rent) {
            setRentError('Please provide your rent')
            hasError = true;
        } else {
            setRentError('')
        }
        if (!floor) {
            setFloorError('Please provide your floor')
            hasError = true;
        } else {
            setFloorError('')
        }
        if (!roomName) {
            setRoomTypeError('Please select your room type');
            hasError = true;
        } else {
            setRoomTypeError('');
        }

        if (!hasError) {
            const formData = {
                roomName,
                details,
                availability,
                amenities,
                address,
                location,
                roomImages,
                rent,
                floor,
                roomType,
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

    
    // const renderRoomImages = () => {
    //     return (
    //         <ScrollView style={styles.imageContainer}>
    //             <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
    //                 <ProfileComponent setImageUri={handleAddRoomImage} />
    //             </View>
    //             {roomImages.map((imageObj, index) => (
    //                 <View style={{ height: 70, width: 280, backgroundColor: '#e6daf1', paddingTop: 10, paddingBottom: 10, paddingLeft: 10, borderRadius: 10, marginTop: 10 }}>
    //                     <View key={index} style={styles.roomImageWrapper}>
    //                         <View style={{ flexDirection: 'row' }}>
    //                             <Image source={{ uri: imageObj }} style={styles.roomImage} />
    //                             <Text style={{ color: '#000', fontSize: 14, marginRight: 80 }}>
    //                                 {imageObj.length > 50 ? `${imageObj.substring(0, 50)}...` : imageObj}

    //                             </Text>
    //                         </View>
    //                         <TouchableOpacity
    //                             style={styles.removeButton}
    //                             onPress={() => handleRemoveRoomImage(index)}
    //                         >
    //                             <Image source={require('../Images/ic_delete.png')} style={styles.deleteIcon} />
    //                         </TouchableOpacity>
    //                     </View>
    //                 </View>
    //             ))}

    //         </ScrollView>
    //     );
    // };
    return (
      <ScrollView style={styles.imageContainer}>
        <View style={{justifyContent: 'center', alignSelf: 'center'}}>
          <ProfileComponent setImageUri={handleAddRoomImage} />
        </View>
        {roomImages.map((imageObj, index) => (
          <View
            style={{
              height: 70,
              width: 280,
              backgroundColor: '#e6daf1',
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 10,
              borderRadius: 10,
              marginTop: 10,
            }}>
            <View key={index} style={styles.roomImageWrapper}>
              <View style={{flexDirection: 'row'}}>
                <Image source={{uri: imageObj}} style={styles.roomImage} />
                <Text style={{color: '#000', fontSize: 14, marginRight: 80}}>
                  {imageObj.length > 50
                    ? `${imageObj.substring(0, 50)}...`
                    : imageObj}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveRoomImage(index)}>
                <Image
                  source={require('../Images/ic_delete.png')}
                  style={styles.deleteIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    );
  };
  return (
    <ScrollView style={styles.createcontainer}>
      <View style={{alignSelf: 'center'}}>
        <TeamXLogoImage />
      </View>
      <Text style={styles.createtitle}>Create Room</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Room Name</Text>
        <TextInput
          style={[styles.input]}
          value={roomName}
          onChangeText={setRoomName}
          placeholder="Enter room name"
          onSubmitEditing={() => detailsRef.current.focus()}
        />
        <TeamXErrorText errorText={roomNameError} />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Details</Text>
        <TextInput
          ref={detailsRef}
          style={[styles.input, {height: 100, textAlignVertical: 'top'}]}
          value={details}
          onChangeText={setDetails}
          multiline
          placeholder="Enter your details"
          onSubmitEditing={() => rentRef.current.focus()}
        />
        <TeamXErrorText errorText={detailsError} />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Rent</Text>
        <TextInput
          ref={rentRef}
          style={[styles.input]}
          value={rent}
          onChangeText={setRent}
          keyboardType="numeric"
          placeholder="Enter your room rent"
          onSubmitEditing={() => floorRef.current.focus()}
        />
        <TeamXErrorText errorText={rentError} />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Floor</Text>
        <TextInput
          ref={floorRef}
          style={[styles.input]}
          value={floor}
          onChangeText={setFloor}
          keyboardType="numeric"
          placeholder="Enter your room floor"
          onSubmitEditing={() => whatsappLinkRef.current.focus()}
        />
        <TeamXErrorText errorText={floorError} />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Looking for</Text>
        <View style={styles.checkboxContainer}>
    <CheckBox
      value={lookingForMale}
      onValueChange={handleLookingForMaleChange}
    />
    <Text style={styles.checkboxLabel}>Male</Text>
  </View>
  <View style={styles.checkboxContainer}>
    <CheckBox
      value={lookingForFemale}
      onValueChange={handleLookingForFemaleChange}
    />
    <Text style={styles.checkboxLabel}>Female</Text>
  </View>
  <View style={styles.checkboxContainer}>
    <CheckBox
      value={lookingForFamily}
      onValueChange={handleLookingForFamilyChange}
    />
    <Text style={styles.checkboxLabel}>Family</Text>
  </View>

      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Room Type</Text>
        <DropDownPicker
          open={roomTypeOpen}
          value={roomType}
          items={[
            {label: 'Individual', value: 'individual'},
            {label: 'Apartment', value: 'apartment'},
          ]}
          setOpen={setRoomTypeOpen}
          setValue={setRoomType}
          containerStyle={{height: 40, marginBottom: 10}}
          style={[styles.input]}
          placeholder="Select your room type"
          placeholderStyle={{color: '#B3B3B3'}}
          textStyle={{fontSize: 18}}
        />
        <TeamXErrorText errorText={roomTypeError} />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Availability</Text>
        <Slider
          value={availability}
          onValueChange={setAvailability}
          minimumValue={0}
          maximumValue={20}
          step={1}
          minimumTrackTintColor="#814ABF"
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="#814ABF"
        />
        <Text style={{color: '#814ABF'}}>
          Selected availability: {availability}
        </Text>
        <TeamXErrorText errorText={availabilityError} />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Whatsapp Link</Text>
        <View
          style={[styles.input, {flexDirection: 'row', alignItems: 'center'}]}>
          <Image
            source={require('../Images/ic_whatsApp.png')}
            tintColor={'white'}
            style={{marginRight: 10, tintColor: '#1B8755'}}
          />
          <TextInput
            ref={whatsappLinkRef}
            style={[styles.linkText, {flex: 1}]}
            placeholder="Enter WhatsApp link"
            value={whatsappLink}
            onChangeText={setWhatsappLink}
            onSubmitEditing={() => telegramLinkRef.current.focus()}
          />
        </View>
        <TeamXErrorText errorText={whatsappLinkError} />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Telegram Link</Text>
        <View
          style={[styles.input, {flexDirection: 'row', alignItems: 'center'}]}>
          <Image
            source={require('../Images/ic_telegram.png')}
            tintColor={'white'}
            style={{marginRight: 10, tintColor: '#3DA7DC'}}
          />
          <TextInput
            ref={telegramLinkRef}
            style={[styles.linkText, {flex: 1}]}
            placeholder="Enter Telegram link"
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
            <View
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <CheckBox
                value={amenity.checked}
                onValueChange={() => handleAmenityChange(index)}
                style={styles.createcheckbox}
              />
              <Image
                source={amenity.image}
                style={{width: 24, height: 24, marginRight: 10}}
              />
              <Text>{amenity.name}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Address</Text>
        <TextInput
          ref={addressRef}
          style={[styles.input]}
          value={address}
          onChangeText={setAddress}
          placeholder="Enter your address"
        />
        <TeamXErrorText errorText={addressError} />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Location</Text>
        <TouchableOpacity
  style={[styles.button, { marginBottom: 10, width:150,height:40 }]}
  onPress={captureLocation}
>
  <Text style={[styles.buttonText, { fontSize: 14 }]}>Capture Location</Text>
</TouchableOpacity>

        <Text style={{ color: '#814ABF' }}>{location ? location : 'No location selected'}</Text>
        <TeamXErrorText errorText={locationError} />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Latitude</Text>
        <View style={styles.coordinatesContainer}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            value={latitude}
            onChangeText={setLatitude}
            keyboardType="numeric"
            placeholder="Enter latitude"
          />
          <Text style={styles.coordinateDirection}>
            {latitude ? getLatitudeDirection(parseFloat(latitude)) : 'N/S'}
          </Text>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Longitude</Text>
        <View style={styles.coordinatesContainer}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            value={longitude}
            onChangeText={setLongitude}
            keyboardType="numeric"
            placeholder="Enter longitude"
          />
          <Text style={styles.coordinateDirection}>
            {longitude ? getLongitudeDirection(parseFloat(longitude)) : 'E/W'}
          </Text>
        </View>
      </View>


      <View style={styles.inputGroup}>
        <Text style={styles.label}>Room Images</Text>
        <View>{renderRoomImages()}</View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Preferences</Text>
        <View style={styles.checkboxGroup}>
          {preferences.map((preference, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <CheckBox
                value={preference.checked}
                style={styles.createcheckbox}
                onValueChange={() => handlePreferenceChange(index)}
              />
              <Text>{preference.name}</Text>
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmitData}>
        <Text style={styles.createbuttonText}>Create</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default RoomCreateScreen;
