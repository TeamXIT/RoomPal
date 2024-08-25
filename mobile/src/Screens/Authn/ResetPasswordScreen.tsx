//ResetPasswordScreen
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import TeamXLogoImage from '../molecule/TeamXLogoImage';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../reducers/store';
import { resetPassword } from '../../reducers/auth/authSlice';
import {styles} from '../Styles/Styles'

const ResetPasswordScreen = ({ navigation }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleResetPasswordPress = async () => {
    if (validatePasswords()) {
      await dispatch(resetPassword(newPassword,confirmPassword));
      navigation.navigate('SucessPasswordScreen');
    }
  };

  const validatePasswords = () => {
    let valid = true;

    if (!newPassword) {
      setPasswordError('New password is required');
      valid = false;
    } else if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Confirm password is required');
      valid = false;
    } else if (confirmPassword !== newPassword) {
      setConfirmPasswordError('Passwords do not match');
      valid = false;
    } else {
      setConfirmPasswordError('');
    }

    return valid;
  };

  return (
    <View style={styles.resetcontainer}>
      <View style={styles.resetinnerContainer}>
        <TeamXLogoImage />
        <Text style={styles.resetlabel}>New Password</Text>
        <TextInput
          style={styles.resetinput}
          placeholder="Enter new password"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
        {passwordError ? <Text style={styles.reseterrorText}>{passwordError}</Text> : null}
        <Text style={styles.resetlabel}>Confirm Password</Text>
        <TextInput
          style={styles.resetinput}
          placeholder="Confirm new password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        {confirmPasswordError ? <Text style={styles.reseterrorText}>{confirmPasswordError}</Text> : null}
        <TouchableOpacity style={styles.resetbutton} onPress={handleResetPasswordPress}>
          <Text style={styles.resetbuttonText}>Set Password</Text>
          <Image
            source={require('../Images/ic_tick.png')}
            style={styles.resetlockIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default ResetPasswordScreen;
