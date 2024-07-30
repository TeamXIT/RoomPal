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
import { useDispatch } from 'react-redux';
import axios from 'axios';
import API_BASE_URL from '../../reducers/config/apiConfig';

// Importing local images
const backArrowImage = require('../Images/ic_backArrow.png');
const wifiImage = require('../Images/ic_wifi.png');
const bathroomImage = require('../Images/ic_bathRoom.png');
const airConditionerImage = require('../Images/ic_airconditioner.png');
const springBedImage = require('../Images/ic_springbed.png');
const kitchenImage = require('../Images/ic_kitchen.png');
const parkingImage = require('../Images/ic_parking.png');
const balconyImage = require('../Images/ic_balcony.png');
const gymImage = require('../Images/ic_gym.png');
const washerImage = require('../Images/ic_washing-machine.png');
const heaterImage = require('../Images/ic_heater.png');
const poolImage = require('../Images/ic_pool.png');
const whatsappIcon = require('../Images/ic_whatsApp.png');
const telegramIcon = require('../Images/ic_telegram.png');

const { width } = Dimensions.get('window');

const RoomDetails = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const { roomId } = route.params;
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [amenities, setAmenities] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/room/getById`, {
          params: { room_id: roomId },
        });
        setData(response.data.data);
        console.log(response.data.data);
        setAmenities(response.data.data.amenities);
        console.log(amenities);
        setImages(response.data.data.images || []);
      } catch (error) {
        console.error('Error fetching room data:', error);
      }
    };

    fetchData();
  }, [dispatch, roomId]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current && images.length > 0) {
        setActiveIndex(prevIndex => (prevIndex + 1) % images.length);
        carouselRef.current.snapToNext();
      }
    }, 3000); // Adjust interval time as needed

    return () => clearInterval(interval);
  }, [images]);

  const renderCarouselItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image
        source={{ uri: `data:image/png;base64,${item}` }}
        style={styles.carouselImage}
      />
    </View>
  );

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

  const openWhatsApp = () => {
    if (data && data.whatsappLink) {
      const url = `whatsapp://send?text=Hello&phone=${data.whatsappLink}`;
      Linking.openURL(url).catch(err =>
        console.error("Couldn't load page", err),
      );
    }
  };

  const openTelegram = () => {
    if (data && data.telegramLink) {
      const url = `tg://resolve?domain=${data.telegramLink}`;
      Linking.openURL(url).catch(err =>
        console.error("Couldn't load page", err),
      );
    }
  };

  const amenitiesIcons = [
    { name: 'wifi', icon: wifiImage },
    { name: 'airCondition', icon: airConditionerImage },
    { name: 'parking', icon: parkingImage },
    // { name: 'kitchen', icon: kitchenImage },
    { name: 'gym', icon: gymImage },
    { name: 'washer', icon: washerImage },
    { name: 'heater', icon: heaterImage },
    { name: 'pool', icon: poolImage },
  ];

  if (!data) {
    return (
      <View style={styles.loaderContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.carouselContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backArrowContainer}>
          <View style={styles.backArrowWrapper}>
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
          loop={true}
          autoplay={false}
        />
        <View style={styles.paginationContainer}>
          <Text style={styles.paginationText}>
            {activeIndex + 1} / {images.length}
          </Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{data.roomName}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>⭐4.9 </Text>
          <Text style={styles.middleDot}> •</Text>
          <Text style={styles.reviews}>324 reviews</Text>
        </View>

        <Text style={styles.amenitiesTitle}>Amenities and facilities</Text>
        <View style={styles.amenitiesContainer}>
          {amenitiesIcons.map((amenity, index) => (
            data.amenities && data.amenities[amenity.name] ? (
              <Image
                key={index}
                source={amenity.icon}
                style={styles.amenityIcon}
              />
            ) : null
          ))}
        </View>
        <View style={styles.contactContainer}>
          <TouchableOpacity style={styles.contactButton} onPress={openWhatsApp}>
            <Image
              source={whatsappIcon}
              style={styles.contactIcon}
              tintColor={'#1B8755'}
            />
            <Text style={styles.contactText}>
              WhatsApp: {data.whatsappLink}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactButton} onPress={openTelegram}>
            <Image
              source={telegramIcon}
              style={styles.contactIcon}
              tintColor={'#0088cc'}
            />
            <Text style={styles.contactText}>
              Telegram: {data.telegramLink}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ marginLeft: 10, marginRight: 35, marginTop: 15 }}>
            <Text style={styles.price}>{data.rent}</Text>
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
  container: {
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
  backArrowWrapper: {
    height: 35,
    width: 35,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  rating: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  middleDot: {
    fontSize: 18,
    marginHorizontal: 2,
  },
  reviews: {
    fontSize: 18,
    color: 'gray',
  },
  amenitiesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  amenityIcon: {
    width: 50,
    height: 50,
    margin: 10,
  },
  contactContainer: {
    marginVertical: 20,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  contactIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  contactText: {
    fontSize: 16,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  bookButton: {
    backgroundColor: '#1B8755',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default RoomDetails;
