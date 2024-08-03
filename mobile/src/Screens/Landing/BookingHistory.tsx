import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducers/store';
import axios from 'axios';
import API_BASE_URL from '../../reducers/config/apiConfig';
import { getOrdersByCustomerId } from '../../reducers/orders/orderSlice';
const { width } = Dimensions.get('window');
const BookingHistory = () => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState('');
  const [roomIds, setRoomIds] = useState([]);
  const orderState = useSelector((state: RootState) => state.orders);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const value = await AsyncStorage.getItem('userId');
        if (value) {
          setUserId(value);
        }
      } catch (error) {
        console.error('Failed to fetch user ID from async storage', error);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (userId) {
          await dispatch(getOrdersByCustomerId(userId));
        }
      } catch (error) {
        console.error('Failed to fetch orders', error);
      }
    };

    fetchOrders();
  }, [dispatch, userId]);

  useEffect(() => {
    if (orderState.orders.length > 0) {
      const ids = orderState.orders.map(order => order.room_id);
      setRoomIds(ids);
      console.log('Room IDs:', ids);
    }
  }, [orderState.orders]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const fetchedRooms = [];
        for (const roomId of roomIds) {
          const response = await axios.get(`${API_BASE_URL}/room/getById`, {
            params: { room_id: roomId },
          });
          if (response?.status === 200 && response.data) {
            fetchedRooms.push(response.data.data);
          }
        }
        setRooms(fetchedRooms);
      } catch (error) {
        console.error('Failed to fetch room details', error);
      }
    };

    if (roomIds.length > 0) {
      fetchRooms();
    }
  }, [roomIds]);

  return (
    <ScrollView>
      <View style={styles.roomlistcontainer}>
        {rooms.map((room, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.bookedLabelContainer}>
              <Text style={styles.bookedLabel}>Booked</Text>
            </View>
            <View style={styles.cardContent}>
            <Image
                            source={{ uri: `data:image/png;base64,${room.images[0]}` }}
                            style={styles.image}
                            onError={() => console.log('Image failed to load')}
                        />
              <View style={styles.infoContainer}>
                <Text style={styles.roomName}>{room.roomName}</Text>
                <View style={styles.detailsContainer}>
                  <Text style={styles.detail}>Rent: ₹{room.rent}</Text>
                  <Text style={styles.detail}>Looking For: {room.gender}</Text>
                </View>
                <TouchableOpacity style={styles.detailsButton}>
                  <Text style={styles.detailsButtonText}>See Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
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
    shadowColor: '#814ABF',
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
    marginTop: 5,
  },
  cardImage: {
    width: 300,
    height: width / 2,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginRight: 20,
    
  },
  bookedLabelContainer: {
    position: 'absolute',
    top: 15,
    right: 5,
    backgroundColor: '#d4edda',
    borderColor: '#155724',
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
