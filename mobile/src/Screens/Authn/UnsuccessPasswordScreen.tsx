//UnsuccessPasswordScreen
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import {styles} from '../Styles/Styles'

 

const UnsuccessPasswordScreen = ({ navigation }) => {
  const handleLoginPress = () => {
    navigation.navigate('LoginScreen'); 
  };

  return (
    <View style={styles.unsuccesscontainer}>
     <Image
            source={require('../Images/ic_unsccess.png')}
            style={styles.unsuccesscrossIcon}
          />
      <Text style={styles.unsuccessText}>Oops! something went wrong while setting your password.</Text>
      <Text style={styles.unsuccessText}>Please try again later.</Text>
      <TouchableOpacity style={styles.unsuccessbutton} onPress={handleLoginPress}>
        <Text style={styles.unsuccessbuttonText}>Back to home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UnsuccessPasswordScreen;
