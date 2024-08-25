import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from '../../reducers/auth/authSlice';
import TeamXLogoImage from "../molecule/TeamXLogoImage";
import {styles} from '../Styles/Styles'

const ForgotPassword = ({ navigation }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [mobileNumberError, setMobileNumberError] = useState('');
  const dispatch = useDispatch();
  const { screen } = useSelector(state => state.auth);

  const handleLoginPress = () => {
    navigation.navigate('LoginScreen');
  };

  const handleRequestOTP = async () => {
    if (validateMobileNumber()) {
      await dispatch(forgotPassword(mobileNumber));
    }
  };

  const validateMobileNumber = () => {
    if (!mobileNumber) {
      setMobileNumberError('Mobile number is required');
      return false;
    } else if (!/^\d+$/.test(mobileNumber)) {
      setMobileNumberError('Please enter a valid mobile number');
      return false;
    } else {
      setMobileNumberError('');
      return true;
    }
  };

  return (
    <View style={styles.forgotcontainer}>
      <View style={styles.forgotinnerContainer}>
        <TeamXLogoImage />
        <Text style={styles.forgotlabel}>Mobile Number</Text>
        <TextInput
          style={styles.forgotinput}
          placeholder="Enter your mobile number"
          value={mobileNumber}
          onChangeText={setMobileNumber}
        />
        {mobileNumberError ? <Text style={styles.forgoterrorText}>{mobileNumberError}</Text> : null}
        {screen.error ? <Text style={styles.forgoterrorText}>{screen.error}</Text> : null}
        <TouchableOpacity style={styles.forgotbutton} onPress={handleRequestOTP}>
          <Text style={styles.forgotbuttonText}>Request OTP</Text>
          <Image
            source={require('../Images/ic_lock.png')}
            style={styles.lockIcon}
          />
        </TouchableOpacity>
        <View style={styles.forgotinlineTextContainer}>
          <Text style={styles.forgottext}>Remember your password? </Text>
          <TouchableOpacity onPress={handleLoginPress}>
            <Text style={styles.forgotregisterLink}>Login here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};


export default ForgotPassword;
