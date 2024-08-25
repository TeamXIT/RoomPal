import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ScrollView, TextInput, Modal, Button } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, updateProfile } from '../../reducers/profile/profileSlice';
import { RootState } from '../../reducers/store';
import { primaryColor,styles } from '../Styles/Styles';
import { setMobileNumber } from '../../reducers/auth/authSlice';
import RNFS from 'react-native-fs';
import { format, parseISO } from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditProfile = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.profile);
  const [userData, setUserData] = useState(data.user);
  const [imageUri, setImageUri] = useState(require('../Images/ic_person.png'));
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('2000-01-01');
  const [gender, setGender] = useState(userData.gender);
  const [makeMobilePrivate, setMakeMobilePrivate] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [genderTypeOpen, setGenderTypeOpen] = useState(false);
  const [genderItems, setGenderItems] = useState([
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ]);
  const [makeMobilePrivateOpen, setMakeMobilePrivateOpen] = useState(false);
  const [makeMobilePrivateItems, setMakeMobilePrivateItems] = useState([
    { label: 'False', value: false },
    { label: 'True', value: true },
  ]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('MobileNumber').then((value) => {
      if (value !== null) {
        dispatch(fetchProfile(value));
      }
    });
  }, []);

  useEffect(() => {
    if (data.user) {
      setUserData(data.user);
      setMobileNumber(data.user.mobileNumber)
      setImageUri(data.user.image ? { uri: data.user.image } : require('../Images/ic_person.png'));
      setFullName(data.user.fullName);
      setEmail(data.user.email);
      setDateOfBirth(formatDateToISO(data.user.dateOfBirth ? formatDateToISO(data.user.dateOfBirth) : '2000-01-01'));
      setGender(data.user.gender);
      setMakeMobilePrivate(data.user.makeMobilePrivate);
    }
  }, [data.user]);


  useEffect(() => {
    updateUserProfile();
  }, [data.profile]);

  const convertToBase64 = async (uri) => {
    try {
      const base64String = await RNFS.readFile(uri, 'base64');
      return `data:image/png;base64,${base64String}`; // Ensure proper data URL format
    } catch (error) {
      console.error('Error converting image to base64:', error);
      return null;
    }
  };

  const handleAddProfileImage = async (uri) => {
    const base64String = await convertToBase64(uri);

    if (base64String) {
      setImageUri({ uri: base64String }); // Ensure proper data URL format
      setUserData((prevState) => ({
        ...prevState,
        image: base64String, // Update image in userData
      }));
    }
  }

  const handleSelectGallery = () => {
    Alert.alert('Select your option', 'Select one of the options to set your profile picture.', [
      {
        text: 'Open Camera',
        onPress: () => {
          ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
          }).then(image => {
            handleAddProfileImage(image.path);
          });
        },
      },
      {
        text: 'Select Picture',
        onPress: () => {
          ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
          }).then(image => {
            handleAddProfileImage(image.path);
          });
        },
      },
    ]);
  };

  const updateUserProfile = () => {
    try {
      setIsEditing(false);
    } catch (error) {
      // Handle error (e.g., show a message to the user)
    }
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    {
      const formattedDate = formatDateToISO(date);;
      setDateOfBirth(formattedDate);
    }
    hideDatePicker();
  };

  const formatDateToISO = (date) => {
    try {
      if (typeof date === 'string') {
        date = parseISO(date);
      }
      return format(date, 'yyyy-MM-dd'); // Format to ISO date
    } catch (error) {
      console.error('Error formatting date:', error);
      return '2000-01-01'; // Return a default date or handle the error appropriately
    }
  };
  const formatDateFromISO = (date) => {
    return date; // Return date in yyyy-MM-dd format directly
  };

  // console.log("fetch data:",
    // userData.mobileNumber,
    // fullName,
    // userData.image, // Use base64 image string
    // email,
    // dateOfBirth,
    // gender,
    // makeMobilePrivate
  // )


  const handleSave = async () => {

    dispatch(updateProfile(
      userData.mobileNumber,
      fullName,
      userData.image, // Use base64 image string
      email,
      dateOfBirth,
      gender,
      makeMobilePrivate));
    setIsEditing(false); // Set isEditing to false after saving

  }

  const handleEditProfilePress = () => {
    if (isEditing) {
      handleSave();
    } else {
      setIsEditing(true);
    }
  };

  return (
    <ScrollView>
      <View style={styles.editcontainer}>
        <View>
          <View style={styles.editimageContainer}>
            <Image source={imageUri} style={styles.editprofileImage} />
            {isEditing && (
              <TouchableOpacity style={styles.editButton} onPress={handleSelectGallery}>
                <Image source={require('../Images/ic_editImage.png')} style={styles.editIcon} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <Text style={{ textAlign: 'center', color: primaryColor, fontSize: 20, marginTop: 10, fontWeight: 'bold' }}>{fullName}</Text>
        <View style={{ marginLeft: 20, marginRight: 20, marginTop: 20, marginBottom: 80 }}>
          <Text style={styles.editlabel}>Full Name</Text>
          <View style={styles.editprofileInput}>
            <Image source={require('../Images/ic_person.png')} style={styles.editinputIcon} />
            <TextInput
              style={styles.edittextInput}
              value={fullName}
              onChangeText={setFullName}
              placeholder="Enter your full name"
              editable={isEditing}
            />
            {isEditing && (
              <Image source={require('../Images/ic_editText.png')} style={styles.editInputIcon} />
            )}
          </View>
          <Text style={styles.editlabel}>Email</Text>
          <View style={styles.editprofileInput}>
            <Image source={require('../Images/ic_email.png')} style={styles.editinputIcon} />
            <TextInput
              style={styles.edittextInput}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              editable={isEditing}
            />
            {isEditing && (
              <Image source={require('../Images/ic_editText.png')} style={styles.editInputIcon} />
            )}
          </View>
          <Text style={styles.editlabel}>Date of Birth</Text>
          <View style={styles.editprofileInput}>
            <Image source={require('../Images/ic_dob.png')} style={styles.editinputIcon} />
            {isEditing ? (
              <TouchableOpacity onPress={showDatePicker} style={{ flex: 1 }}>
                <TextInput
                  style={styles.edittextInput}
                  value={formatDateFromISO(dateOfBirth)}
                  editable={false}
                  onFocus={showDatePicker}

                />
              </TouchableOpacity>
            ) : (
              <Text style={styles.edittextInput}>{formatDateFromISO(dateOfBirth)}</Text>
            )}
            <DateTimePickerModal
              textColor='black'
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            {isEditing && (
              <Image source={require('../Images/ic_editText.png')} style={styles.editInputIcon} />
            )}
          </View>
          <Text style={styles.editlabel}>Gender</Text>
          <View style={styles.editprofileInput}>
            <Image source={require('../Images/ic_gender.png')} style={styles.editinputIcon} />
            {isEditing ? (
              <DropDownPicker
                open={genderTypeOpen}
                value={gender}
                items={genderItems}
                style={{ borderWidth: 0, backgroundColor: 'transparent' }}
                setOpen={setGenderTypeOpen}
                setValue={setGender}
                setItems={setGenderItems}
                containerStyle={{ height: 40, marginBottom: 10, marginRight: 10, width: 310 }}
                dropDownContainerStyle={{ zIndex: 1 }}
                placeholder="Select an option"
                placeholderStyle={{ color: '#B3B3B3' }}
                textStyle={{ fontSize: 18 }}
                dropDownDirection='TOP'
              />
            ) : (
              <Text style={styles.edittextInput}>{gender}</Text>
            )}
          </View>
          <Text style={styles.editlabel}>Make Mobile Number Private</Text>
          <View style={styles.editprofileInput}>
            <Image source={require('../Images/ic_phone.png')} style={styles.editinputIcon} />
            {isEditing ? (
              <DropDownPicker
                open={makeMobilePrivateOpen}
                value={makeMobilePrivate}
                items={makeMobilePrivateItems}
                style={{ borderWidth: 0, backgroundColor: 'transparent' }}
                setOpen={setMakeMobilePrivateOpen}
                setValue={setMakeMobilePrivate}
                setItems={setMakeMobilePrivateItems}
                onChangeValue={(value) => setMakeMobilePrivate(value)}


                containerStyle={{ height: 40, marginBottom: 10, marginRight: 10, width: 310 }}
                dropDownContainerStyle={{ zIndex: 1 }}
                placeholder="Select an option"
                placeholderStyle={{ color: '#B3B3B3' }}
                textStyle={{ fontSize: 18 }}
              />
            ) : (
              <Text style={styles.edittextInput}>{makeMobilePrivate ? 'True' : 'False'}</Text>
            )}
          </View>
        </View>
        <TouchableOpacity style={styles.editProfileButton} onPress={handleEditProfilePress}>
          <Text style={styles.editProfileButtonText}>{isEditing ? 'Save' : 'Edit Profile'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
export default EditProfile;