import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Alert,
  Linking,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoomById } from '../../reducers/room/roomSlice';
import { RootState } from '../../reducers/store';
import API_BASE_URL from '../../reducers/config/apiConfig';
import axios from 'axios';

// Importing local images
const backArrowImage = require('../Images/ic_backArrow.png');
const wifiImage = require('../Images/ic_wifi.png');
const bathroomImage = require('../Images/ic_bathRoom.png');
const airConditionerImage = require('../Images/ic_airconditioner.png');
const springBedImage = require('../Images/ic_springbed.png');
const kitchenImage = require('../Images/ic_kitchen.png');
const parkingImage = require('../Images/ic_parking.png');
const balconyImage = require('../Images/ic_balcony.png');
const whatsappIcon = require('../Images/ic_whatsApp.png');
const telegramIcon = require('../Images/ic_telegram.png');

const { width } = Dimensions.get('window');

// const allAmenities = [
//   { id: 'wifi', src: wifiImage, label: '100 Mbps Wifi', value: 'wifi' },
//   { id: 'bathroom', src: bathroomImage, label: 'Inside Bathroom', value: 'bathroom' },
//   { id: 'airCondition', src: airConditionerImage, label: 'Air Conditioner', value: 'airCondition' },
//   { id: 'springBed', src: springBedImage, label: 'Spring Bed', value: 'springBed' },
//   { id: 'kitchen', src: kitchenImage, label: 'Kitchen', value: 'kitchen' },
//   { id: 'parking', src: parkingImage, label: 'Parking Area', value: 'parking' },
//   { id: 'balcony', src: balconyImage, label: 'Balcony', value: 'balcony' },
// ];


const amenitiesImages = {
  wifi: wifiImage,
  airCondition: airConditionerImage,
  heater: bathroomImage,
  washer: springBedImage,
  dryer: kitchenImage,
  kitchen: parkingImage,
  parking: balconyImage,
  gym: wifiImage,
  pool: bathroomImage,
};




