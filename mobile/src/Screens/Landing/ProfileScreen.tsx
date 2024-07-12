import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ScrollView, TextInput } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { primaryColor } from '../Styles/Styles';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DropDownPicker from 'react-native-dropdown-picker';

const ProfileScreen = ({ setTabBarVisibility }) => {
  const [imageUri, setImageUri] = useState(require('../Images/ic_person.png'));
  const [fullName, setFullName] = useState('Teamx');
  const [mobileNumber, setMobileNumber] = useState('123456789');
  const [email, setEmail] = useState('Teamx@gmail.com');
  const [dateOfBirth, setDateOfBirth] = useState('12/07/1024');
  const [gender, setGender] = useState('Male');
  const [makeMobilePrivate, setMakeMobilePrivate] = useState('False');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDobSelected, setDobSelected] = useState(false);
  const [genderTypeOpen, setGenderTypeOpen] = useState(false);
  const [genderItems, setGenderItems] = useState([
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Both', value: 'Both' },
  ]);
  const [makeMobilePrivateOpen, setMakeMobilePrivateOpen] = useState('');
  const [makeMobilePrivateItems, setMakeMobilePrivateItems] = useState([
    { label: 'False', value: 'False' },
    { label: 'True', value: 'True' },
  ]);

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
    setDobSelected(true);
    hideDatePicker();
  };

  const handleEditPress = (field) => {
    if (field === 'fullName') setFullName('');
    else if (field === 'email') setEmail('');
    else if (field === 'mobileNumber') setMobileNumber('');
    else if (field === 'dateOfBirth') setDateOfBirth('');
  };

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
            <TextInput
              style={styles.textInput}
              placeholder="Enter your full name"
              value={fullName}
              onChangeText={setFullName}
              blurOnSubmit={false}
            />
            <TouchableOpacity onPress={() => handleEditPress('fullName')}>
              <Image source={require('../Images/ic_editText.png')} style={styles.editInputIcon} />
            </TouchableOpacity>
          </View>
          <Text style={styles.label}>Email</Text>
          <View style={styles.profileInput}>
            <Image source={require('../Images/ic_email.png')} style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter your email"
              value={email}
              keyboardType="email-address"
              onChangeText={setEmail}
              blurOnSubmit={false}
            />
            <TouchableOpacity onPress={() => handleEditPress('email')}>
              <Image source={require('../Images/ic_editText.png')} style={styles.editInputIcon} />
            </TouchableOpacity>
          </View>
          <Text style={styles.label}>Mobile Number</Text>
          <View style={styles.profileInput}>
            <Image source={require('../Images/ic_phone.png')} style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter your mobile number"
              value={mobileNumber}
              keyboardType="number-pad"
              onChangeText={setMobileNumber}
              blurOnSubmit={false}
            />
            <TouchableOpacity onPress={() => handleEditPress('mobileNumber')}>
              <Image source={require('../Images/ic_editText.png')} style={styles.editInputIcon} />
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
            <View style={{ position: 'relative', flex: 1 }}>
              <DropDownPicker
                open={genderTypeOpen}
                value={gender}
                items={genderItems}
                style={{ borderWidth: 0, backgroundColor: 'transparent' }}
                setOpen={setGenderTypeOpen}
                setValue={setGender}
                setItems={setGenderItems}
                containerStyle={{ height: 40, marginBottom: 10, marginRight: 10, width: 310 }}
                dropDownContainerStyle={{ zIndex: 1000 }}
                placeholder="Select your gender"
                placeholderStyle={{ color: '#B3B3B3' }}
                textStyle={{ fontSize: 18 }}
                onFocus={() => setTabBarVisibility(false)}
                onBlur={() => setTabBarVisibility(true)}
              />
            </View>
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
              containerStyle={{ height: 40, marginBottom: 10, width: 310 }}
              placeholder="Select your room type"
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
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: primaryColor,
  },
  imageContainer: {
    alignItems: 'center',
    height: 140,
    width: 140,
    borderRadius: 70,
    borderColor: primaryColor,
    borderWidth: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
    flexDirection: 'row',
  },
  profileImage: {
    height: 136,
    width: 136,
    borderRadius: 68,
  },
  editButton: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderColor: primaryColor,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    bottom: 10,
    backgroundColor: '#FFFFFF',
  },
  editIcon: {
    height: 20,
    width: 20,
  },
  profileInput: {
    borderRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    borderColor: primaryColor,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 5
  },
  inputIcon: {
    height: 30,
    width: 30,
    marginRight: 10,
    tintColor: primaryColor,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    color: 'black',
    fontSize:18
  },
  editInputIcon: {
    height: 25,
    width: 25,
    marginLeft: 10,
  },
  label: {
    fontSize: 20,
    color: primaryColor,
    marginBottom: 3,
    fontWeight: 'bold'
  },
});

export default ProfileScreen;
