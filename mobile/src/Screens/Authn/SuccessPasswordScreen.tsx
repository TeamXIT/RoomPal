//SuccessPasswordScreen
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const SuccessPasswordScreen = ({ navigation }) => {
  const handleLoginPress = () => {
    navigation.navigate('LoginScreen'); 
  };

  return (
    <View style={styles.container}>
      <Image
            source={require('../Images/ic_success.png')}
            style={styles.tickIcon}
          />
      <Text style={styles.successText}>Your password has been successfully set!</Text>
      <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
        <Text style={styles.buttonText}>Login to continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f3e8ff',
  },
  successText: {
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 30,
    fontSize: 20,
  },
  button: {
    backgroundColor: '#9333ea',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  tickIcon:{
    width:100,
    height:100,
    marginBottom:20

  }
});

export default SuccessPasswordScreen;
