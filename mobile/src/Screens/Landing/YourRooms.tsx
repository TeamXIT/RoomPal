import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';

const YourRooms = () => {
  const rooms = [
    {
      roomId: '1',
      roomName: 'Cozy Apartment',
      rent: 12000,
      gender: 'Female',
      distance: 2,
      images: ['base64encodedimage1'],
    },
    {
      roomId: '2',
      roomName: 'Spacious Condo',
      rent: 15000,
      gender: 'Male',
      distance: 5,
      images: ['base64encodedimage2'],
    },
    // Add more room objects here
  ];

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={{ uri: `data:image/png;base64,${item.images[0]}` }}
          style={styles.image}
        />
        <View style={styles.info}>
          <Text style={[styles.name, { paddingBottom: 10 }]}>{item.roomName}</Text>
          <View style={{ flexDirection: 'row', gap: 5, paddingBottom: 10 }}>
          </View>
          <View style={{ flexDirection: 'row', gap: 30 }}>
            <Text style={[{ paddingLeft: 5, fontSize: 16 }]}>Rent</Text>
            <Text style={[{ paddingLeft: 51, fontSize: 16 }]}>Looking for</Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 45, paddingBottom: 10 }}>
            <Text style={[styles.rent, { marginRight: 20 }]}> ₹{item.rent}</Text>
            <Text style={[styles.lookingFor]}> {item.gender}</Text>
          </View>
          <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
            <Text style={styles.distance}>{item.distance} Km</Text>
            <Text style={{ fontSize: 16, color: '#000' }}> from your search</Text>
          </View>
          <TouchableOpacity
            style={styles.detailsButton}
          >
            <Text style={styles.detailsButtonText}>SEE DETAILS</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={rooms}
        renderItem={renderItem}
        keyExtractor={(item) => item.roomId}
        contentContainerStyle={{ paddingBottom: 52 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#814ABF', 
    shadowOffset: {
      width: 2,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    padding: 15,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  image: {
    width: 150,
    height: 170,
    resizeMode: 'contain',
    alignSelf: 'center',
    left: -10,
  },
  info: {
    flex: 1,
    padding: 5,
    left: -15,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  rent: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  lookingFor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  distance: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  detailsButton: {
    height: 35,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#814ABF', 
    borderRadius: 8,
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default YourRooms;
