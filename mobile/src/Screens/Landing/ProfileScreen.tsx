import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { primaryColor } from '../Styles/Styles';

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
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Text style={styles.userName}>Profile</Text>
        
      </View>

      <TouchableOpacity style={styles.option} onPress={() => handleNavigation('EditProfile')}>
        <Image source={require('../Images/ic_person.png')} style={styles.optionIcon} />
        <Text style={styles.optionText}>Personal Details</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => handleNavigation('Favorites')}>
        <Image source={require('../Images/ic_favorites.png')} style={styles.optionIcon} />
        <Text style={styles.optionText}>Favorites</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => handleNavigation('YourRooms')}>
        <Image source={require('../Images/ic_office.png')} style={styles.optionIcon} />
        <Text style={styles.optionText}>Your Rooms</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => handleNavigation('BookingHistory')}>
        <Image source={require('../Images/ic_history.png')} style={styles.optionIcon} />
        <Text style={styles.optionText}>Booking History</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => handleNavigation('TransactionHistory')}>
        <Image source={require('../Images/ic_transaction.png')} style={styles.optionIcon} />
        <Text style={styles.optionText}>Transaction History</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={toggleModal}>
      <Image source={require('../Images/ic_logout.png')} style={styles.optionIcon} />
        <Text style={styles.optionText}>Logout</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Logout</Text>
            <Text style={styles.modalMessage}>Are you sure you want to log out?</Text>
            <TouchableOpacity style={styles.confirmButton} onPress={handleLogout}>
              <Text style={styles.confirmButtonText}>Yes, Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={toggleModal}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: primaryColor,
    marginBottom: 15,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: primaryColor,
  },
  userEmail: {
    fontSize: 16,
    color: '#888',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  optionIcon: {
    width: 30,
    height: 30,
    marginRight: 20,
    tintColor: primaryColor,
  },
  optionText: {
    fontSize: 18,
    color: '#333',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    
  },
  logoutText: {
    fontSize: 18,
    color: primaryColor,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: primaryColor,
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  confirmButton: {
    backgroundColor: primaryColor,
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 8,
    marginBottom: 10,
  },
  confirmButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 16,
  },
});

export default ProfileScreen;
