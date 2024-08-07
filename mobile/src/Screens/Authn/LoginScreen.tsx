import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../reducers/auth/authSlice';
import TeamXLogoImage from '../molecule/TeamXLogoImage';
import PhoneInput from 'react-native-phone-number-input';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <TeamXLogoImage />
        <Text style={styles.label}>Mobile Number</Text>
        <PhoneInput
          defaultValue={mobileNumber}
          defaultCode="IN"
          layout="first"
          onChangeText={setMobileNumber}
          containerStyle={[styles.input, { width: '100%' }]}
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
        {mobileNumberError ? <Text style={styles.errorText}>{mobileNumberError}</Text> : null}
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
        {generalError ? <Text style={styles.errorText}>{generalError}</Text> : null}
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={rememberMe}
            onValueChange={setRememberMe}
            tintColors={{ true: '#6b21a8', false: '#6b21a8' }}
          />
          <Text style={styles.checkboxLabel}>Remember me</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
          <Text style={styles.buttonText}>Login ➜</Text>
        </TouchableOpacity>
        <View style={styles.forgotPasswordContainer}>
          <TouchableOpacity onPress={handleForgotPasswordPress}>
            <Text style={styles.link}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inlineTextContainer}>
          <Text style={styles.text}>Don't have an account? </Text>
          <TouchableOpacity onPress={handleRegisterPress}>
            <Text style={styles.registerLink}>Register here</Text>
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
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxLabel: {
    color: '#6b21a8',
  },
  button: {
    backgroundColor: '#9333ea',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  link: {
    color: '#4169E1',
    textAlign: 'right',
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

export default LoginScreen;
