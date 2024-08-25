import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../reducers/auth/authSlice';
import TeamXLogoImage from '../molecule/TeamXLogoImage';
import PhoneInput from 'react-native-phone-number-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from '../Styles/Styles'

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { error, isBusy, success, } = useSelector(state => state.auth.screen);
  const authToken = useSelector(state => state.auth.data.authToken);
  const signinError = useSelector(state => state.auth.screen.error); // Added signinError from Redux state
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [mobileNumberError, setMobileNumberError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');

  const validateMobileNumber = (mobile) => {
    return mobile.trim().length === 10 && /^\d+$/.test(mobile);
  };

  const handleLoginPress = async () => {
    let valid = true;

    if (!validateMobileNumber(mobileNumber)) {
      setMobileNumberError('Invalid mobile number');
      valid = false;
    } else {
      setMobileNumberError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      await dispatch(signIn(mobileNumber, password));

      if (!authToken) {
        setGeneralError(signinError);
      } else {
        setGeneralError('');
      }
    }
  };

  const handleRegisterPress = () => {
    navigation.navigate('RegisterScreen');
  };

  const handleForgotPasswordPress = () => {
    navigation.navigate('ForgotPassword');
  };

  useEffect(() => {
    if (success) {
      AsyncStorage.setItem('AccessToken', authToken).then(() => {
        AsyncStorage.setItem('MobileNumber', mobileNumber).then(() => {
          navigation.navigate('Landing');
        });
      });
    }
  }, [success, navigation]);

  return (
    <View style={styles.logincontainer}>
      <View style={styles.logininnerContainer}>
        <TeamXLogoImage />
        <Text style={styles.loginlabel}>Mobile Number</Text>
        <PhoneInput
          defaultValue={mobileNumber}
          defaultCode="IN"
          layout="first"
          onChangeText={setMobileNumber}
          containerStyle={[styles.logininput, { width: '100%' }]}
          textContainerStyle={{
            paddingVertical: 10,
            backgroundColor: 'white',
          }}
          textInputStyle={{
            paddingVertical: 0,
            fontSize: 16,
            color: 'black'
          }}
          countryPickerButtonStyle={{ paddingVertical: 0 }}
          renderDropdownImage={<Text>▼</Text>}
          placeholder="Enter mobile number"
          keyboardType="number-pad"
        />
        {mobileNumberError ? <Text style={styles.loginerrorText}>{mobileNumberError}</Text> : null}
        <Text style={styles.loginlabel}>Password</Text>
        <TextInput
          style={styles.logininput}
          placeholder="Enter password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {passwordError ? <Text style={styles.loginerrorText}>{passwordError}</Text> : null}
        {generalError ? <Text style={styles.loginerrorText}>{generalError}</Text> : null}
        <View style={styles.logincheckboxContainer}>
          <CheckBox
            value={rememberMe}
            onValueChange={setRememberMe}
            tintColors={{ true: '#6b21a8', false: '#6b21a8' }}
          />
          <Text style={styles.logincheckboxLabel}>Remember me</Text>
        </View>
        <TouchableOpacity style={styles.loginbutton} onPress={handleLoginPress}>
          <Text style={styles.loginbuttonText}>Login ➜</Text>
        </TouchableOpacity>
        <View style={styles.loginforgotPasswordContainer}>
          <TouchableOpacity onPress={handleForgotPasswordPress}>
            <Text style={styles.loginlink}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.logininlineTextContainer}>
          <Text style={styles.logintext}>Don't have an account? </Text>
          <TouchableOpacity onPress={handleRegisterPress}>
            <Text style={styles.loginregisterLink}>Register here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
