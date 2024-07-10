import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import Checkbox from '../molecule/TeamxCheckBox';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import PhoneInput from "react-native-phone-number-input";
import TeamXErrorText from '../molecule/TeamXErrorText';
import { register } from '../../reducers/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from '../Styles/Styles';
import TeamXLogoImage from '../molecule/TeamXLogoImage';

const RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const signupError = useSelector(state => state.auth.screen.error);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [lookingForRoom, setLookingForRoom] = useState(false);
  const [lookingForRoommate, setLookingForRoommate] = useState(false);
  const [preferences, setPreferences] = useState({
    clean: false,
    pets: false,
    smoking: false,
    drinking: false,
  });
  const [makeMobilePrivate, setMakeMobilePrivate] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [mobileNumberError, setMobileNumberError] = useState('');
  const [dateOfBirthError, setDateOfBirthError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDobSelected, setDobSelected] = useState(false);

  const emailRef = useRef(null);
  const mobileNumberRef = useRef(null);
  const genderRef = useRef(null);
  const roomRef = useRef(null);
  const roommateRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const navigateToLogin = () => {
    navigation.navigate('LoginScreen');
  };

  const handleSignUp = async () => {
    let hasError = false;

    // Validate fields
    if (!fullName) {
      setFullNameError("Please provide your full name.");
      hasError = true;
    } else if (fullName.length < 3) {
      setFullNameError("Full Name must be at least 3 characters.");
      hasError = true;
    } else {
      setFullNameError('');
    }

    if (!email) {
      setEmailError("Please provide your email.");
      hasError = true;
    } else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(email)) {
      setEmailError("Please enter a valid email address.");
      hasError = true;
    } else if (email.length < 8) {
      setEmailError("Email must be at least 8 characters.");
      hasError = true;
    } else {
      setEmailError('');
    }

    if (!mobileNumber) {
      setMobileNumberError("Please provide your mobile number.");
      hasError = true;
    } else if (!/^\d{10}$/.test(mobileNumber)) {
      setMobileNumberError("Mobile number must be 10 digits.");
      hasError = true;
    } else {
      setMobileNumberError('');
    }

    if (!dateOfBirth) {
      setDateOfBirthError("Please select your date of birth.");
      hasError = true;
    } else {
      setDateOfBirthError('');
    }

    if (!gender) {
      setGenderError("Please select your gender.");
      hasError = true;
    } else {
      setGenderError('');
    }

    if (!password) {
      setPasswordError("Please provide your password.");
      hasError = true;
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
      setPasswordError("Password must have minimum 8 characters, at least one lowercase letter, one uppercase letter, and one numeric character.");
      hasError = true;
    } else {
      setPasswordError('');
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Please provide your confirm password.");
      hasError = true;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      hasError = true;
    } else {
      setConfirmPasswordError('');
    }

    if (!hasError) {
      dispatch(register(
        fullName, 
        email, 
        mobileNumber, 
        dateOfBirth, 
        gender, 
        lookingForRoom , 
        lookingForRoommate, 
        preferences, 
        makeMobilePrivate, 
        password,
        confirmPassword,
      ));
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (dateOfBirth) => {
    setDateOfBirth(dateOfBirth.toLocaleDateString('en-GB'));
    setDobSelected(true);
    hideDatePicker();
  };

  return (
    <ScrollView contentContainerStyle={styles.registercontainer}>
      <View style={{ alignSelf: 'center' }}>
        {/* Include your TeamXLogoImage here */}
        <TeamXLogoImage />
      </View>
      <Text style={styles.title}>Registration</Text>

      {/* Input fields and error messages */}
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
        onSubmitEditing={() => emailRef.current.focus()}
        blurOnSubmit={false}
      />
      <TeamXErrorText errorText={fullNameError} />

      <TextInput
        ref={emailRef}
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        onSubmitEditing={() => mobileNumberRef.current.focus()}
        blurOnSubmit={false}
      />
      <TeamXErrorText errorText={emailError} />

      <PhoneInput
        defaultValue={mobileNumber}
        defaultCode="IN"
        onChangeText={setMobileNumber}
        containerStyle={styles.input}
        textInputStyle={styles.phoneInput}
        placeholder="Mobile Number"
        keyboardType="number-pad"
      />
      <TeamXErrorText errorText={mobileNumberError} />

      <TouchableOpacity style={styles.datePicker} onPress={showDatePicker}>
        <Text>{dateOfBirth || 'Select Date of Birth'}</Text>
      </TouchableOpacity>
      <TeamXErrorText errorText={dateOfBirthError} />

      {/* Gender selection */}
      <TouchableOpacity style={styles.genderSelection} onPress={() => setGender('male')}>
        <Text style={styles.genderText}>Male</Text>
        {/* Add your radio button or check mark image for selection */}
      </TouchableOpacity>
      <TouchableOpacity style={styles.genderSelection} onPress={() => setGender('female')}>
        <Text style={styles.genderText}>Female</Text>
        {/* Add your radio button or check mark image for selection */}
      </TouchableOpacity>
      <TeamXErrorText errorText={genderError} />

      {/* Other fields and checkboxes */}
      {/* Implement checkboxes and other inputs as per your design */}

      {/* Password and confirm password */}
      <TextInput
        ref={passwordRef}
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        onSubmitEditing={() => confirmPasswordRef.current.focus()}
        blurOnSubmit={false}
      />
      <TeamXErrorText errorText={passwordError} />

      <TextInput
        ref={confirmPasswordRef}
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <TeamXErrorText errorText={confirmPasswordError} />

      {/* General error message */}
      <TeamXErrorText errorText={generalError || signupError} />

      {/* Submit button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSignUp}>
        <Text style={styles.submitButtonText}>Register</Text>
        {/* Add your right arrow or submit icon */}
      </TouchableOpacity>

      {/* Login redirect */}
      <TouchableOpacity onPress={navigateToLogin}>
        <Text style={styles.loginRedirectLink}>Already have an account? Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default RegisterScreen;
