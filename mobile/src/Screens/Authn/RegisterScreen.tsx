import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, TextInput, Image } from 'react-native';
import TeamXLogoImage from '../molecule/TeamXLogoImage'; // Adjust the path as per your project structure
import Checkbox from '../molecule/TeamxCheckBox'; // Import your Checkbox component
import DateTimePickerModal from 'react-native-modal-datetime-picker'; // Import the Date Picker
import { primaryColor, styles } from '../Styles/Styles'
import PhoneInput from "react-native-phone-number-input";
import TeamXErrorText from '../molecule/TeamXErrorText';
import { register } from '../../reducers/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';


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
  const [lookingForRoomError, setLookingForRoomError] = useState('');
  const [lookingForRoommateError, setLookingForRoommateError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDobSelected, setDobSelected] = useState(false); // State to manage if DOB is selected
  

  const [errors, setErrors] = useState({}); // State for errors

  // Refs for focusing next input
  const emailRef = useRef(null);
  const mobileNumberRef = useRef(null);
  const genderRef = useRef(null);
  const roomRef = useRef(null);
  const roommateRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const navigateToLogin = () => {
    navigation.navigate('LoginScreen'); // Navigate to LoginScreen
  };

  const handleSignUp = async () => {
    let hasError = false;

    // Validate fields
    if (!fullName) {
      setFullNameError("Please provide your full name.")
      hasError = true;
    } else if (fullName.length < 3) {
      setFullNameError("Full Name must be at least 3 characters.")
      hasError = true;
    } else {
      setFullNameError('')
    }

    if (!email) {
      setEmailError("Please provide your email.")
      hasError = true;
    } else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(email)) {
      setEmailError("Please enter a valid email address.")
      hasError = true;
    } else if (email.length < 8) {
      setEmailError("Email must be at least 8 characters.")
      hasError = true;
    } else {
      setEmailError('')
    }

    if (!mobileNumber) {
      setMobileNumberError("Please provide your mobile number.")
      hasError = true;
    } else if (!/^\d{10}$/.test(mobileNumber)) {
      setMobileNumberError("Mobile number must be 10 digits.")
      hasError = true;
    } else {
      setMobileNumberError('')
    }

    if (!dateOfBirth) {
      setDateOfBirthError("Please select your date of birth.")
      hasError = true;
    } else {
      setDateOfBirthError('')
    }

    if (!gender) {
      setGenderError("Please select your gender.")
      hasError = true;
    } else {
      setGenderError('')
    }

    // if (!lookingForRoom) {
    //   setLookingForRoomError("Please select if you are looking for a room.")
    //   hasError = true;
    // } else {
    //   setLookingForRoomError('')
    // }

    // if (!lookingForRoommate) {
    //   setLookingForRoommateError("Please select if you are looking for a roommate.")
    //   hasError = true;
    // } else {
    //   setLookingForRoommateError('')
    // }

    if (!password) {
      setPasswordError("Please provide your password.")
      hasError = true;
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
      setPasswordError("Password must have minimum 8 characters, at least one lowercase letter, one uppercase letter, and one numeric character.")
      hasError = true;
    } else {
      setPasswordError('')
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Please provide your confirm password.")
      hasError = true;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.")
      hasError = true;
    } else {
      setConfirmPasswordError('')
    }


  
    if (!hasError) {
     try{
      const formData = {
        fullName,
        email,
        mobileNumber, 
        dateOfBirth,
        gender,
        lookingForRoom: lookingForRoom ,
        lookingForRoommate: lookingForRoommate,
        // preferences,
        password,
        confirmPassword,
      }
      console.log(formData)
      await AsyncStorage.setItem('userData', JSON.stringify(formData));

       dispatch(register(
        fullName, 
        email, 
        mobileNumber, 
        dateOfBirth, 
        gender, 
        lookingForRoom , 
        lookingForRoommate, 
        password,
        confirmPassword,
      ));
      if(signupError) {
        setGeneralError(signupError)
      }


    
  }catch(error){
    console.log('Failed to save data:', error)
  }

}
   

    // Reset state values
    // setFullName('');
    // setEmail('');
    // setMobileNumber('');
    // setDateOfBirth('');
    // setGender('');
    // setLookingForRoom(false);
    // setLookingForRoommate(false);
    // setPreferences({
    //   clean: false,
    //   pets: false,
    //   smoking: false,
    //   drinking: false,
    // });
    // setMakeMobilePrivate(false);
    // setPassword('');
    // setConfirmPassword('');
    // setDatePickerVisibility(false); // Ensure date picker is hidden after submission

  }
    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };

    // const handleConfirm = (dateOfBirth) => {
      // setDateOfBirth(dateOfBirth.toLocaleDateString('en-GB')); // Format the date as "dd-mm-yyyy"
      // setDobSelected(true); // Mark DOB as selected
      // hideDatePicker();
    // };
    const handleConfirm = (dateOfBirth) => {
      const formattedDate = moment(dateOfBirth).format('YYYY-MM-DD');
      setDateOfBirth(formattedDate);
      setDobSelected(true); // Mark DOB as selected
      hideDatePicker();
    };

    return (
      <ScrollView contentContainerStyle={styles.registercontainer}>
        <View style={{ alignSelf: 'center' }}>
          <TeamXLogoImage />
        </View>
        {/* <Text style={styles.title}>Registration</Text> */}

        <View style={{ gap: 10 }}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={[styles.input]}
            placeholder="Enter your full name"
            value={fullName}
            onChangeText={setFullName}
            onSubmitEditing={() => emailRef.current.focus()}
            blurOnSubmit={false}
          />
          <TeamXErrorText errorText={fullNameError} />
        </View>

        <View style={{ gap: 10 }}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            ref={emailRef}
            style={[styles.input]}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            onSubmitEditing={() => passwordRef.current.focus()}
            blurOnSubmit={false}
          />
          <TeamXErrorText errorText={emailError} />
        </View>

        <View style={{ gap: 10 }}>
          <Text style={styles.label}>Mobile Number</Text>

          <PhoneInput
            defaultValue={mobileNumber}
            defaultCode="IN"
            layout="first"
            onChangeText={setMobileNumber} // Use the custom change handler
            containerStyle={[styles.input, { width: '100%' }, ]}
            textContainerStyle={{
              paddingVertical: 10,
              backgroundColor: 'white',
            }}
            textInputStyle={{
              paddingVertical: 0,
              fontSize: 16,
              color: 'black'
            }}
            countryPickerButtonStyle={{ paddingVertical: 0 }}
            renderDropdownImage={<Text >▼</Text>}
            placeholder="Enter mobile number"
            keyboardType="number-pad"

          />
          <TeamXErrorText errorText={mobileNumberError} />
        </View>

        <View style={{ gap: 10 }}>
          <Text style={styles.label}>Date of Birth</Text>
          <TouchableOpacity onPress={showDatePicker}>
            <TextInput
              style={[styles.input, ]} // Change text color if DOB is selected
              placeholder="dd-mm-yyyy"
              value={dateOfBirth}
              onTouchStart={showDatePicker}
              editable={false} // Disable direct text input
            />
          </TouchableOpacity>
          <TeamXErrorText errorText={dateOfBirthError} />

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>

        <Text style={styles.label}>Gender</Text>
        <View style={styles.radioContainer}>
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
        <TeamXErrorText errorText={genderError} />

        <Text style={styles.label}>Looking for Room?</Text>
        <View style={styles.buttonGroup} ref={roomRef}>
          <TouchableOpacity
            style={[styles.buttonYes, lookingForRoom === true && styles.buttonActive]}
            onPress={() => setLookingForRoom(true)}
          >
            <Text style={[styles.buttonText, lookingForRoom === true && styles.buttonTextActive]}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonNo, lookingForRoom === false && styles.buttonActive]}
            onPress={() => setLookingForRoom(false)}
          >
            <Text style={[styles.buttonText, lookingForRoom === false && styles.buttonTextActive]}>No</Text>
          </TouchableOpacity>
        </View>
        <TeamXErrorText errorText={lookingForRoomError} />

        <Text style={styles.label}>Looking for Roommate?</Text>
        <View style={styles.buttonGroup} ref={roommateRef}>
          <TouchableOpacity
            style={[styles.buttonYes, lookingForRoommate === true && styles.buttonActive]}
            onPress={() => setLookingForRoommate(true)}
          >
            <Text style={[styles.buttonText, lookingForRoommate === true && styles.buttonTextActive]}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonNo, lookingForRoommate === false && styles.buttonActive]}
            onPress={() => setLookingForRoommate(false)}
          >
            <Text style={[styles.buttonText, lookingForRoommate === false && styles.buttonTextActive]}>No</Text>
          </TouchableOpacity>
        </View>
        <TeamXErrorText errorText={lookingForRoommateError} />

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
            style={[styles.input]}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            onSubmitEditing={() => confirmPasswordRef.current.focus()}
            blurOnSubmit={false}
          />
          <TeamXErrorText errorText={passwordError} />
        </View>

        <View style={{ gap: 10 }}>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            ref={confirmPasswordRef}
            style={[styles.input]}
            placeholder="Enter your confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          <TeamXErrorText errorText={confirmPasswordError} />
        </View>

        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <TeamXErrorText errorText={generalError} />
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
  
}




  export default RegisterScreen
 
