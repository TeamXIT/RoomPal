import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ScrollView, TextInput, Modal, Button } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, updateProfile } from '../../reducers/profile/profileSlice';
import { RootState } from '../../reducers/store';
import { primaryColor } from '../Styles/Styles';
import { setMobileNumber } from '../../reducers/auth/authSlice';
import RNFS from 'react-native-fs';
import { format,parseISO } from 'date-fns';



const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.profile);
  const usermobileNumber = useSelector((state: RootState) => state.auth.data.mobileNumber);
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

  const [editValue, setEditValue] = useState('');
  const [fieldBeingEdited, setFieldBeingEdited] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(fetchProfile(usermobileNumber));
  }, [dispatch, usermobileNumber]);

  useEffect(() => {
    if (data.user) {
      setUserData(data.user);
      setMobileNumber(data.user.mobileNumber)
      setImageUri(data.user.image || require('../Images/ic_person.png'));
      setFullName(data.user.fullName);
      setEmail(data.user.email);
      setDateOfBirth(formatDateToISO(data.user.dateOfBirth ? formatDateToISO(data.user.dateOfBirth) : '2000-01-01'));
      setGender(data.user.gender);
      setMakeMobilePrivate(data.user.makeMobilePrivate );
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
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Profile</Text>
          <View style={styles.imageContainer}>
            <Image source={imageUri} style={styles.profileImage} />
            {isEditing && (
              <TouchableOpacity style={styles.editButton} onPress={handleSelectGallery}>
                <Image source={require('../Images/ic_editImage.png')} style={styles.editIcon} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <Text style={{ textAlign: 'center', color: primaryColor, fontSize: 20, marginTop: 10, fontWeight: 'bold' }}>{fullName}</Text>
        <View style={{ marginLeft: 20, marginRight: 20, marginTop: 20, marginBottom: 80 }}>
          <Text style={styles.label}>Full Name</Text>
          <View style={styles.profileInput}>
            <Image source={require('../Images/ic_person.png')} style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              value={fullName}
              onChangeText={setFullName}
              placeholder="Enter your full name"
              editable={isEditing}
            />
            {isEditing && (
              <Image source={require('../Images/ic_editText.png')} style={styles.editInputIcon} />
            )}
          </View>
          <Text style={styles.label}>Email</Text>
          <View style={styles.profileInput}>
            <Image source={require('../Images/ic_email.png')} style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              editable={isEditing}
            />
            {isEditing && (
              <Image source={require('../Images/ic_editText.png')} style={styles.editInputIcon} />
            )}
          </View>
          <Text style={styles.label}>Date of Birth</Text>
          <View style={styles.profileInput}>
            <Image source={require('../Images/ic_dob.png')} style={styles.inputIcon} />
            {isEditing ? (
              <TouchableOpacity onPress={showDatePicker} style={{ flex: 1 }}>
                <TextInput
                  style={styles.textInput}
                  value={formatDateFromISO(dateOfBirth)}
                  editable={false}
                  onFocus={showDatePicker}

                />
              </TouchableOpacity>
            ) : (
              <Text style={styles.textInput}>{formatDateFromISO(dateOfBirth)}</Text>
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
          <Text style={styles.label}>Gender</Text>
          <View style={styles.profileInput}>
            <Image source={require('../Images/ic_person.png')} style={styles.inputIcon} />
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
              <Text style={styles.textInput}>{gender}</Text>
            )}
          </View>
          <Text style={styles.label}>Make Mobile Number Private</Text>
          <View style={styles.profileInput}>
            <Image source={require('../Images/ic_phone.png')} style={styles.inputIcon} />
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
              <Text style={styles.textInput}>{makeMobilePrivate ? 'True' : 'False'}</Text>
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: primaryColor,
    marginTop: 20,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: primaryColor,
  },
  editButton: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    right: 130,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIcon: {
    width: 25,
    height: 25,
    tintColor: primaryColor,
  },
  label: {
    fontSize: 18,
    color: primaryColor,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  profileInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#FFF',
    height: 50,
    borderRadius: 10,
    borderColor: primaryColor,
    borderWidth: 2,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    marginLeft: 10,
    color: "#000"
  },
  inputIcon: {
    width: 25,
    height: 25,
    marginLeft: 10,
  },
  editInputIcon: {
    width: 25,
    height: 25,
    tintColor: primaryColor,
    marginRight: 10,
  },
  editableInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalTextInput: {
    width: '100%',
    height: 40,
    borderColor: primaryColor,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  editProfileButton: {
    backgroundColor: primaryColor,
    padding: 15,
    borderRadius: 10,
    margin: 20,
    marginBottom: 100,
    marginTop: -70,
    alignItems: 'center',
  },
  editProfileButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;