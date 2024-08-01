import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const RoomCard = ({ room }) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: `data:image/png;base64,${room.images[0]}` }} style={styles.cardImage} />
      <View style={styles.cardDetails}>
        <Text style={styles.cardTitle}>{room.roomName}</Text>
        <View style={styles.row}>
          <Text style={styles.cardDetail}>Rent: </Text><Text style={styles.cardValues}>₹{room.rent}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cardDetail}>Looking for: </Text><Text style={styles.cardValues}>{room.gender}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cardDetail}>Availability for: </Text><Text style={styles.cardValues}>{room.availability} members</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cardDetail}>FLoor: </Text><Text style={styles.cardValues}>{room.floor}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cardDetail}>Room Type: </Text><Text style={styles.cardValues}>{room.roomType}</Text>
        </View>
       
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: '60%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 3, // Add shadow for Android
    shadowColor: '#000', // Add shadow for iOS
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cardImage: {
    width: 300,
    height: width / 2,
  },
  cardDetails: {
    padding: 10,
    flex: 1,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: '#814ABF',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cardValues: {
    fontSize: 20,
  },
  cardDetail: {
    color: '#814ABF',
    fontSize: 22,
    fontWeight: 'bold',
  }
});

export default RoomCard;
