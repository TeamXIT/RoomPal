import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import TeamXLogoImage from '../molecule/TeamXLogoImage';
import { useDispatch, useSelector } from "react-redux";
import {  AppDispatch,RootState } from '../../reducers/store';
import { resendOtp } from '../../reducers/auth/authSlice';

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
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <TeamXLogoImage />
        <Text style={styles.otptext}>Please enter the OTP sent to your registered mobile number.</Text>
        
        <Text style={styles.label}>OTP</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter OTP"
          keyboardType="numeric"
          value={otp}
          onChangeText={setOtp}
        />
        {otpError ? <Text style={styles.errorText}>{otpError}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={handleVerificationPress}>
          <Text style={styles.buttonText}>Verify OTP</Text>
          <Image
            source={require('../Images/ic_tick.png')}
            style={styles.lockIcon}
          />
        </TouchableOpacity>
        <View style={styles.inlineTextContainer}>
          <Text style={styles.text}>Didn't receive OTP?</Text>
          <TouchableOpacity onPress={handleResendOTP}>
            <Text style={styles.registerLink}> Resend OTP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f3e8ff',
  },
  innerContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: '#6b21a8',
    marginBottom: 5,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    width: '100%',
  },
  otptext: {
    textAlign: 'center',
    marginBottom: 10,
    padding: 10,
    fontSize: 18,
  },
  button: {
    backgroundColor: '#9333ea',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 20,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginRight: 10,
  },
  lockIcon: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
  text: {
    color: '#6b21a8',
  },
  registerLink: {
    color: '#4169E1',
  },
  inlineTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
});

export default VerificationScreen;
