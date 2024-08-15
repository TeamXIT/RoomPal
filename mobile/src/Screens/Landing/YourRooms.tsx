import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserRooms } from '../../reducers/room/roomSlice'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from '../Styles/Styles'

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
    <View style={styles.yourRoomscard}>
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={{ uri: `data:image/png;base64,${item.images[0]}` }}
          style={styles.yourRoomsimage}
        />
        <View style={styles.yourRoomsinfo}>
          <Text style={[styles.yourRoomsname, { paddingBottom: 10 }]}>{item.roomName}</Text>
          <View style={{ flexDirection: 'row', gap: 5, paddingBottom: 10 }}></View>
          <View style={{ flexDirection: 'row', gap: 30 }}>
            <Text style={[{ paddingLeft: 5, fontSize: 16 }]}>Rent</Text>
            <Text style={[{ paddingLeft: 51, fontSize: 16 }]}>Looking for</Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 45, paddingBottom: 10 }}>
            <Text style={[styles.yourRoomsrent, { marginRight: 20 }]}> ₹{item.rent}</Text>
            <Text style={[styles.yourRoomslookingFor]}> {item.gender}</Text>
          </View>
          <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
            <Text style={styles.yourRoomsdistance}>{item.distance} Km</Text>
            <Text style={{ fontSize: 16, color: '#000' }}> from your search</Text>
          </View>
          <TouchableOpacity
            style={styles.yourRoomsdetailsButton}
            onPress={() => handlePress(item)}
          >
            <Text style={styles.yourRoomsdetailsButtonText}>SEE DETAILS</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.yourRoomscontainer}>
      <FlatList
        data={userRooms}
        renderItem={renderItem}
        keyExtractor={(item) => item.roomId}
        contentContainerStyle={{ paddingBottom: 52 }}
      />
    </View>
  );
};


export default YourRooms;
