//UnsuccessPasswordScreen
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
 

const UnsuccessPasswordScreen = ({ navigation }) => {
  const handleLoginPress = () => {
    navigation.navigate('LoginScreen'); 
  };

  return (
    <View style={styles.container}>
     <Image
            source={require('../Images/ic_unsccess.png')}
            style={styles.crossIcon}
          />
      <Text style={styles.successText}>Oops! something went wrong while setting your password.</Text>
      <Text style={styles.successText}>Please try again later.</Text>
      <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
        <Text style={styles.buttonText}>Back to home</Text>
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
  crossIcon:{
    width:100,
    height:100,
    marginBottom:20

  }
});

export default UnsuccessPasswordScreen;
