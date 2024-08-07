import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserRooms } from '../../reducers/room/roomSlice'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const YourRooms = ({ navigation }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const dispatch = useDispatch();
  const userRooms = useSelector((state) => state.room.userRooms); 

  useEffect(() => {
    const getUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId) {
          setUserId(storedUserId);
        }
      } catch (error) {
        console.error('Failed to fetch userId from AsyncStorage', error);
      }
    };

    getUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserRooms(userId));
    }
  }, [dispatch, userId]);

  const handlePress = (room) => {
    navigation.navigate('RoomDetails', { room });
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={{ uri: `data:image/png;base64,${item.images[0]}` }}
          style={styles.image}
        />
        <View style={styles.info}>
          <Text style={[styles.name, { paddingBottom: 10 }]}>{item.roomName}</Text>
          <View style={{ flexDirection: 'row', gap: 5, paddingBottom: 10 }}></View>
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
            onPress={() => handlePress(item)}
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
        data={userRooms}
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
