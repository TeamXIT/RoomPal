import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from '../../reducers/store';
import { forgotPassword } from '../../reducers/auth/authSlice';
import TeamXLogoImage from "../molecule/TeamXLogoImage";

const ForgotPassword = ({ navigation }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [mobileNumberError, setMobileNumberError] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const { screen, data } = useSelector((state: RootState) => state.auth);

 
  const handleLoginPress = () => {
    navigation.navigate('LoginScreen');
  };

  const handleRequestOTP = async () => {
    if (validateMobileNumber()) {
      await dispatch(forgotPassword(mobileNumber));
      navigation.navigate('VerificationScreen');
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
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <TeamXLogoImage />
        <Text style={styles.label}>Mobile Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your mobile number"
          value={mobileNumber}
          onChangeText={setMobileNumber}
        />
        {mobileNumberError ? <Text style={styles.errorText}>{mobileNumberError}</Text> : null}
        {screen.error ? <Text style={styles.errorText}>{screen.error}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={handleRequestOTP}>
          <Text style={styles.buttonText}>Request OTP</Text>
          <Image
            source={require('../Images/ic_lock.png')}
            style={styles.lockIcon}
          />
        </TouchableOpacity>
        <View style={styles.inlineTextContainer}>
          <Text style={styles.text}>Remember your password? </Text>
          <TouchableOpacity onPress={handleLoginPress}>
            <Text style={styles.registerLink}>Login here</Text>
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
    fontWeight: "bold"
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
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginBottom: 10,
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
    width: 15,
    height: 15,
    tintColor: 'white'
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
});

export default ForgotPassword;
