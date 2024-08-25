import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducers/store'; // Adjust the import based on your project structure
import { removeFromFavorites, fetchFavorites } from '../../reducers/favourites/favouritesSlice';
import { primaryColor, styles } from '../Styles/Styles';
import { ScrollView } from 'react-native-gesture-handler';

const Favorites = ({ navigation }) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.room);
  const { favorites } = useSelector((state: RootState) => state.favorite);
  const [favRooms, setFavRooms] = useState([]);

  useEffect(() => {
    dispatch(fetchFavorites())
      .then(() => setFavRooms(favorites));
  }, [dispatch, favorites]);

  const handleRemoveFavorite = (roomId: string) => {
    dispatch(removeFromFavorites(roomId));
  };

  const handleDetails = (room) => {
    navigation.navigate('RoomDetails', { room });
  };

  const renderFavoriteItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleRemoveFavorite(item._id)}>
           <Image source={require('../Images/ic_favorites_yellow.png')} />
      </TouchableOpacity>
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={{ uri: `data:image/png;base64,${item.images[0]}` }} // Ensure item.image is a valid URI
          style={styles.image}
          onError={() => console.log(`Failed to load image for room ${item._id}`)}
        />
        <View>
          <Text style={[styles.name, { paddingBottom: 10 }]}>{item.roomName}</Text>
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
    </View>
  );

  if (!data.length) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      {favRooms.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 16, color: '#888' }}>No favorite rooms</Text>
      ) : (
        <FlatList
          data={favRooms}
          renderItem={renderFavoriteItem}
          keyExtractor={(item) => item._id}
        />
      )}
    </ScrollView>
  );
};


export default Favorites;
