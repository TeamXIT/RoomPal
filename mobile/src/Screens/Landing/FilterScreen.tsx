import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Image } from 'react-native';
import Slider from 'react-native-slider';
import { styles } from '../Styles/Styles';

const primaryColor = '#814ABF';

const FilterScreen = ({ navigation }) => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [distance, setDistance] = useState(0);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedListingType, setSelectedListingType] = useState('');
  const [beds, setBeds] = useState(0);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);

  const toggleAmenity = (amenity) => {
    const newAmenities = [...selectedAmenities];
    const index = newAmenities.indexOf(amenity);
    if (index > -1) {
      newAmenities.splice(index, 1);
    } else {
      newAmenities.push(amenity);
    }
    setSelectedAmenities(newAmenities);
  };

  const handleListingTypeSelection = (type) => {
    if (selectedListingType === type) {
      setSelectedListingType('');
    } else {
      setSelectedListingType(type);
    }
  };

  const handleGenderSelection = (gender) => {
    if (selectedGender === gender) {
      setSelectedGender('');
    } else {
      setSelectedGender(gender);
    }
  };

  const handleApplyFilters = () => {
    // Logic to apply filters
    console.log('Applying filters:', {
      minPrice,
      maxPrice,
      selectedGender,
      distance,
      selectedAmenities,
      selectedListingType,
      beds,
      bedrooms,
      bathrooms,
    });
  };

  const handleResetFilters = () => {
    setMinPrice('');
    setMaxPrice('');
    setSelectedGender('');
    setDistance(0);
    setSelectedAmenities([]);
    setSelectedListingType('');
    setBeds(0);
    setBedrooms(0);
    setBathrooms(0);
  };

  const handleBack = () => {
    navigation.navigate('ListOfRooms');
  };

  const increaseValue = (setter) => {
    setter((prevValue) => prevValue + 1);
  };

  const decreaseValue = (setter) => {
    if (setter === 0) return;
    setter((prevValue) => prevValue - 1);
  };

  return (
    <ScrollView style={styles.filtercontainer}>
      <View style={styles.filterheader}>
        <TouchableOpacity onPress={handleBack}>
          <Text style={styles.resetButton}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.filterheaderTitle}>Filters</Text>
        <TouchableOpacity onPress={handleResetFilters}>
          <Text style={styles.resetButton}>Reset</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Listing Type</Text>
      <View style={styles.listingTypeContainer}>
        <TouchableOpacity
          style={[styles.listingTypeButton, selectedListingType === 'private' && styles.selectedListingType]}
          onPress={() => handleListingTypeSelection('private')}
        >
          <Text style={[styles.listingTypeText, selectedListingType === 'private' && { color: '#fff' }]}>Private Room</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.listingTypeButton, selectedListingType === 'shared' && styles.selectedListingType]}
          onPress={() => handleListingTypeSelection('shared')}
        >
          <Text style={[styles.listingTypeText, selectedListingType === 'shared' && { color: '#fff' }]}>Shared Room</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.listingTypeButton, selectedListingType === 'entire' && styles.selectedListingType]}
          onPress={() => handleListingTypeSelection('entire')}
        >
          <Text style={[styles.listingTypeText, selectedListingType === 'entire' && { color: '#fff' }]}>Entire Home</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Gender</Text>
      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[styles.genderButton, selectedGender === 'male' && styles.selectedGender]}
          onPress={() => handleGenderSelection('male')}
        >
          <Text style={[styles.genderText, selectedGender === 'male' && { color: '#fff' }]}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.genderButton, selectedGender === 'female' && styles.selectedGender]}
          onPress={() => handleGenderSelection('female')}
        >
          <Text style={[styles.genderText, selectedGender === 'female' && { color: '#fff' }]}>Female</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.genderButton, selectedGender === 'both' && styles.selectedGender]}
          onPress={() => handleGenderSelection('both')}
        >
          <Text style={[styles.genderText, selectedGender === 'both' && { color: '#fff' }]}>Both</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Price Range (₹)</Text>
      <View style={styles.priceRangeContainer}>
        <TextInput
          style={styles.priceInput}
          placeholder="0"
          keyboardType="numeric"
          value={minPrice}
          onChangeText={setMinPrice}
        />
        <Text style={styles.toText}>to</Text>
        <TextInput
          style={styles.priceInput}
          placeholder="10000"
          keyboardType="numeric"
          value={maxPrice}
          onChangeText={setMaxPrice}
        />
      </View>

      <Text style={styles.sectionTitle}>Amenities</Text>
      <View style={styles.amenitiesContainer}>
        <TouchableOpacity
          style={[styles.amenityButton, selectedAmenities.includes('airconditioner') && styles.selectedAmenity]}
          onPress={() => toggleAmenity('airconditioner')}
        >
          <Image
            source={require('../Images/ic_airconditioner.png')}
            style={[styles.amenityIcon, selectedAmenities.includes('airconditioner') && styles.selectedAmenityIcon]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.amenityButton, selectedAmenities.includes('parking') && styles.selectedAmenity]}
          onPress={() => toggleAmenity('parking')}
        >
          <Image
            source={require('../Images/ic_parking.png')}
            style={[styles.amenityIcon, selectedAmenities.includes('parking') && styles.selectedAmenityIcon]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.amenityButton, selectedAmenities.includes('wifi') && styles.selectedAmenity]}
          onPress={() => toggleAmenity('wifi')}
        >
          <Image
            source={require('../Images/ic_wifi.png')}
            style={[styles.amenityIcon, selectedAmenities.includes('wifi') && styles.selectedAmenityIcon]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.amenityButton, selectedAmenities.includes('kitchen') && styles.selectedAmenity]}
          onPress={() => toggleAmenity('kitchen')}
        >
          <Image
            source={require('../Images/ic_kitchen.png')}
            style={[styles.amenityIcon, selectedAmenities.includes('kitchen') && styles.selectedAmenityIcon]}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Beds</Text>
        <View style={styles.counterContainer}>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={() => decreaseValue(setBeds)}
          >
            <Text style={styles.counterButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.counterText}>{beds}</Text>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={() => increaseValue(setBeds)}
          >
            <Text style={styles.counterButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Bedrooms</Text>
        <View style={styles.counterContainer}>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={() => decreaseValue(setBedrooms)}
          >
            <Text style={styles.counterButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.counterText}>{bedrooms}</Text>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={() => increaseValue(setBedrooms)}
          >
            <Text style={styles.counterButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Bathrooms</Text>
        <View style={styles.counterContainer}>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={() => decreaseValue(setBathrooms)}
          >
            <Text style={styles.counterButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.counterText}>{bathrooms}</Text>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={() => increaseValue(setBathrooms)}
          >
            <Text style={styles.counterButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Distance (km)</Text>
      <Slider
        style={{ width: '100%', marginBottom: 20 }}
        minimumValue={0}
        maximumValue={50}
        value={distance}
        onValueChange={setDistance}
        minimumTrackTintColor={primaryColor}
        maximumTrackTintColor="#000000"
        thumbTintColor={primaryColor}
      />
      <Text style={{ textAlign: 'center', marginBottom: 20 ,bottom:20,color:primaryColor}}>{distance.toFixed(1)} km</Text>

      <TouchableOpacity style={styles.filterapplyButton} onPress={handleApplyFilters}>
        <Text style={styles.filterapplyButtonText}>Apply Filters</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};



export default FilterScreen;