const RoomDetails = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { roomData,screen } = useSelector((state: RootState) => state.room);
  // const { room } = route;
  const staticId = '6687da0442ff380054d83190';

  const { roomId = staticId } = route.params || {};

  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [roomName, setRoomName] = useState('');
  const [details, setDetails] = useState({});
  const [availability, setAvailability] = useState(false);
  const [roomType, setRoomType] = useState('');
  const [floor, setFloor] = useState(0);

  const [rent, setRent] = useState(0);
  const [location, setLocation] = useState({});

  const [amenities, setamenities] = useState({});
  const [gender, setGender] = useState('');

  const [images, setImages] = useState([]);

  const [whatsappLink, setWhatsappLink] = useState('');
  const [telegramLink, setTelegramLink] = useState('');





  
  
  
  
  

  useEffect(() => {
    dispatch(fetchRoomById(roomId));
  }, [dispatch, roomId]);

  useEffect(() => {
    if (roomData && roomData[0]) {
      setImages(roomData[0].images || []);
    }
  }, [roomData]);
  
  
  
  
  
  
  

  useEffect(() => {
    if (roomData) {
      setRoomName(roomData.roomName);
      setDetails(roomData.details)
      setAvailability(roomData.availability);
      setRoomType(roomData.roomType);
      setFloor(roomData.floor);
      setRent(roomData.rent);
      setLocation(roomData.location);
      setamenities(roomData.amenities|| {});
      setGender(roomData.gender);
      setImages(roomData.images );

      setWhatsappLink(roomData.whatsappLink);
      setTelegramLink(roomData.telegramLink);

    }
  }, [roomData]);

  
  

  
  
  
  

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

  
  

 

 
 
 
 

    
    
    
    
    
    
    
    
    
  














  console.log('RoomDetails:',
    roomName,
    details,
    availability,
    roomType,
    floor,
    rent,
    location,
    amenities,
    gender,
    whatsappLink,
    telegramLink,
    images,

  )










  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        setActiveIndex(prevIndex => (prevIndex + 1) % roomData.images.length);
        carouselRef.current.snapToNext();
      }
    }, 3000); // Adjust interval time as needed

    return () => clearInterval(interval);
  }, [images]);

  const renderCarouselItem = ({ item }) => {
    return (
      <View style={styles.carouselItem}>
        <Image source={{ uri: `data:image/png;base64,${item}` }} style={styles.carouselImage} />
      </View>
    );
  };

  const renderAmenityItem = ({ item }) => {
    // const amenityKey = item; // Assuming item is a string key here

    return (
      <View style={styles.amenityItem}>
        <View
          style={{
            height: 90,
            width: 80,
            borderColor: 'black',
            borderWidth: 0.5,
            alignItems: 'center',
            borderRadius: 10,
            padding: 5,
          }}>
          {/* <Image source={item.src} style={styles.amenityImage} /> */}
          <Image source={amenitiesImages[item]} style={styles.amenityImage} />

          {/* <Text style={styles.amenityLabel}>{item.label}</Text> */}
          <Text style={styles.amenityLabel}>
          {item.charAt(0).toUpperCase() + item.slice(1)}
          </Text>
        </View>
      </View>
    );
  };

  const bookAlert = () => {
    Alert.alert(
      'Booking Confirmation',
      'Are you sure you want to book this room?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  };

  const chatAlert = () => {
    Alert.alert(
      'Are you looking for chat',
      'Are you sure you want to chat with me?',
      [
        {
          text: 'No',
          onPress: () => console.log('No Pressed'),
          style: 'cancel',
        },
        { text: 'Yes', onPress: () => console.log('Yes Pressed') },
      ],
      { cancelable: false },
    );
  };

  const openWhatsApp = () => {
    if (roomData && roomData[0]) {
      const url = `whatsapp://send?text=Hello&phone=${roomData[0].whatsappLink}`;
      Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    }
  };

  const openTelegram = () => {
    if (roomData && roomData[0]) {
      const url = `tg://resolve?domain=${roomData[0].telegramLink}`;
      Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    }
  };

  return (
    <ScrollView style={styles.Roomcontainer}>
      <View style={styles.carouselContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backArrowContainer}>
          <View
            style={{
              height: 35,
              width: 35,
              borderRadius: 20,
              backgroundColor: '#FFFFFF',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={backArrowImage} style={styles.backArrow} />
          </View>
        </TouchableOpacity>
        <Carousel
          ref={carouselRef}
          data={images}
          renderItem={renderCarouselItem}
          sliderWidth={width}
          itemWidth={width}
          onSnapToItem={index => setActiveIndex(index)}
          loop={true} // Enable looping
          autoplay={false} // Autoplay controlled manually
        />
        <View style={styles.paginationContainer}>
          <Text style={styles.paginationText}>
          {activeIndex + 1} / {images.length}
          </Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>

        <Text style={styles.Roomtitle}>{roomName}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.Roomrating}>⭐4.9 </Text>
          <Text style={styles.middleDot}> •</Text>
          <Text style={styles.Roomreviews}>324 reviews</Text>
        </View>

        <Text style={styles.amenitiesTitle}>Amenities and facilities</Text>
        {/* <View style={styles.amenitiesContainer}>
          {route.params.amenities.map((item) => renderAmenityItem({ item }))}
        </View> */}
        {Object.keys(amenities).map(key => (
          amenities[key] ? renderAmenityItem({ item: key }) : null
        ))}
       
       
        <View style={styles.contactContainer}>
          <TouchableOpacity style={styles.contactButton} onPress={openWhatsApp}>
            <Image
              source={whatsappIcon}
              style={styles.contactIcon}
              tintColor={'#1B8755'}
            />
            {/* <Text style={styles.contactText}>WhatsApp: {data && data[0] && data[0].whatsappLink}</Text> */}
            <Text style={styles.contactText}>WhatsApp: {whatsappLink}</Text>

          </TouchableOpacity>
          <TouchableOpacity style={styles.contactButton} onPress={openTelegram}>
            <Image
              source={telegramIcon}
              style={styles.contactIcon}
              tintColor={'#0088cc'}
            />
            {/* <Text style={styles.contactText}>Telegram: {data && data[0] && data[0].telegramLink}</Text> */}
            <Text style={styles.contactText}>Telegram: {telegramLink}</Text>

          </TouchableOpacity>
          <View>
            <Text style={{ color: 'red', fontSize: 16 }}>{floor}</Text>
            <Text style={{ color: 'red', fontSize: 16 }}>{rent}</Text>
            <Text style={{ color: 'red', fontSize: 16 }}>{roomName}</Text>
            <Text style={{ color: 'red', fontSize: 16 }}>{roomType}</Text>
            <Text style={{ color: 'red', fontSize: 16 }}>{availability}</Text>
            <Text style={{ color: 'red', fontSize: 16 }}>{gender}</Text>
          </View>




        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ marginLeft: 10, marginRight: 35, marginTop: 15 }}>
            {/* <Text style={styles.price}> {data && data[0] && data[0].rent}</Text> */}
            <Text style={styles.price}> {rent}</Text>

          </View>
          <TouchableOpacity style={styles.bookButton} onPress={bookAlert}>
            <Text style={styles.bookButtonText}>Book now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Roomcontainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  carouselContainer: {
    marginBottom: 10,
  },
  backArrowContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  backArrow: {
    width: 24,
    height: 24,
  },
  carouselItem: {
    width: width,
    height: 200,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    alignItems: 'center',

  },
  paginationContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationText: {
    color: 'white',
    fontSize: 16,
  },
  detailsContainer: {
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  Roomtitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  Roomrating: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  middleDot: {
    fontSize: 18,
    marginHorizontal: 2,
  },
  Roomreviews: {
    fontSize: 18,
    color: 'gray',
  },
  amenitiesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  amenityItem: {
    alignItems: 'center',
    marginVertical: 10,
  },
  amenityImage: {
    width: 50,
    height: 50,
  },
  amenityLabel: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },
  contactContainer: {
    marginTop: 15,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  contactIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  contactText: {
    fontSize: 16,
    color: '#555',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
    marginBottom: 15,
  },
  bookButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: 10,
  },
  bookButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default RoomDetails;
