import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ScrollView,TextInput } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { primaryColor } from '../Styles/Styles';

const ProfileScreen = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(require('../Images/ic_person.png'));
  const [userName, setUserName] = useState('Teamx');
  const [mobileNumber, setMobileNumber] = useState('123456789');
  const [email, setEmail] = useState('Teamx@gmail.com');
  const [password, setPassword] = useState('Teamx@123');
  const [location, setLocation] = useState('Hyderabad');
  const [gender, setGender] = useState('Male');

  const handleAddRoomImage = (uri) => {
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
            handleAddRoomImage(image.path); // Update image URI
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
            handleAddRoomImage(image.path); // Update image URI
          });
        },
      },
    ]);
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
      <Text style={{ textAlign: 'center', color: primaryColor, fontSize: 20, marginTop: 10, fontWeight: 'bold' }}>{userName}</Text>
      <View style={{ margin: 20 }}>
        <View style={styles.profileInput}>
          <Image source={require('../Images/ic_person.png')} style={styles.inputIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your full name"
            value={userName}
            onChangeText={setUserName}
            blurOnSubmit={false}
          />
          <TouchableOpacity>
            <Image source={require('../Images/ic_editText.png')} style={styles.editInputIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.profileInput}>
          <Image source={require('../Images/ic_phone.png')} style={styles.inputIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your Mobile number"
            value={mobileNumber}
            onChangeText={setMobileNumber}
            blurOnSubmit={false}
          />
          <TouchableOpacity>
            <Image source={require('../Images/ic_editText.png')} style={styles.editInputIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.profileInput}>
          <Image source={require('../Images/ic_email.png')} style={styles.inputIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            blurOnSubmit={false}
          />
          <TouchableOpacity>
            <Image source={require('../Images/ic_editText.png')} style={styles.editInputIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.profileInput}>
          <Image source={require('../Images/ic_password.png')} style={styles.inputIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            blurOnSubmit={false}
          />
          <TouchableOpacity>
            <Image source={require('../Images/ic_editText.png')} style={styles.editInputIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.profileInput}>
          <Image source={require('../Images/ic_location.png')} style={styles.inputIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your location"
            value={location}
            onChangeText={setLocation}
            blurOnSubmit={false}
          />
          <TouchableOpacity>
            <Image source={require('../Images/ic_editText.png')} style={styles.editInputIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.profileInput}>
          <Image source={require('../Images/ic_person.png')} style={styles.inputIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your gender"
            value={gender}
            onChangeText={setGender}
            blurOnSubmit={false}
          />
          <TouchableOpacity>
            <Image source={require('../Images/ic_editText.png')} style={styles.editInputIcon} />
          </TouchableOpacity>
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


    marginTop: 15,
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
    tintColor:primaryColor
  },
  textInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',


  },
  editInputIcon: {
    height: 25,
    width: 25,
    marginLeft: 10,

  },
 
 
 
 
 
 
 
});

export default ProfileScreen;
