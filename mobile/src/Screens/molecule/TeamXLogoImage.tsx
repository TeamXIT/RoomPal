import React from 'react';
import { Image, StyleSheet } from 'react-native';
import {styles} from '../Styles/Styles'

const TeamXLogoImage = () => {
  return (
    <Image
      source={require('../Images/Room-PalLogo.jpg')}
      style={styles.logoImg}
    />
  );
};


export default TeamXLogoImage;