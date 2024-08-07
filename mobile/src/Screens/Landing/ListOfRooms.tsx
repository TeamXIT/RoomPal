import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoomById, fetchRooms, addToFavorites, removeFromFavorites, } from '../../reducers/room/roomSlice';
import { RootState } from '../../reducers/store';
import { primaryColor, styles } from '../Styles/Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListOfRooms = ({ navigation, setTabBarVisibility, route }) => {
  const dispatch = useDispatch();
  const { data, screen, roomData, totalPages, favorites } = useSelector((state: RootState) => state.room);

  const { minRent, maxRent, gender, roomType, location, availability } = route.params || {};

  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  // const [localFavorites, setLocalFavorites] = useState(favorites); // Local state for immediate feedback
  const [localFavorites, setLocalFavorites] = useState<string[]>([]);


  useEffect(() => {
    dispatch(fetchRooms(20, page, minRent, maxRent, gender, roomType, location, availability)).finally(() => setLoading(false));
  }, [dispatch, page]);

  const handleFilterPress = (filters) => {
    navigation.navigate('FilterScreen', {
      filters: filters,
    });
  };

  const handleDetails = (room,favorites) => {
    navigation.navigate('RoomDetails', { room,favorites });
  };

  const filterRoomsByName = () => {
    if (!searchQuery) return data;
    return data.filter(room =>
      room.roomName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  
  




  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoritesData = await AsyncStorage.getItem('favorites');
        if (favoritesData) {
          setLocalFavorites(JSON.parse(favoritesData));
        }
      } catch (error) {
        console.error('Error fetching favorites from AsyncStorage:', error);
      }
    };

    fetchFavorites();
  }, []);
  
  useEffect(() => {
    setLocalFavorites(favorites);// Sync 
    
    
    
  }, [favorites]);
  // const handleFavorite = (roomId: string) => {
    // if (favorites.includes(roomId)) {
      // dispatch(removeFromFavorites(roomId));
    // } else {
      // dispatch(addToFavorites(roomId));
    // }
  // };
  
  const handleFavorite = async (roomId: string) => {
    try {
      if (localFavorites.includes(roomId)) {
        await dispatch(removeFromFavorites(roomId));
        const updatedFavorites = localFavorites.filter(id => id !== roomId);
        setLocalFavorites(updatedFavorites);
        await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      } else {
        await dispatch(addToFavorites(roomId));
        const updatedFavorites = [...localFavorites, roomId];
        setLocalFavorites(updatedFavorites);
        await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      }
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={{ uri: `data:image/png;base64,${item.images[0]}` }}
          style={styles.image}
          onError={() => console.log('Image failed to load')}
        />
        <View style={styles.info}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={[styles.name, { paddingBottom: 10 }]}>{item.roomName}</Text>
            <TouchableOpacity onPress={() => handleFavorite(item._id)}>
              {/* <Image source={require('../Images/ic_favorites.png')} style={{height:30,width:30}}/> */}
              <View
                style={[
                  { justifyContent: 'center', alignItems: 'center', borderRadius: 15, height: 30, width: 30, overflow: 'hidden' },
                ]}
              >
                <Image
                  source={localFavorites.includes(item._id) ? require('../Images/ic_favorites_yellow.png') : require('../Images/ic_favorites_gray.png')} // Use different images
                  style={{ height: 30, width: 30 }}
                />
                </View>
            </TouchableOpacity>
          </View>
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

  const onScroll = () => {
    if (!screen.isBusy && page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (loading && page === 1) {
    return (
      <View style={styles.roomlistcontainer}>
        <ActivityIndicator size="large" color={primaryColor} />
        <Text>Loading...</Text>
      </View>
    );
  }

  const filteredData = filterRoomsByName();

  return (
    <View style={styles.roomlistcontainer}>
      <View style={styles.searchBarContainer}>
        <Image source={require('../Images/ic_search.png')} style={styles.searchIcon} />
        <TextInput
          placeholder="Search by name..."
          placeholderTextColor="#666"
          style={styles.searchinput}
          value={searchQuery}
          onFocus={() => setTabBarVisibility(false)}
          onBlur={() => setTabBarVisibility(true)}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity onPress={() => handleFilterPress({})}>
          <Image source={require('../Images/ic_filter.png')} style={styles.filterIcon} />
        </TouchableOpacity>
      </View>

      {filteredData.length > 0 ? (
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          // keyExtractor={(item) => item.roomId}
          keyExtractor={(item) => item._id}

          contentContainerStyle={{ paddingBottom: 52 }}
          onScroll={onScroll}
          onEndReachedThreshold={0.1}
        />
      ) : (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>No rooms found matching your search.</Text>
        </View>
      )}

    </View>
  );
};

export default ListOfRooms;
