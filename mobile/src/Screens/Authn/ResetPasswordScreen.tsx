//ResetPasswordScreen
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import TeamXLogoImage from '../molecule/TeamXLogoImage';

const ResetPasswordScreen = ({ navigation }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleResetPasswordPress = () => {
    if (validatePasswords()) {
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
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <TeamXLogoImage />
        <Text style={styles.label}>New Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter new password"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm new password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={handleResetPasswordPress}>
          <Text style={styles.buttonText}>Set Password</Text>
          <Image
            source={require('../Images/ic_tick.png')}
            style={styles.lockIcon}
          />
        </TouchableOpacity>
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
    fontWeight:"bold"
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
    tintColor:'white'
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
});

export default ResetPasswordScreen;
