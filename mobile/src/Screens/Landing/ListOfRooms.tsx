import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms } from '../../reducers/room/roomSlice';
import { RootState } from '../../reducers/store';
import { primaryColor, styles } from '../Styles/Styles';

const ListOfRooms = ({ navigation, setTabBarVisibility }) => {
  const dispatch = useDispatch();
  const { data, screen } = useSelector((state: RootState) => state.room);

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  const handleFilterPress = (filters) => {
    navigation.navigate('FilterScreen', {
      filters: filters,
    });
  };

  const handleDetails = () => {
    navigation.navigate('RoomDetails');
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={{ flexDirection: 'row' }}>
        {/* Convert base64 string to a data URI */}
        <Image 
          source={{ uri: `data:image/jpeg;base64,${item.image}` }} 
          style={styles.image} 
          onError={() => console.log('Image failed to load')} 
        />
        <View style={styles.info}>
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
            <TouchableOpacity style={styles.detailsButton} onPress={handleDetails}>
              <Text style={styles.detailsButtonText}>SEE DETAILS</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.roomlistcontainer}>
      <View style={styles.searchBarContainer}>
        <Image source={require('../Images/ic_search.png')} style={styles.searchIcon} />
        <TextInput
          placeholder="Search by name or location..."
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
      {screen.isBusy ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList 
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.roomName}
          contentContainerStyle={{ paddingBottom: 100 }} 
        />
      )}
    </View>
  );
};

export default ListOfRooms;
