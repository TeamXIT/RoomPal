import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducers/store';
import axios from 'axios';
import { getOrdersByCustomerId } from '../../reducers/orders/orderSlice';
import { API_BASE_URL } from '../../reducers/config/appConfig';
import {styles} from '../Styles/Styles'

const { width } = Dimensions.get('window');
const BookingHistory = () => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState('');
  const [roomIds, setRoomIds] = useState<any[]>([]);
  const orderState = useSelector((state: RootState) => state.orders);
  const [rooms, setRooms] = useState<any[]>([]);

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
      <View style={styles.bookingroomlistcontainer}>
        {rooms.map((room, index) => (
          <View key={index} style={styles.bookingcard}>
            <View style={styles.bookedLabelContainer}>
              <Text style={styles.bookedLabel}>Booked</Text>
            </View>
            <View style={styles.bookingcardContent}>
              <Image
                source={{ uri: `data:image/png;base64,${room.images[0]}` }}
                style={styles.bookingimage}
                onError={() => console.log('Image failed to load')}
              />
              <View style={styles.bookinginfoContainer}>
                <Text style={styles.bookingroomName}>{room.roomName}</Text>
                <View style={styles.bookingdetailsContainer}>
                  <Text style={styles.bookingdetail}>Rent: ₹{room.rent}</Text>
                  <Text style={styles.bookingdetail}>Looking For: {room.gender}</Text>
                </View>
                <TouchableOpacity style={styles.bookingdetailsButton}>
                  <Text style={styles.bookingdetailsButtonText}>See Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default BookingHistory;
