import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import {styles} from '../Styles/Styles'

const { width } = Dimensions.get('window');

const RoomCard = ({ room }) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: `data:image/png;base64,${room.images[0]}` }} style={{
        width: 300,
        height: width / 2,
      }} />
      <View style={styles.cardDetails}>
        <Text style={styles.cardTitle}>{room.roomName}</Text>
        <View style={styles.cardrow}>
          <Text style={styles.cardDetail}>Rent: </Text><Text style={styles.cardValues}>₹{room.rent}</Text>
        </View>
        <View style={styles.cardrow}>
          <Text style={styles.cardDetail}>Looking for: </Text><Text style={styles.cardValues}>{room.gender}</Text>
        </View>
        <View style={styles.cardrow}>
          <Text style={styles.cardDetail}>Availability for: </Text><Text style={styles.cardValues}>{room.availability} members</Text>
        </View>
        <View style={styles.cardrow}>
          <Text style={styles.cardDetail}>FLoor: </Text><Text style={styles.cardValues}>{room.floor}</Text>
        </View>
        <View style={styles.cardrow}>
          <Text style={styles.cardDetail}>Room Type: </Text><Text style={styles.cardValues}>{room.roomType}</Text>
        </View>

      </View>
    </View>
  );
};

export default RoomCard;
