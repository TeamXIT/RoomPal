//SuccessPasswordScreen
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import {styles} from '../Styles/Styles'

const SuccessPasswordScreen = ({ navigation }) => {
  const handleLoginPress = () => {
    navigation.navigate('LoginScreen'); 
  };

  return (
    <View style={styles.successcontainer}>
      <Image
            source={require('../Images/ic_success.png')}
            style={styles.successtickIcon}
          />
      <Text style={styles.successText}>Your password has been successfully set!</Text>
      <TouchableOpacity style={styles.successbutton} onPress={handleLoginPress}>
        <Text style={styles.successbuttonText}>Login to continue</Text>
      </TouchableOpacity>
    </View>
  );
};


export default SuccessPasswordScreen;
