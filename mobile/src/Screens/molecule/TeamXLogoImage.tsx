import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { styles } from '../Styles/Styles';

const TeamXLogoImage = () => {
  return (
    <View style={styles.logoContainer}>
      <Image
        source={require('../Images/LOGO.png')}
        style={styles.logoImg}
      />
     <View style={styles.textContainer}>
        <Text style={styles.logoText}>Home Scout</Text>
        <Text style={styles.taglineText}> Discover your ideal living space</Text>
      </View>
    </View>
  );
};


export default TeamXLogoImage;