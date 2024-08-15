import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Animated, Image } from "react-native";
import {styles} from '../Styles/Styles'

const TeamxFloatingLabelInput = ({ label, secureTextEntry, icon, ...props }) => {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const animatedIsFocused = new Animated.Value(value === "" ? 0 : 1);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleChangeText = (text) => setValue(text);

  React.useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: isFocused || value !== "" ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const labelStyle = {
    position: "absolute",
    left: 30,
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [25, -10], // Adjusted top position
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 2],
      outputRange: [16, 12], // Adjusted font size
    }),
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: ["#888", "#fff"],
    }),
  };

  return (
    <View style={[styles.floatingcontainer, props.style]}>
      <View style={styles.floatinginputContainer}>
        {icon && <Image source={icon} style={styles.floatingicon} />}
        <Animated.Text style={labelStyle}>{label}</Animated.Text>
        <TextInput
          {...props}
          style={styles.floatinginput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={handleChangeText}
          value={value}
          secureTextEntry={secureTextEntry}
          placeholderTextColor="#888"
        />
      </View>
    </View>
  );
};


export default TeamxFloatingLabelInput;