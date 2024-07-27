import React, { useEffect, useState, useCallback, memo } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms } from '../../reducers/room/roomSlice';
import { RootState } from '../../reducers/store';
import { primaryColor, styles } from '../Styles/Styles';

const RoomCard = memo(({ item, handleDetails }) => ( //memo prevents unnecessary re-renders if props don't change
  <View style={styles.card}>
    <View style={{ flexDirection: 'row' }}>
      <Image 
        source={{ uri: `data:image/png;base64,${item.images[0]}` }} 
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
          <TouchableOpacity 
            style={styles.detailsButton} 
            onPress={() => handleDetails(item.roomName)}
          >
            <Text style={styles.detailsButtonText}>SEE DETAILS</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </View>
));

const ListOfRooms = ({ navigation, setTabBarVisibility }) => {
  const dispatch = useDispatch();
  const { data, screen, totalPages } = useSelector((state: RootState) => state.room);

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [allPagesLoaded, setAllPagesLoaded] = useState(false);

  useEffect(() => {
    if (currentPage === 1) {
      dispatch(fetchRooms(currentPage));
    }
  }, [dispatch, currentPage]);

  const handleFilterPress = (filters) => {
    navigation.navigate('FilterScreen', { filters });
  };

  const handleDetails = (roomName) => {
    navigation.navigate('RoomDetails', { roomName });
  };

  const handleLoadMore = useCallback(() => {
    if (!allPagesLoaded && !isFetchingMore && !screen.isBusy) {
      setIsFetchingMore(true);
      setCurrentPage(prevPage => {
        const newPage = prevPage + 1;
        dispatch(fetchRooms(newPage)).then(() => {
          if (newPage >= totalPages) {
            setAllPagesLoaded(true);
          }
        }).finally(() => setIsFetchingMore(false));
        return newPage;
      });
    }
  }, [allPagesLoaded, isFetchingMore, screen.isBusy, totalPages, dispatch]);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setCurrentPage(1);
    setAllPagesLoaded(false);
    dispatch(fetchRooms(1)).finally(() => setIsRefreshing(false));
  }, [dispatch]);

  const renderItem = ({ item }) => (
    <RoomCard item={item} handleDetails={handleDetails} />
  );

  if (screen.isBusy && !data.length) {
    return (
      <View style={styles.roomlistcontainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

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
      <FlatList 
        data={data}
        renderItem={renderItem}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5} // Trigger when 10% of the content is visible
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        ListFooterComponent={() => (
          isFetchingMore ? 
          <ActivityIndicator size="large" color={primaryColor} /> :
          (allPagesLoaded ? <Text>No more data</Text> : null)
        )}
        contentContainerStyle={{ paddingBottom: 70 }} 
       
      />
    </View>
  );
};

export default ListOfRooms;
