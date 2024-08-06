import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState } from '../../reducers/store'; // Adjust the import based on your project structure
import { removeFromFavorites } from '../../reducers/room/roomSlice';
import { primaryColor,styles } from '../Styles/Styles';
import { ScrollView } from 'react-native-gesture-handler';

const Favorites = ({navigation}) => {
  const dispatch = useDispatch();
  const { data, screen } = useSelector((state: RootState) => state.room);
  const [localFavorites, setLocalFavorites] = useState<string[]>([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favoritesData = await AsyncStorage.getItem('favorites');
        if (favoritesData) {
          const favoritesArray = JSON.parse(favoritesData);
          setLocalFavorites(favoritesArray);
        }
      } catch (error) {
        console.error('Error loading favorites from AsyncStorage:', error);
      }
    };

    loadFavorites();
  }, []);

  useEffect(() => {
    const saveFavorites = async () => {
      try {
        await AsyncStorage.setItem('favorites', JSON.stringify(localFavorites));
      } catch (error) {
        console.error('Error saving favorites to AsyncStorage:', error);
      }
    };

    saveFavorites();
  }, [localFavorites]);

  const handleRemoveFavorite = (roomId: string) => {
    const updatedFavorites = localFavorites.filter(id => id !== roomId);
    setLocalFavorites(updatedFavorites);
    dispatch(removeFromFavorites(roomId));
  };

  const handleDetails = (room) => {
    navigation.navigate('RoomDetails', { room });
  };

  const favoriteRooms = data.filter(room => localFavorites.includes(room._id)).reverse();

  const renderFavoriteItem = ({ item }: { item: Room }) => (
    <View style={styles.card}>
      <View style={{ flexDirection: 'row',  }}>
        <Image
          source={{ uri: `data:image/png;base64,${item.images[0]}` }} // Ensure item.image is a valid URI
          style={styles.image}
          onError={() => console.log(`Failed to load image for room ${item._id}`)}
        />
        <View >
          <Text style={[styles.name, { paddingBottom: 10 }]}>{item.roomName}</Text>
          {/* <Text>Rent: ${item.rent}</Text> */}
          {/* <Text>Location: {item.location.lat}, {item.location.lon}</Text> */}
          {/* <Text>Available: {item.availability ? 'Yes' : 'No'}</Text> */}
          <View style={{ flexDirection: 'row', gap: 5, paddingBottom: 10 }}>
            <Text style={styles.location}>{item.address}</Text>
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
          <View style={{ flexDirection: 'row', gap: 20 }}>
            <Text style={[styles.match, { paddingBottom: 10 }]}>Match: {item.match}%</Text>
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => handleDetails(item)}
            >
              <Text style={styles.detailsButtonText}>SEE DETAILS</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={{marginTop: 8,padding: 8,backgroundColor: primaryColor,borderRadius: 4,alignItems:'center'}}
        onPress={() => handleRemoveFavorite(item._id)}
      >
        <Text style={{color: '#fff',fontWeight:'bold'}}>Remove from Favorites</Text>
      </TouchableOpacity>
    </View>
  );

  if (screen.isBusy) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView style={{flex: 1,padding: 16}}>
      {/* <Text style={{fontSize: 24,fontWeight: 'bold',marginBottom: 16,alignSelf:'center',color:primaryColor}}>Favorite Rooms</Text> */}
      {favoriteRooms.length === 0 ? (
        <Text style={{textAlign: 'center',marginTop: 20,fontSize: 16,color: '#888',}}>No favorite rooms</Text>
      ) : (
        <FlatList
          data={favoriteRooms}
          renderItem={renderFavoriteItem}
          keyExtractor={(item) => item._id}
        />
      )}
    </ScrollView>
  );
};


export default Favorites;



