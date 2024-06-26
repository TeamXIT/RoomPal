import React from 'react';
import { Text } from 'react-native';
import { styles } from '../Styles/Styles';

const TeamXErrorText = ({ errorText }) => {
  return (
    <>
      {errorText ? <Text style={styles.errorTextStyle}>{errorText}</Text> : null}
    </>
  );
};

export default TeamXErrorText;
