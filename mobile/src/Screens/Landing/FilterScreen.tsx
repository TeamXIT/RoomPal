import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';

const primaryColor = '#814ABF';

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
    <ScrollView style={styles.filtercontainer}>
      <View style={styles.filterheader}>
        <TouchableOpacity style={styles.headerButton} onPress={handleBack}>
          <Text style={styles.headerButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.filterheaderTitle}>Filters</Text>
        <TouchableOpacity style={styles.headerButton} onPress={handleResetFilters}>
          <Text style={styles.headerButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Gender</Text>
      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[styles.genderButton, gender === 'male' && styles.selectedGender]}
          onPress={() => handleGenderSelection('male')}
        >
          <Text style={[styles.genderText, gender === 'male' && { color: '#fff' }]}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.genderButton, gender === 'female' && styles.selectedGender]}
          onPress={() => handleGenderSelection('female')}
        >
          <Text style={[styles.genderText, gender === 'female' && { color: '#fff' }]}>Female</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.genderButton, gender === 'family' && styles.selectedGender]}
          onPress={() => handleGenderSelection('family')}
        >
          <Text style={[styles.genderText, gender === 'family' && { color: '#fff' }]}>family</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Room Type</Text>
      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[styles.genderButton, roomType === 'individual' && styles.selectedGender]}
          onPress={() => handleRoomTypeSelection('individual')}
        >
          <Text style={[styles.genderText, roomType === 'individual' && { color: '#fff' }]}>Individual</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.genderButton, roomType === 'apartment' && styles.selectedGender]}
          onPress={() => handleRoomTypeSelection('apartment')}
        >
          <Text style={[styles.genderText, roomType === 'apartment' && { color: '#fff' }]}>Apartment</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Location</Text>
      <TextInput
        style={styles.priceInput}
        placeholder="Enter location"
        value={location}
        onChangeText={setLocation}
      />

      <Text style={styles.sectionTitle}>Availability</Text>
      <View style={styles.counterContainer}>
        <TouchableOpacity
          style={styles.counterButton}
          onPress={() => decreaseValue(setAvailability)}
        >
          <Text style={styles.counterButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.counterText}>{availability}</Text>
        <TouchableOpacity
          style={styles.counterButton}
          onPress={() => increaseValue(setAvailability)}
        >
          <Text style={styles.counterButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Price Range (₹)</Text>
      <View style={styles.priceRangeContainer}>
        <TextInput
          style={styles.priceInput}
          placeholder="min"
          keyboardType="numeric"
          value={minRent}
          onChangeText={setMinPrice}
        />
        <Text style={styles.toText}>to</Text>
        <TextInput
          style={styles.priceInput}
          placeholder="max"
          keyboardType="numeric"
          value={maxRent}
          onChangeText={setMaxPrice}
        />
      </View>

      <TouchableOpacity style={styles.filterapplyButton} onPress={handleApplyFilters}>
        <Text style={styles.filterapplyButtonText}>Apply Filters</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  filtercontainer: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  filterheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: primaryColor,
    borderRadius: 5,
  },
  headerButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  filterheaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: primaryColor,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  genderButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: primaryColor,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  genderText: {
    fontSize: 14,
    color: primaryColor,
  },
  selectedGender: {
    backgroundColor: primaryColor,
  },
  priceRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  priceInput: {
    flex: 1,
    height: 40,
    borderColor: primaryColor,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    textAlign: 'center',
    fontSize: 16,
  },
  toText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: primaryColor,
    borderRadius: 5,
    paddingHorizontal: 20,
  },
  counterButton: {
    padding: 10,
  },
  counterButtonText: {
    fontSize: 20,
    color: primaryColor,
  },
  counterText: {
    fontSize: 18,
  },
  filterapplyButton: {
    backgroundColor: primaryColor,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 50,
  },
  filterapplyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FilterScreen;
