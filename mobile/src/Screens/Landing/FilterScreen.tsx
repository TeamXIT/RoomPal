import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';

import {styles} from '../Styles/Styles'

const FilterScreen = ({ navigation }) => {
  const [minRent, setMinPrice] = useState('');
  const [maxRent, setMaxPrice] = useState('');
  const [gender, setSelectedGender] = useState('');
  const [roomType, setSelectedRoomType] = useState('');
  const [location, setLocation] = useState('');
  const [availability, setAvailability] = useState(0);

  const handleGenderSelection = (Gender) => {
    setSelectedGender(gender === Gender ? '' : Gender);
  };

  const handleRoomTypeSelection = (type) => {
    setSelectedRoomType(roomType === type ? '' : type);
  };

  const handleApplyFilters = () => {
    if (minRent) console.log(`Min Rent: ${minRent}`);
    if (maxRent) console.log(`Max Rent: ${maxRent}`);
    if (gender) console.log(`Gender: ${gender}`);
    if (roomType) console.log(`Room Type: ${roomType}`);
    if (location) console.log(`Location: ${location}`);
    if (availability) console.log(`Availability: ${availability}`);

    // Navigate with all filters if needed
    navigation.navigate('ListOfRooms',  { minRent, maxRent, gender, roomType, location, availability });
  };

  const handleResetFilters = () => {
    setMinPrice('');
    setMaxPrice('');
    setSelectedGender('');
    setSelectedRoomType('');
    setLocation('');
    setAvailability(0);
  };

  const handleBack = () => {
    navigation.navigate('ListOfRooms');
  };

  const increaseValue = (setter) => {
    setter((prevValue) => prevValue + 1);
  };

  const decreaseValue = (setter) => {
    setter((prevValue) => Math.max(prevValue - 1, 0));
  };

  return (
    <ScrollView style={styles.filterscreencontainer}>
      <View style={styles.filtersceenheader}>
        <TouchableOpacity style={styles.filterheaderButton} onPress={handleBack}>
          <Text style={styles.filterheaderButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.filterheaderTitle}>Filters</Text>
        <TouchableOpacity style={styles.filterheaderButton} onPress={handleResetFilters}>
          <Text style={styles.filterheaderButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.filtersectionTitle}>Gender</Text>
      <View style={styles.filtergenderContainer}>
        <TouchableOpacity
          style={[styles.filtergenderButton, gender === 'male' && styles.filterselectedGender]}
          onPress={() => handleGenderSelection('male')}
        >
          <Text style={[styles.filtergenderText, gender === 'male' && { color: '#fff' }]}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filtergenderButton, gender === 'female' && styles.filterselectedGender]}
          onPress={() => handleGenderSelection('female')}
        >
          <Text style={[styles.filtergenderText, gender === 'female' && { color: '#fff' }]}>Female</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filtergenderButton, gender === 'family' && styles.filterselectedGender]}
          onPress={() => handleGenderSelection('family')}
        >
          <Text style={[styles.filtergenderText, gender === 'family' && { color: '#fff' }]}>family</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.filtersectionTitle}>Room Type</Text>
      <View style={styles.filtergenderContainer}>
        <TouchableOpacity
          style={[styles.filtergenderButton, roomType === 'individual' && styles.filterselectedGender]}
          onPress={() => handleRoomTypeSelection('individual')}
        >
          <Text style={[styles.filtergenderText, roomType === 'individual' && { color: '#fff' }]}>Individual</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filtergenderButton, roomType === 'apartment' && styles.filterselectedGender]}
          onPress={() => handleRoomTypeSelection('apartment')}
        >
          <Text style={[styles.filtergenderText, roomType === 'apartment' && { color: '#fff' }]}>Apartment</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.filtersectionTitle}>Location</Text>
      <TextInput
        style={styles.filterpriceInput}
        placeholder="Enter location"
        value={location}
        onChangeText={setLocation}
      />

      <Text style={styles.filtersectionTitle}>Availability</Text>
      <View style={styles.filtercounterContainer}>
        <TouchableOpacity
          style={styles.filtercounterButton}
          onPress={() => decreaseValue(setAvailability)}
        >
          <Text style={styles.filtercounterButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.filtercounterText}>{availability}</Text>
        <TouchableOpacity
          style={styles.filtercounterButton}
          onPress={() => increaseValue(setAvailability)}
        >
          <Text style={styles.filtercounterButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.filtersectionTitle}>Price Range (₹)</Text>
      <View style={styles.filterpriceRangeContainer}>
        <TextInput
          style={styles.filterpriceInput}
          placeholder="min"
          keyboardType="numeric"
          value={minRent}
          onChangeText={setMinPrice}
        />
        <Text style={styles.filtertoText}>to</Text>
        <TextInput
          style={styles.filterpriceInput}
          placeholder="max"
          keyboardType="numeric"
          value={maxRent}
          onChangeText={setMaxPrice}
        />
      </View>

      <TouchableOpacity style={styles.filterfilterapplyButton} onPress={handleApplyFilters}>
        <Text style={styles.filterscreenapplyButtonText}>Apply Filters</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default FilterScreen;
