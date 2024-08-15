import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { primaryColor,styles } from '../Styles/Styles';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);

  const handleNavigation = (screenName) => {
    navigation.navigate(screenName);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleLogout = () => {
    console.log('Logged out');
    setModalVisible(false);
    // Add your logout logic here, like clearing user data and navigating to the login screen
  };

  return (
    <View style={styles.profilemaincontainer}>
      <View style={styles.profileContainer}>
        <Text style={styles.profileuserName}>Profile</Text>
        
      </View>

      <TouchableOpacity style={styles.profileoption} onPress={() => handleNavigation('EditProfile')}>
        <Image source={require('../Images/ic_person.png')} style={styles.profileoptionIcon} />
        <Text style={styles.profileoptionText}>Personal Details</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.profileoption} onPress={() => handleNavigation('Favorites')}>
        <Image source={require('../Images/ic_star.png')} style={styles.profileoptionIcon} />
        <Text style={styles.profileoptionText}>Favorites</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.profileoption} onPress={() => handleNavigation('YourRooms')}>
        <Image source={require('../Images/ic_office.png')} style={styles.profileoptionIcon} />
        <Text style={styles.profileoptionText}>Your Rooms</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.profileoption} onPress={() => handleNavigation('BookingHistory')}>
        <Image source={require('../Images/ic_history.png')} style={styles.profileoptionIcon} />
        <Text style={styles.profileoptionText}>Booking History</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.profileoption} onPress={() => handleNavigation('TransactionHistory')}>
        <Image source={require('../Images/ic_transaction.png')} style={styles.profileoptionIcon} />
        <Text style={styles.profileoptionText}>Transaction History</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.profilelogoutButton} onPress={toggleModal}>
      <Image source={require('../Images/ic_logout.png')} style={styles.profileoptionIcon} />
        <Text style={styles.profileoptionText}>Logout</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.profilemodalContainer}>
          <View style={styles.profilemodalContent}>
            <Text style={styles.profilemodalTitle}>Logout</Text>
            <Text style={styles.profilemodalMessage}>Are you sure you want to log out?</Text>
            <TouchableOpacity style={styles.profileconfirmButton} onPress={handleLogout}>
              <Text style={styles.profileconfirmButtonText}>Yes, Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.profilecancelButton} onPress={toggleModal}>
              <Text style={styles.profilecancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProfileScreen;
