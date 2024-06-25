import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Image, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { register } from '../../reducers/auth/authSlice';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { styles } from '../Styles/Styles';
import Checkbox from '../molecule/TeamxCheckBox'; // Assuming this is correctly imported
import TeamXLogoImage from '../molecule/TeamXLogoImage';

const RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [lookingForRoom, setLookingForRoom] = useState('');
  const [lookingForRoommate, setLookingForRoommate] = useState('');
  const [preferences, setPreferences] = useState({
    clean: false,
    pets: false,
    smoking: false,
    drinking: false,
  });
  const [makeMobilePrivate, setMakeMobilePrivate] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [errors, setErrors] = useState({});

  // Refs for focusing next input
  const emailRef = useRef(null);
  const mobileRef = useRef(null);
  const genderRef = useRef(null);
  const roomRef = useRef(null);
  const roommateRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const navigateToLogin = () => {
    navigation.navigate('LoginScreen');
  };

  const handleSignUp = () => {
    let errors = {};

    // Validate fields
    if (!fullName) {
      errors.fullName = "Please provide your full name.";
    } else if (fullName.length < 3) {
      errors.fullName = "Full Name must be at least 3 characters.";
    }

    if (!email) {
      errors.email = "Please provide your email.";
    } else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(email)) {
      errors.email = "Please enter a valid email address.";
    } else if (email.length < 8) {
      errors.email = "Email must be at least 8 characters."
    }

    if (!mobileNumber) {
      errors.mobileNumber = "Please provide your mobile number.";
    } else if (!/^\d{10}$/.test(mobileNumber)) {
      errors.mobileNumber = "Mobile number must be 10 digits.";
    }

    if (!dateOfBirth) {
      errors.dateOfBirth = "Please select your date of birth.";
    }

    if (!gender) {
      errors.gender = "Please select your gender.";
    }

    if (!lookingForRoom) {
      errors.lookingForRoom = "Please select if you are looking for a room.";
    }

    if (!lookingForRoommate) {
      errors.lookingForRoommate = "Please select if you are looking for a roommate.";
    }

    if (!password) {
      errors.password = "Please provide your password.";
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
      errors.password = "Password must have minimum 8 characters, at least one lowercase letter, one uppercase letter, and one numeric character.";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Please provide your confirm password.";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log({
        fullName,
        email,
        mobileNumber,
        dateOfBirth,
        gender,
        lookingForRoom: lookingForRoom === 'yes',
        lookingForRoommate: lookingForRoommate === 'yes',
        preferences,
        makeMobilePrivate,
        password,
        confirmPassword
      });

      Alert.alert("Success", "Registration successful!");

      dispatch(register(fullName, email, mobileNumber, dateOfBirth, gender, lookingForRoom === 'yes', lookingForRoommate === 'yes', preferences, makeMobilePrivate, password));

      // Reset state values
      setFullName('');
      setEmail('');
      setMobileNumber('');
      setDateOfBirth('');
      setGender('');
      setLookingForRoom('');
      setLookingForRoommate('');
      setPreferences({
        clean: false,
        pets: false,
        smoking: false,
        drinking: false,
      });
      setMakeMobilePrivate(false);
      setPassword('');
      setConfirmPassword('');
      setDatePickerVisibility(false); // Ensure date picker is hidden after submission
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDateOfBirth(date.toLocaleDateString('en-GB'));
    hideDatePicker();
  };

  return (
    <ScrollView contentContainerStyle={styles.registercontainer}>
      <View style={{ alignSelf: 'center' }}>
        <TeamXLogoImage />
      </View>
      <Text style={styles.title}>Registration</Text>

      <View style={{ gap: 10 }}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={[styles.input, errors.fullName && { borderColor: 'red' }]}
          placeholder="Enter your full name"
          value={fullName}
          onChangeText={setFullName}
          onSubmitEditing={() => emailRef.current.focus()}
          blurOnSubmit={false}
        />
        {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
      </View>

      <View style={{ gap: 10 }}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          ref={emailRef}
          style={[styles.input, errors.email && { borderColor: 'red' }]}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          onSubmitEditing={() => mobileRef.current.focus()}
          blurOnSubmit={false}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>

      <View style={{ gap: 10 }}>
        <Text style={styles.label}>Mobile Number</Text>
        <TextInput
          ref={mobileRef}
          style={[styles.input, errors.mobileNumber && { borderColor: 'red' }]}
          placeholder="Enter your mobile number"
          value={mobileNumber}
          onChangeText={setMobileNumber}
          keyboardType="phone-pad"
          onSubmitEditing={() => genderRef.current.focus()}
          blurOnSubmit={false}
        />
        {errors.mobileNumber && <Text style={styles.errorText}>{errors.mobileNumber}</Text>}
      </View>

      <View style={{ gap: 10 }}>
        <Text style={styles.label}>Date of Birth</Text>
        <TouchableOpacity onPress={showDatePicker}>
          <TextInput
            style={[styles.input, dateOfBirth && { color: '#000' }, errors.dateOfBirth && { borderColor: 'red' }]} // Change text color if DOB is selected
            placeholder="dd-mm-yyyy"
            value={dateOfBirth}
            onTouchStart={showDatePicker}
            editable={false} // Disable direct text input
          />
        </TouchableOpacity>
        {errors.dateOfBirth && <Text style={styles.errorText}>{errors.dateOfBirth}</Text>}
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>

      <Text style={styles.label}>Gender</Text>
      <View style={styles.radioContainer} ref={genderRef}>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => setGender('male')}
        >
          <View style={styles.radioCircle}>
            {gender === 'male' && <View style={styles.selectedDot} />}
          </View>
        </TouchableOpacity>
        <Text style={styles.radioLabel}>Male</Text>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => setGender('female')}
        >
          <View style={styles.radioCircle}>
            {gender === 'female' && <View style={styles.selectedDot} />}
          </View>
        </TouchableOpacity>
        <Text style={styles.radioLabel}>Female</Text>
      </View>
      {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}

      <Text style={styles.label}>Looking for Room?</Text>
      <View style={styles.buttonGroup} ref={roomRef}>
        <TouchableOpacity
          style={[styles.buttonYes, lookingForRoom === 'yes' && styles.buttonActive]}
          onPress={() => setLookingForRoom('yes')}
        >
          <Text style={[styles.buttonText, lookingForRoom === 'yes' && styles.buttonTextActive]}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonNo, lookingForRoom === 'no' && styles.buttonActive]}
          onPress={() => setLookingForRoom('no')}
        >
          <Text style={[styles.buttonText, lookingForRoom === 'no' && styles.buttonTextActive]}>No</Text>
        </TouchableOpacity>
      </View>
      {errors.lookingForRoom && <Text style={styles.errorText}>{errors.lookingForRoom}</Text>}

      <Text style={styles.label}>Looking for Roommate?</Text>
      <View style={styles.buttonGroup} ref={roommateRef}>
        <TouchableOpacity
          style={[styles.buttonYes, lookingForRoommate === 'yes' && styles.buttonActive]}
          onPress={() => setLookingForRoommate('yes')}
        >
          <Text style={[styles.buttonText, lookingForRoommate === 'yes' && styles.buttonTextActive]}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonNo, lookingForRoommate === 'no' && styles.buttonActive]}
          onPress={() => setLookingForRoommate('no')}
        >
          <Text style={[styles.buttonText, lookingForRoommate === 'no' && styles.buttonTextActive]}>No</Text>
        </TouchableOpacity>
      </View>
      {errors.lookingForRoommate && <Text style={styles.errorText}>{errors.lookingForRoommate}</Text>}

      <Text style={styles.label}>Preferences:</Text>
      <Checkbox
        label="Clean"
        isChecked={preferences.clean}
        onChange={() => setPreferences({ ...preferences, clean: !preferences.clean })}
      />
      <Checkbox
        label="Pets Allowed"
        isChecked={preferences.pets}
        onChange={() => setPreferences({ ...preferences, pets: !preferences.pets })}
      />
      <Checkbox
        label="Smoking Allowed"
        isChecked={preferences.smoking}
        onChange={() => setPreferences({ ...preferences, smoking: !preferences.smoking })}
      />
      <Checkbox
        label="Drinking Allowed"
        isChecked={preferences.drinking}
        onChange={() => setPreferences({ ...preferences, drinking: !preferences.drinking })}
      />

      <Text style={styles.label}>Mobile Number Public?</Text>
      <View style={styles.checkboxContainer}>
        <Checkbox
          label="Yes, make it public"
          isChecked={makeMobilePrivate}
          onChange={() => setMakeMobilePrivate(!makeMobilePrivate)}
        />
      </View>

      <View style={{ gap: 10 }}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          ref={passwordRef}
          style={[styles.input, errors.password && { borderColor: 'red' }]}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          onSubmitEditing={() => confirmPasswordRef.current.focus()}
          blurOnSubmit={false}
        />
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
      </View>

      <View style={{ gap: 10 }}>
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          ref={confirmPasswordRef}
          style={[styles.input, errors.confirmPassword && { borderColor: 'red' }]}
          placeholder="Enter your confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
      </View>

      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSignUp}>
          <Text style={styles.submitButtonText}>Register</Text>
          <Image source={require('../Images/ic_rightArrow.png')} tintColor={'#FFFFFF'} style={{ paddingLeft: 5 }} />
        </TouchableOpacity>
      </View>

      <View style={styles.loginRedirectContainer}>
        <Text style={styles.loginRedirectText}>Already have an account?</Text>
        <TouchableOpacity onPress={navigateToLogin}>
          <Text style={styles.loginRedirectLink}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;
