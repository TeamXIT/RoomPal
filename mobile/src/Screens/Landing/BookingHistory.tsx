import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const BookingHistory = () => {
    const bookings = [
        {
          roomName: "Cozy Room ",
          rent: "₹5000",
          lookingFor: "Male",
          date: "August 5, 2024",
          imageSource: require('../Images/ic_kitchen.png'),
        },
        {
          roomName: "Modern Studio Apartment",
          rent: "₹8000",
          lookingFor: "Female",
          date: "August 10, 2024",
          imageSource: require('../Images/ic_balcony.png'),
        },
    ];
  
    return (
        <View style={styles.roomlistcontainer}>
            {bookings.map((booking, index) => (
                <View key={index} style={styles.card}>
                    <View style={styles.bookedLabelContainer}>
                        <Text style={styles.bookedLabel}>Booked</Text>
                    </View>
                    <View style={styles.cardContent}>
                        <Image
                            source={booking.imageSource}
                            style={styles.image}
                            onError={() => console.log('Image failed to load')}
                        />
                        <View style={styles.infoContainer}>
                            <Text style={styles.roomName}>{booking.roomName}</Text>
                            <View style={styles.detailsContainer}>
                                <Text style={styles.detail}>Rent: {booking.rent}</Text>
                                <Text style={styles.detail}>Looking For: {booking.lookingFor}</Text>
                                <Text style={styles.detail}>Date: {booking.date}</Text>
                            </View>
                            <TouchableOpacity style={styles.detailsButton}>
                                <Text style={styles.detailsButtonText}>See Details</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    roomlistcontainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingTop: 5,
    },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 15,
    shadowColor:'#814ABF',
    shadowOffset: {
        width: 2,
        height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    marginTop:5
    
  },
  bookedLabelContainer: {
    position: 'absolute',
    top: 15,
    right: 5,
    backgroundColor: '#d4edda', // Light green background
    borderColor: '#155724', // Dark green border
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    zIndex: 1,
  },
  bookedLabel: {
    color: '#155724',
    fontWeight: 'bold',
    fontSize: 14,
    
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginRight: 20,
    
  },
  infoContainer: {
    flex: 1,
  },
  roomName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  detailsContainer: {
    flexDirection: 'column',
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  detailsButton: {
    backgroundColor: '#814ABF', 
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default BookingHistory;
