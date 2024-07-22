import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ScrollView, TextInput, Modal, Button } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '../../reducers/profile/profileSlice';
import { RootState } from '../../reducers/store';
import { primaryColor } from '../Styles/Styles';
import axios from 'axios';
import API_BASE_URL from '../../reducers/config/apiConfig';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.profile);
  const usermobileNumber = useSelector((state: RootState) => state.auth.data.mobileNumber);

  const [imageUri, setImageUri] = useState(data.user.image || require('../Images/ic_person.png'));
  const [fullName, setFullName] = useState(data.user.fullName || 'Teamx');
  const [mobileNumber, setMobileNumber] = useState(data.user.mobileNumber || '123456789');
  const [email, setEmail] = useState(data.user.email || 'Teamx@gmail.com');
  const [dateOfBirth, setDateOfBirth] = useState(data.user.dateOfBirth ? new Date(data.user.dateOfBirth).toLocaleDateString('en-GB') : '12/07/1024');
  const [gender, setGender] = useState(data.user.gender || 'Male');
  const [makeMobilePrivate, setMakeMobilePrivate] = useState(data.user.makeMobilePrivate ? 'True' : 'False');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [genderTypeOpen, setGenderTypeOpen] = useState(false);
  const [genderItems, setGenderItems] = useState([
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
  ]);
  const [makeMobilePrivateOpen, setMakeMobilePrivateOpen] = useState(false);
  const [makeMobilePrivateItems, setMakeMobilePrivateItems] = useState([
    { label: 'False', value: 'False' },
    { label: 'True', value: 'True' },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [editValue, setEditValue] = useState('');
  const [fieldBeingEdited, setFieldBeingEdited] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(fetchProfile(usermobileNumber));
  }, [dispatch, usermobileNumber]);

  useEffect(() => {
    setImageUri(data.user.image || require('../Images/ic_person.png'));
    setFullName(data.user.fullName || 'Teamx');
    setMobileNumber(data.user.mobileNumber || '123456789');
    setEmail(data.user.email || 'Teamx@gmail.com');
    setDateOfBirth(data.user.dateOfBirth ? new Date(data.user.dateOfBirth).toLocaleDateString('en-GB') : '12/07/1024');
    setGender(data.user.gender || 'Male');
    setMakeMobilePrivate(data.user.makeMobilePrivate ? 'True' : 'False');
  }, [data]);

  useEffect(() =>{


  },[data.profile]);

  const handleAddProfileImage = (uri) => {
    setImageUri({ uri });
  };

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
  const handleConfirm = (dateOfBirth) => {
    const formattedDate = dateOfBirth.toLocaleDateString('en-GB');
    setDateOfBirth(formattedDate);
    handleEditDobPress(formattedDate);
    hideDatePicker();
  };

  const handleEditNamePress = async (fullName) => {
    await axios.put(`${API_BASE_URL}/user/update`, { fullName });
  };
  const handleEditEmailPress = async (email) => {
    await axios.put(`${API_BASE_URL}/user/update`, { email });
  };
  const handleEditDobPress = async (dateOfBirth) => {
    await axios.put(`${API_BASE_URL}/user/update`, { dateOfBirth });
  };
  const handleEditMobileNumberPress = async (mobileNumber) => {
    await axios.put(`${API_BASE_URL}/user/update`, { mobileNumber });
  };

  const openEditModal = (field, value) => {
    setEditValue(value);
    setFieldBeingEdited(field);
    setModalVisible(true);
  };

  const handleSave = async () => {
    try {
      switch (fieldBeingEdited) {
        case 'fullName':
          await handleEditNamePress(editValue);
          setFullName(editValue);
          break;
        case 'email':
          await handleEditEmailPress(editValue);
          setEmail(editValue);
          break;
        case 'dateOfBirth':
          await handleEditDobPress(editValue);
          setDateOfBirth(editValue);
          break;
        case 'mobileNumber':
          await handleEditMobileNumberPress(editValue);
          setMobileNumber(editValue);
          break;
      }
      setModalVisible(false);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
      // Handle error (e.g., show a message to the user)
    }
  };

  const renderEditableTextInput = (value, placeholder, field, isEditable = true) => (
    <View style={styles.editableInputContainer}>
      <Text style={styles.textInput}>{value}</Text>
      {isEditable && (
        <TouchableOpacity onPress={() => openEditModal(field, value)}>
          <Image source={require('../Images/ic_editText.png')} style={styles.editInputIcon} />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Profile</Text>
          <View style={styles.imageContainer}>
            <Image source={imageUri} style={styles.profileImage} />
            <TouchableOpacity style={styles.editButton} onPress={handleSelectGallery}>
              <Image source={require('../Images/ic_editImage.png')} style={styles.editIcon} />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={{ textAlign: 'center', color: primaryColor, fontSize: 20, marginTop: 10, fontWeight: 'bold' }}>{fullName}</Text>
        <View style={{ marginLeft: 20, marginRight: 20, marginTop: 20, marginBottom: 80 }}>
          <Text style={styles.label}>Full Name</Text>
          <View style={styles.profileInput}>
            <Image source={require('../Images/ic_person.png')} style={styles.inputIcon} />
            {isEditing ? (
              <TextInput
                style={styles.textInput}
                value={fullName}
                onChangeText={setFullName}
                placeholder="Enter your full name"
              />
            ) : (
              <Text style={styles.textInput}>{fullName}</Text>
            )}
            {isEditing && (
              <TouchableOpacity onPress={() => openEditModal('fullName', fullName)}>
                <Image source={require('../Images/ic_editText.png')} style={styles.editInputIcon} />
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.label}>Email</Text>
          <View style={styles.profileInput}>
            <Image source={require('../Images/ic_email.png')} style={styles.inputIcon} />
            {isEditing ? (
              <TextInput
                style={styles.textInput}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
              />
            ) : (
              <Text style={styles.textInput}>{email}</Text>
            )}
            {isEditing && (
              <TouchableOpacity onPress={() => openEditModal('email', email)}>
                <Image source={require('../Images/ic_editText.png')} style={styles.editInputIcon} />
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.label}>Mobile Number</Text>
          <View style={styles.profileInput}>
            <Image source={require('../Images/ic_phone.png')} style={styles.inputIcon} />
            {isEditing ? (
              <TextInput
                style={styles.textInput}
                value={mobileNumber}
                onChangeText={setMobileNumber}
                placeholder="Enter your mobile number"
              />
            ) : (
              <Text style={styles.textInput}>{mobileNumber}</Text>
            )}
            {isEditing && (
              <TouchableOpacity onPress={() => openEditModal('mobileNumber', mobileNumber)}>
                <Image source={require('../Images/ic_editText.png')} style={styles.editInputIcon} />
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.label}>Date of Birth</Text>
          <View style={styles.profileInput}>
            <Image source={require('../Images/ic_dob.png')} style={styles.inputIcon} />
            {isEditing ? (
              <TouchableOpacity onPress={showDatePicker} style={{ flex: 1 }}>
                <TextInput
                  style={styles.textInput}
                  value={dateOfBirth}
                  editable={false}
                />
              </TouchableOpacity>
            ) : (
              <Text style={styles.textInput}>{dateOfBirth}</Text>
            )}
            {isEditing && (
              <TouchableOpacity onPress={() => openEditModal('dateOfBirth', dateOfBirth)}>
                <Image source={require('../Images/ic_editText.png')} style={styles.editInputIcon} />
              </TouchableOpacity>
            )}
            <DateTimePickerModal
              textColor='black'
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
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
            {isEditing && (
              <TouchableOpacity onPress={() => openEditModal('gender', gender)}>
               
              </TouchableOpacity>
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
                containerStyle={{ height: 40, marginBottom: 10, marginRight: 10, width: 310 }}
                dropDownContainerStyle={{ zIndex: 1}}
                placeholder="Select an option"
                placeholderStyle={{ color: '#B3B3B3' }}
                textStyle={{ fontSize: 18 }}
              />
            ) : (
              <Text style={styles.textInput}>{makeMobilePrivate}</Text>
            )}
            {isEditing && (
              <TouchableOpacity onPress={() => openEditModal('makeMobilePrivate', makeMobilePrivate)}>
                
              </TouchableOpacity>
            )}
          </View>
        </View>
        <TouchableOpacity style={styles.editProfileButton} onPress={() => setIsEditing(!isEditing)}>
          <Text style={styles.editProfileButtonText}>{isEditing ? 'Save' : 'Edit Profile'}</Text>
        </TouchableOpacity>
        <Modal
          animationType='fade'
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Edit {fieldBeingEdited}</Text>
              <TextInput
                style={styles.modalTextInput}
                value={editValue}
                onChangeText={setEditValue}
                placeholder={`Enter new ${fieldBeingEdited}`}
              />
             <View style={styles.modalButtons}>
                <Button title="Save" onPress={handleSave} />
                <Button title="Cancel" onPress={() => setModalVisible(false)} />
            </View>
          </View>
          </View>
        </Modal>
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
