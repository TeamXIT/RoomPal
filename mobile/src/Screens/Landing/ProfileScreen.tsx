import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ScrollView, TextInput } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '../../reducers/profile/profileSlice';
import { RootState } from '../../reducers/store';
import { primaryColor } from '../Styles/Styles';

const ProfileScreen = ({ setTabBarVisibility }) => {
  const dispatch = useDispatch();
  const { screen, data } = useSelector((state: RootState) => state.profile);

  const [imageUri, setImageUri] = useState(data.user.image || require('../Images/ic_person.png'));
  const [fullName, setFullName] = useState(data.user.fullName || 'Teamx');
  const [mobileNumber, setMobileNumber] = useState(data.user.mobileNumber || '123456789');
  const [email, setEmail] = useState(data.user.email || 'Teamx@gmail.com');
  const [dateOfBirth, setDateOfBirth] = useState(data.user.dateOfBirth ? new Date(data.user.dateOfBirth).toLocaleDateString('en-GB') : '12/07/1024');
  const [gender, setGender] = useState(data.user.gender || 'Male');
  const [makeMobilePrivate, setMakeMobilePrivate] = useState(data.user.makeMobilePrivate ? 'True' : 'False');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [editableField, setEditableField] = useState(null);
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
  const usermobileNumber = useSelector((state: RootState) => state.auth.data.mobileNumber);

  useEffect(() => {
    dispatch(fetchProfile(usermobileNumber));
    console.log(data.user);
  }, [dispatch, mobileNumber]);

  useEffect(() => {
    setImageUri(data.user.image || require('../Images/ic_person.png'));
    setFullName(data.user.fullName || 'Teamx');
    setMobileNumber(data.user.mobileNumber || '123456789');
    setEmail(data.user.email || 'Teamx@gmail.com');
    setDateOfBirth(data.user.dateOfBirth ? new Date(data.user.dateOfBirth).toLocaleDateString('en-GB') : '12/07/1024');
    setGender(data.user.gender || 'Male');
    setMakeMobilePrivate(data.user.makeMobilePrivate ? 'True' : 'False');
  }, [data]);

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
    setDateOfBirth(dateOfBirth.toLocaleDateString('en-GB'));
    hideDatePicker();
  };

  const handleEditPress = (field) => {
    setEditableField(field);
  };

  const renderEditableTextInput = (value, setValue, placeholder, field) => (
    <TextInput
      style={styles.textInput}
      placeholder={placeholder}
      value={value}
      onChangeText={setValue}
      editable={editableField === field}
      blurOnSubmit={false}
    />
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
            {renderEditableTextInput(fullName, setFullName, "Enter your full name", 'fullName')}
            <TouchableOpacity onPress={() => handleEditPress('fullName')}>
              <Image source={require('../Images/ic_editText.png')} style={styles.editInputIcon} />
            </TouchableOpacity>
          </View>
          <Text style={styles.label}>Email</Text>
          <View style={styles.profileInput}>
            <Image source={require('../Images/ic_email.png')} style={styles.inputIcon} />
            {renderEditableTextInput(email, setEmail, "Enter your email", 'email')}
            <TouchableOpacity onPress={() => handleEditPress('email')}>
              <Image source={require('../Images/ic_editText.png')} style={styles.editInputIcon} />
            </TouchableOpacity>
          </View>
          <Text style={styles.label}>Mobile Number</Text>
          <View style={styles.profileInput}>
            <Image source={require('../Images/ic_phone.png')} style={styles.inputIcon} />
            {renderEditableTextInput(mobileNumber, setMobileNumber, "Enter your mobile number", 'mobileNumber')}
            <TouchableOpacity >
             
            </TouchableOpacity>
          </View>
          <Text style={styles.label}>Date of Birth</Text>
          <View style={styles.profileInput}>
            <Image source={require('../Images/ic_dob.png')} style={styles.inputIcon} />
            <TouchableOpacity onPress={showDatePicker} style={{ flex: 1 }}>
              <TextInput
                style={styles.textInput}
                placeholder="dd-mm-yyyy"
                value={dateOfBirth}
                onTouchStart={showDatePicker}
                editable={false}
              />
            </TouchableOpacity>
            <DateTimePickerModal
              textColor='black'
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            <TouchableOpacity onPress={() => handleEditPress('dateOfBirth')}>
              <Image source={require('../Images/ic_editText.png')} style={styles.editInputIcon} />
            </TouchableOpacity>
          </View>
          <Text style={styles.label}>Gender</Text>
          <View style={styles.profileInput}>
            <Image source={require('../Images/ic_person.png')} style={styles.inputIcon} />
           
              <DropDownPicker
                open={genderTypeOpen}
                value={gender}
                items={genderItems}
                style={{ borderWidth: 0, backgroundColor: 'transparent' }}
                setOpen={setGenderTypeOpen}
                setValue={setGender}
                setItems={setGenderItems}
                containerStyle={{ height: 20, marginBottom: 30, marginRight: 10, width: 310, }}
                dropDownContainerStyle={{ zIndex: 0 }}
                placeholder={data.user.gender || 'Select an option'}
                placeholderStyle={{ color: '#000' }}
                textStyle={{ fontSize: 18 }}
                dropDownDirection='TOP'
                onFocus={() => setTabBarVisibility(false)}
                onBlur={() => setTabBarVisibility(true)}
              />
          
          </View>
          <Text style={styles.label}>Make Mobile Number Private</Text>
          <View style={styles.profileInput}>
            <Image source={require('../Images/ic_phone.png')} style={styles.inputIcon} />
            <DropDownPicker
              open={makeMobilePrivateOpen}
              value={makeMobilePrivate}
              items={makeMobilePrivateItems}
              style={{ borderWidth: 0, backgroundColor: 'transparent' }}
              setOpen={setMakeMobilePrivateOpen}
              setValue={setMakeMobilePrivate}
              setItems={setMakeMobilePrivateItems}
              containerStyle={{ height: 40, marginBottom: 10, marginRight: 10, width: 310 }}
              dropDownContainerStyle={{ zIndex: 1 }}
              placeholder="Select an option"
              placeholderStyle={{ color: '#B3B3B3' }}
              textStyle={{ fontSize: 18 }}
              onFocus={() => setTabBarVisibility(false)}
              onBlur={() => setTabBarVisibility(true)}
            />
          </View>
        </View>
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
    color:"#000"
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
});

export default ProfileScreen;
