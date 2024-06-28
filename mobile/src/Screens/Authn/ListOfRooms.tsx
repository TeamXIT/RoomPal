import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { primaryColor } from '../Styles/Styles';
import { TextInput } from 'react-native-gesture-handler';

const data = [
  {
    id: '1',
    name: 'Nitish Kumar',
    location: 'Delhi',
    rent: 1500,
    lookingFor: 'Male',
    match: 54,
    image: 'https://thumbs.dreamstime.com/b/hotel-rooms-8146308.jpg',
    distance: 5,
  },
  {
    id: '2',
    name: 'John Doe',
    location: 'Mumbai',
    rent: 1800,
    lookingFor: 'Female',
    match: 62,
    image: 'https://media.istockphoto.com/id/627892060/photo/hotel-room-suite-with-view.jpg?s=612x612&w=0&k=20&c=YBwxnGH3MkOLLpBKCvWAD8F__T-ypznRUJ_N13Zb1cU=',
    distance: 10,
  },
  {
    id: '3',
    name: 'Rajesh',
    location: 'Udaipur',
    rent: 1400,
    lookingFor: 'Female',
    match: 62,
    image: 'https://t3.ftcdn.net/jpg/02/71/08/28/360_F_271082810_CtbTjpnOU3vx43ngAKqpCPUBx25udBrg.jpg',
    distance: 10,
  },
  {
    id: '4',
    name: 'Sanjay Kumar',
    location: 'Mumbai',
    rent: 1300,
    lookingFor: 'Female',
    match: 62,
    image: 'https://media.istockphoto.com/id/627892060/photo/hotel-room-suite-with-view.jpg?s=612x612&w=0&k=20&c=YBwxnGH3MkOLLpBKCvWAD8F__T-ypznRUJ_N13Zb1cU=',
    distance: 10,
  },
  {
    id: '5',
    name: 'John Doe',
    location: 'Udaipur',
    rent: 1500,
    lookingFor: 'Female',
    match: 62,
    image: 'https://thumbs.dreamstime.com/b/hotel-rooms-8146308.jpg',
    distance: 10,
  },
  {
    id: '6',
    name: 'John Doe',
    location: 'Nearby',
    rent: 1600,
    lookingFor: 'Female',
    match: 62,
    image: 'https://media.istockphoto.com/id/627892060/photo/hotel-room-suite-with-view.jpg?s=612x612&w=0&k=20&c=YBwxnGH3MkOLLpBKCvWAD8F__T-ypznRUJ_N13Zb1cU=',
    distance: 10,
  },
  // Add more data here
];

const ListOfRooms = () => {
  const [openGender, setOpenGender] = useState(false); // State to manage gender dropdown open/close
  const [filterGender, setFilterGender] = useState('Both'); // State to manage the selected gender filter
  const [openLocation, setOpenLocation] = useState(false); // State to manage location dropdown open/close
  const [filterLocation, setFilterLocation] = useState('All Delhi'); // State to manage the selected location filter

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      
      <View style={{ flexDirection: 'row' }}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.info}>
          <Text style={[styles.name, { paddingBottom: 10 }]}>{item.name}</Text>
          <View style={{ flexDirection: 'row', gap: 5, paddingBottom: 10 }}>
            <Image source={require('../Images/ic_location.png')} tintColor={primaryColor} />
            <Text style={styles.location}>{item.location}</Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 30 }}>
            <Text style={[{ paddingLeft: 5, fontSize: 16 }]}>Rent</Text>
            <Text style={[, { paddingLeft: 51, fontSize: 16 }]}>Looking for</Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 45, paddingBottom: 10 }}>
            <Text style={[styles.rent, { marginRight: 20 }]}> ₹{item.rent}</Text>
            <Text style={[styles.lookingFor]}> {item.lookingFor}</Text>
          </View>
          <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
            <Text style={styles.distance}>{item.distance} Km</Text>
            <Text style={{ fontSize: 16, color: '#000' }}> from your search</Text>
          </View>
          <View style={{flexDirection:'row',gap:20}}>
              <Text style={[styles.match, { paddingBottom: 10 }]}>Match: {item.match}%</Text>
              <TouchableOpacity style={styles.detailsButton}>
                <Text style={styles.detailsButtonText}>SEE DETAILS</Text>
              </TouchableOpacity>
          </View>
        </View>
      </View>




    </View>
  );

  const genderItems = [
    { label: 'Both', value: 'Both' },
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
  ];

  const locationItems = [
    { label: 'All Delhi', value: 'All Delhi' },
    { label: 'Mumbai', value: 'Mumbai' },
    { label: 'Nearby', value: 'Nellore' },
    { label: 'Panjam', value: 'Panjam' },
    { label: 'Nearby', value: 'Nearby' },
  ];

  const applyFilters = () => {
    // Filter data based on selected filters
    let filteredData = data;

    // Filter by gender
    if (filterGender !== 'Both') {
      filteredData = filteredData.filter(item => item.lookingFor === filterGender);
    }

    // Filter by location
    if (filterLocation !== 'All Delhi') {
      filteredData = filteredData.filter(item => item.location === filterLocation);
    }

    return filteredData;
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize:30,color:'#000',fontWeight:'bold'}}>Listed Rooms</Text>
      <TextInput placeholder='Search Here..'placeholderTextColor={''} style={{height:50,width:200,backgroundColor:'#f1f1f1',borderRadius:10,borderColor:'black',borderWidth:1,paddingLeft:20,marginTop:20,marginBottom:20,fontSize:16,color:'black'}}/>
      <View style={{ flexDirection: 'row', gap: -260 }}>
        <DropDownPicker
          open={openGender}
          value={filterGender}
          items={genderItems}
          setOpen={setOpenGender}
          setValue={setFilterGender}
          style={styles.dropdownPicker}
          containerStyle={styles.dropdownContainer}
          dropDownContainerStyle={styles.dropdown}
        />
        <DropDownPicker
          open={openLocation}
          value={filterLocation}
          items={locationItems}
          setOpen={setOpenLocation}
          setValue={setFilterLocation}
          style={styles.dropdownPicker}
          containerStyle={styles.dropdownContainer}
          dropDownContainerStyle={styles.dropdown}
        />
        <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
          <Text style={styles.applyButtonText}>Apply Filters</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={applyFilters()} // Render filtered data
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start'


  },
  filterText: {
    fontSize: 16,
  },
  dropdownPicker: {
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
    width: 100,

  },
  dropdownContainer: {
    marginBottom: 10,
  },
  dropdown: {
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
    marginTop: 10,
    width: 100,

  },
  applyButton: {
    backgroundColor: primaryColor,
    padding: 10,
    borderRadius: 5,
    width: 100,
    height: 50,
    alignItems:'center',
    justifyContent:'center'
  },
  applyButtonText: {
    color: '#fff',
    fontSize:14
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 2,
    borderColor: '#000',
    borderWidth: 3
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: 10,
    justifyContent:'center',
    alignSelf:'center'

  },
  info: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000'
  },
  location: {
    fontSize: 16,
    color: '#666',
  },
  rent: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  lookingFor: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  match: {
    fontSize: 16,
    color: '#666',
    top:5
  },
  distance: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold'
  },
  detailsButton: {
    marginTop: 10,
    height:35,
    width:120,
    justifyContent:'center',
    backgroundColor: primaryColor,
    borderRadius: 8,
    top:-10
  },
  detailsButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default ListOfRooms;
