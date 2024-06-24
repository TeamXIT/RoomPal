// Checkbox.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {styles} from '../Styles/Styles'

const TeamxCheckBox = ({ label, isChecked, onChange }) => {
  return (
    <View style={styles.checkBoxContainer}>
      <TouchableOpacity 
        style={[styles.checkbox, isChecked && styles.checkedCheckbox]} 
        onPress={onChange}
      >
        {isChecked && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>
      <Text style={styles.checkboxlabel}>{label}</Text>
    </View>
  );
};

export default TeamxCheckBox;
