import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert, Platform, } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Slider from 'react-native-slider';
import DropDownPicker from 'react-native-dropdown-picker';
import { request, PERMISSIONS } from 'react-native-permissions';
import ProfileComponent from '../molecule/ProfileComponent'; // Ensure this is correctly imported
import TeamXErrorText from '../molecule/TeamXErrorText';
import { useDispatch } from 'react-redux';
import { createRoom } from '../../reducers/room/roomSlice';
import { RadioButton } from 'react-native-paper';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../Styles/Styles';

const RoomCreateScreen = ({ route,navigation, setTabBarVisibility }) => {
  const dispatch = useDispatch();
  const [roomName, setRoomName] = useState('');
  const [details, setDetails] = useState([]);;
  const [detail, setDetail] = useState('');
  const [availability, setAvailability] = useState(1);
  const [amenities, setAmenities] = useState([
    { name: 'Wi-Fi', image: require('../Images/ic_wifi.png'), checked: true },
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
      name: 'washer',
      image: require('../Images/ic_bathRoom.png'),
      checked: false,
    },
    {
      name: 'Parking',
      image: require('../Images/ic_parking.png'),
      checked: false,
    },
  ]);
  const [address, setAddress] = useState('');
  let [location, setLocation] = useState([]);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [roomImages, setRoomImages] = useState([]); // State to hold room images URI
  const [imagePaths, setImagePaths] = useState([]); // State to hold image file paths
  const [rent, setRent] = useState(15000);
  const [floor, setFloor] = useState(1);
  const [roomType, setRoomType] = useState(''); // State for room type
  const [roomTypeOpen, setRoomTypeOpen] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState('');
  const [telegramLink, setTelegramLink] = useState('');
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
  const [whatsappLinkError, setWhatsappLinkError] = useState('');
  const [telegramLinkError, setTelegramLinkError] = useState('');
  const [lookingFor, setLookingFor] = useState('');
  const [userId, setUserId] = useState('');
  // const [lookingForFemale, setLookingForFemale] = useState(false);
  // const [lookingForFamily, setLookingForFamily] = useState(false);
  const [showMap, setShowMap] = useState(false); // State to control map visibility
  const detailsRef = useRef(null);
  const rentRef = useRef(null);
  const floorRef = useRef(null);
  const whatsappLinkRef = useRef(null);
  const telegramLinkRef = useRef(null);
  const addressRef = useRef(null);

  useEffect(() => {
    if (route.params) {
      const { latitude, longitude } = route.params;
      setLatitude(latitude || 0);
      setLongitude(longitude || 0);
    }
  }, [route.params]);

  AsyncStorage.getItem('userId').then(value => {
    setUserId(value);
  });
  const handleSubmitData = async () => {
    try {
      let hasError = false;

      if (!roomName) {
        setRoomNameError('Please provide your room name');
        hasError = true;
      } else {
        setRoomNameError('');
      }
      if (!detail) {
        setDetailsError('Please provide your details ');
        hasError = true;
      } else {
        setDetails(detail);
        setDetailsError('');
      }
      if (availability === 0) {
        setAvailabilityError('Please select a capacity of at least 1');
        hasError = true;
      } else {
        setAvailability(availability)
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
      if (!roomType) {
        setRoomTypeError('Please select your room type');
        hasError = true;
      } else {
        setRoomTypeError('');
      }
      location = { lat: latitude, lon: longitude };

      const amenitiesObj = {
        "wifi": amenities?.find(a => a.name === 'Wi-Fi')?.checked || false,
        "airCondition": amenities?.find(a => a.name === 'Air Conditioning')?.checked || false,
        "heater": amenities?.find(a => a.name === 'Heater')?.checked || false,
        "washer": amenities?.find(a => a.name === 'Washer')?.checked || false,
        "dryer": amenities?.find(a => a.name === 'Dryer')?.checked || false,
        "kitchen": amenities?.find(a => a.name === 'Kitchen')?.checked || false,
        "parking": amenities?.find(a => a.name === 'Parking')?.checked || false,
        "gym": amenities?.find(a => a.name === 'Gym')?.checked || false,
        "pool": amenities?.find(a => a.name === 'Pool')?.checked || false,
      };

      if (!hasError) {
        const images = roomImages;
        const gender = lookingFor;
        await dispatch(createRoom({
          userId,
          roomName,
          details: details,
          availability,
          roomType,
          floor,
          rent,
          location: { lat: latitude, lon: longitude },
          amenities: amenitiesObj,
          gender,
          images,
          whatsappLink,
          telegramLink,
        }));
      }
    }
    catch (error) {
      Alert.alert('Error', 'Failed to create room. Please try again later.');
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
    navigation.navigate('MapsScreen');
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


  // const handleAddRoomImage = imageUri => {
  // setRoomImages([...roomImages, imageUri]);
  // };

  const handleAddRoomImage = async (imageUri) => {
    try {
      const base64Image = await RNFS.readFile(imageUri, 'base64');


      setRoomImages([...roomImages, base64Image]);
      setImagePaths([...imagePaths, imageUri]);
    } catch (error) {
      console.log('Error converting image to base64:', error);
    }

  };


  const handleRemoveRoomImage = index => {
    if (index >= 0 && index < roomImages.length) {
      const updatedImages = [...roomImages];
      updatedImages.splice(index, 1);
      setRoomImages(updatedImages);
    }
  };

  const getLatitudeDirection = lat => (lat);
  const getLongitudeDirection = lon => (lon);


  const handleLookingFor = () => {
    setLookingFor(!lookingFor);
  };


  const renderRoomImages = () => {

    const rows = [];
    for (let i = 0; i < roomImages.length; i += 4) {
      const rowImages = roomImages.slice(i, i + 4);
      rows.push(
        <View key={i} style={styles.imageRow}>
          {rowImages.map((base64Image, index) => (
            <View key={index} style={styles.roomImageWrapper}>
              <Image source={{ uri: `data:image/png;base64,${base64Image}` }}
                style={styles.roomImage} />
              <TouchableOpacity
                style={styles.removeButton}



                onPress={() => handleRemoveRoomImage(i + index)}>
                <Image
                  source={require('../Images/ic_delete.png')}
                  style={styles.deleteIcon}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>,
      );
    }

    return (
      <ScrollView style={styles.imageContainer}>
        <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
          <ProfileComponent setImageUri={handleAddRoomImage} />
        </View>
        {rows}
      </ScrollView>
    );
  };
  return (
    <ScrollView style={styles.createcontainer} contentContainerStyle={{ paddingBottom: 90 }} keyboardShouldPersistTaps="handled" >
      <View style={{ alignSelf: 'center' }}>
        {/* <TeamXLogoImage /> */}
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
          onFocus={() => setTabBarVisibility(false)}
          onBlur={() => setTabBarVisibility(true)}
        />
        <TeamXErrorText errorText={roomNameError} />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Details</Text>
        <TextInput
          ref={detailsRef}
          style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
          value={details}
          onChangeText={setDetail}
          multiline
          placeholder="Enter your details"
          onSubmitEditing={() => rentRef.current.focus()}
          onFocus={() => setTabBarVisibility(false)}
          onBlur={() => setTabBarVisibility(true)}
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
          onFocus={() => setTabBarVisibility(false)}
          onBlur={() => setTabBarVisibility(true)}
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
          onFocus={() => setTabBarVisibility(false)}
          onBlur={() => setTabBarVisibility(true)}
        />
        <TeamXErrorText errorText={floorError} />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Looking for</Text>
        <RadioButton.Group
          onValueChange={newValue => setLookingFor(newValue)}
          value={lookingFor}
        >
          <RadioButton.Item label="Male" value="male" />
          <RadioButton.Item label="Female" value="female" />
          <RadioButton.Item label="Family" value="family" />
        </RadioButton.Group>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Room Type</Text>
        <DropDownPicker
          open={roomTypeOpen}
          value={roomType}
          items={[
            { label: 'Individual', value: 'individual' },
            { label: 'Apartment', value: 'apartment' },
          ]}
          setOpen={setRoomTypeOpen}
          setValue={setRoomType}
          containerStyle={{ height: 40, marginBottom: 10 }}
          style={[styles.input]}
          placeholder="Select your room type"
          placeholderStyle={{ color: '#B3B3B3' }}
          textStyle={{ fontSize: 18 }}
          onFocus={() => setTabBarVisibility(false)}
          onBlur={() => setTabBarVisibility(true)}
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
          onFocus={() => setTabBarVisibility(false)}
          onBlur={() => setTabBarVisibility(true)}
        />
        <Text style={{ color: '#814ABF' }}>
          Selected availability: {availability}
        </Text>
        <TeamXErrorText errorText={availabilityError} />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Whatsapp Link</Text>
        <View
          style={[styles.input, { flexDirection: 'row', alignItems: 'center' }]}>
          <Image
            source={require('../Images/ic_whatsApp.png')}
            tintColor={'white'}
            style={{ marginRight: 10, tintColor: '#1B8755' }}
          />
          <TextInput
            ref={whatsappLinkRef}
            style={[styles.linkText, { flex: 1 }]}
            placeholder="Enter WhatsApp link"
            value={whatsappLink}
            onChangeText={setWhatsappLink}
            onSubmitEditing={() => telegramLinkRef.current.focus()}
            onFocus={() => setTabBarVisibility(false)}
            onBlur={() => setTabBarVisibility(true)}

          />
        </View>
        <TeamXErrorText errorText={whatsappLinkError} />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Telegram Link</Text>
        <View
          style={[styles.input, { flexDirection: 'row', alignItems: 'center' }]}>
          <Image
            source={require('../Images/ic_telegram.png')}
            tintColor={'white'}
            style={{ marginRight: 10, tintColor: '#3DA7DC' }}
          />
          <TextInput
            ref={telegramLinkRef}
            style={[styles.linkText, { flex: 1 }]}
            placeholder="Enter Telegram link"
            value={telegramLink}
            onChangeText={setTelegramLink}
            onSubmitEditing={() => addressRef.current.focus()}
            onFocus={() => setTabBarVisibility(false)}
            onBlur={() => setTabBarVisibility(true)}
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
                style={{ width: 24, height: 24, marginRight: 10 }}
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
          onFocus={() => setTabBarVisibility(false)}
          onBlur={() => setTabBarVisibility(true)}
        />
        <TeamXErrorText errorText={addressError} />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Location</Text>
        <TouchableOpacity
          style={[styles.button, { marginBottom: 10, width: 150, height: 40 }]}
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
            value={` ${latitude ? getLatitudeDirection(parseFloat(latitude)) : 'Enter latitude'}`}
            onChangeText={(text) => setLatitude(text)}
            keyboardType="numeric"
            placeholder="Enter latitude"
            onFocus={() => setTabBarVisibility(false)}
            onBlur={() => setTabBarVisibility(true)}
            editable={false}
          />
          <Text style={styles.coordinateDirection}>N/S</Text>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Longitude</Text>
        <View style={styles.coordinatesContainer}>
          <TextInput
            style={[styles.input, { flex: 1 }]}            
            value={` ${longitude ? getLatitudeDirection(parseFloat(longitude)) : 'Enter longitude'}`}            
            onChangeText={(text) => setLatitude(text)}
            keyboardType="numeric"
            placeholder="Enter longitude"
            onFocus={() => setTabBarVisibility(false)}
            onBlur={() => setTabBarVisibility(true)}
            editable={false}

          />
          <Text style={styles.coordinateDirection}>E/W</Text>
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
function launchImageLibrary(options: { mediaType: string; includeBase64: boolean; maxWidth: number; maxHeight: number; }, arg1: (response: any) => void) {
  throw new Error('Function not implemented.');
}

