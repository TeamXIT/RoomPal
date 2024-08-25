import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import TeamXLogoImage from '../molecule/TeamXLogoImage';
import { useDispatch, useSelector } from "react-redux";
import {  AppDispatch,RootState } from '../../reducers/store';
import { resendOtp } from '../../reducers/auth/authSlice';
import {styles} from '../Styles/Styles'


const VerificationScreen = ({ navigation }) => {
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const { screen, data } = useSelector((state: RootState) => state.auth);

  const handleVerificationPress = () => {
    if (validateOtp() && data.otp==otp) {
      // Navigate to the next screen upon successful OTP verification
      navigation.navigate('ResetPasswordScreen');
    }
    else{
      setOtpError('Invalid OTP')
    }
  };

  const validateOtp = () => {
    if (!otp) {
      setOtpError('OTP is required');
      return false;
    } else if (otp.length !== 6) {
      setOtpError('OTP must be 6 digits');
      return false;
    } else {
      setOtpError('');
      return true;
    }
  };

  const handleResendOTP = async () => {
    await dispatch(resendOtp())
    
  };

  return (
    <View style={styles.verificationcontainer}>
      <View style={styles.verificationinnerContainer}>
        <TeamXLogoImage />
        <Text style={styles.verificationotptext}>Please enter the OTP sent to your registered mobile number.</Text>
        
        <Text style={styles.verificationlabel}>OTP</Text>
        <TextInput
          style={styles.verificationinput}
          placeholder="Enter OTP"
          keyboardType="numeric"
          value={otp}
          onChangeText={setOtp}
        />
        {otpError ? <Text style={styles.verificationerrorText}>{otpError}</Text> : null}
        <TouchableOpacity style={styles.verificationbutton} onPress={handleVerificationPress}>
          <Text style={styles.verificationbuttonText}>Verify OTP</Text>
          <Image
            source={require('../Images/ic_tick.png')}
            style={styles.verificationlockIcon}
          />
        </TouchableOpacity>
        <View style={styles.verificationinlineTextContainer}>
          <Text style={styles.verificationtext}>Didn't receive OTP?</Text>
          <TouchableOpacity onPress={handleResendOTP}>
            <Text style={styles.verificationregisterLink}> Resend OTP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};


export default VerificationScreen;
