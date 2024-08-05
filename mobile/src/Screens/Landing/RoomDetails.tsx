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
import { primaryColor } from '../Styles/Styles';

// Importing local images
const backArrowImage = require('../Images/ic_backArrow.png');
const wifiImage = require('../Images/ic_wifi.png');
const bathroomImage = require('../Images/ic_bathRoom.png');
const airConditionerImage = require('../Images/ic_airconditioner.png');
const springBedImage = require('../Images/ic_springbed.png');
const kitchenImage = require('../Images/ic_kitchen.png');
const parkingImage = require('../Images/ic_parking.png');
const balconyImage = require('../Images/ic_balcony.png');
const dryearImage = require('../Images/ic_dryear.png')
const gymImage = require('../Images/ic_gym.png');
const washerImage = require('../Images/ic_washing_machine.png');
const heaterImage = require('../Images/ic_heater.png');
const poolImage = require('../Images/ic_pool.png');
const whatsappIcon = require('../Images/ic_whatsApp.png');
const telegramIcon = require('../Images/ic_telegram.png');
const { width } = Dimensions.get('window');

const RoomDetails = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.room);
  const room = route.params.room // Access the room data from route.params
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [roomName, setRoomName] = useState('');
  const [details, setDetails] = useState({});
  const [availability, setAvailability] = useState(false);
  const [roomType, setRoomType] = useState('');
  const [floor, setFloor] = useState(0);
  const [rent, setRent] = useState(0);
  const [location, setLocation] = useState({});
  const [amenities, setAmenities] = useState({});
  const [gender, setGender] = useState('');
  const [images, setImages] = useState([]);
  const [whatsappLink, setWhatsappLink] = useState('');
  const [telegramLink, setTelegramLink] = useState('');

  useEffect(() => {
    if (room) {
      setRoomName(room.roomName || '');
      setDetails(room.details || []);
      setAvailability(room.availability || false);
      setRoomType(room.roomType || '');
      setFloor(room.floor || 0);
      setRent(room.rent || 0);
      setLocation(room.location || {});
      setAmenities(room.amenities || {});
      setGender(room.gender || '');
      setImages(room.images || []);
      setWhatsappLink(room.whatsappLink || '');
      setTelegramLink(room.telegramLink || '');
    }
  }, [room]);

  const amenitiesIcons = [
    { name: 'wifi', icon: wifiImage },
    { name: 'airCondition', icon: airConditionerImage },
    { name: 'heater', icon: heaterImage },
    { name: 'washer', icon: washerImage },
    { name: 'dryer', icon: dryearImage },
    { name: 'kitchen', icon: kitchenImage },
    { name: 'parking', icon: parkingImage },
    { name: 'gym', icon: gymImage },
    { name: 'pool', icon: poolImage },
  ];

  useEffect(() => {
    if (data && data[0]) {
      setImages(data[0].images || []);
    }
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        setActiveIndex(prevIndex => (prevIndex + 1) % images.length);
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
          <Image source={item.src} style={styles.amenityImage} />
          <Text style={styles.amenityLabel}>{item.label}</Text>
        </View>
      </View>
    );
  };

  const bookAlert = () => {
    Alert.alert(
      'Ready to book!',
      'Are you sure! book this room?',
      [
        {
          text: 'NO',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'YES', onPress: () => navigation.navigate('MakeAnOrder', { room }) },
      ],
      { cancelable: false },
    );
  };

  const openWhatsApp = () => {
    if (data && data[0]) {
      const url = `whatsapp://send?text=Hello&phone=${data[0].whatsappLink}`;
      Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    }
  };

  const openTelegram = () => {
    if (data && data[0]) {
      const url = `tg://resolve?domain=${data[0].telegramLink}`;
      Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    }
  };

  return (
    <ScrollView style={styles.Roomcontainer}>
      <View style={styles.carouselContainer}>
      <View style={styles.headerContainer}>

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
        <TouchableOpacity >
            <Image source={require('../Images/ic_favorites.png')} style={styles.favoritesIcon} />
          </TouchableOpacity>
          </View>

        <Carousel
          ref={carouselRef}
          data={room.images}
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
        {/* {roomName ? <Text style={styles.roomdetails}>{roomName}</Text> : null} */}

        <View style={styles.ratingContainer}>
          <Text style={styles.Roomrating}>⭐4.9 </Text>
          <Text style={styles.middleDot}> •</Text>
          <Text style={styles.Roomreviews}>324 reviews</Text>
        </View>
        <Text style={styles.amenitiesTitle}>Amenities and facilities</Text>
        <View style={styles.amenitiesContainer}>
          {amenitiesIcons.map((amenity, index) => (
            room.amenities && room.amenities[amenity.name] ? (
              <Image
                key={index}
                source={amenity.icon}
                style={styles.amenityIcon}
              />
            ) : null
          ))}
        </View>
        <View style={{ paddingLeft: 10, paddingRight: 10, gap: 20 }}>
          <Text style={styles.roomdetails}>{room.detailsroomdetails}</Text>
          <Text style={[styles.roomdetails, { color: primaryColor, fontWeight: 'bold', fontSize: 20 }]}>Description:</Text>
          <Text style={styles.roomdetails}>{room.details}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={[styles.roomdetails, { color: primaryColor, fontWeight: 'bold', fontSize: 20 }]}>Room available for:</Text>
            <Text style={[styles.roomdetails]}>{room.availability} members</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={[styles.roomdetails, { color: primaryColor, fontWeight: 'bold', fontSize: 20 }]}>Room Type:</Text>
            <Text style={styles.roomdetails}>{room.roomType}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={[styles.roomdetails, { color: primaryColor, fontWeight: 'bold', fontSize: 20 }]}>Floor:</Text>
            <Text style={styles.roomdetails}>{room.floor}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

            <Text style={[styles.roomdetails, { color: primaryColor, fontWeight: 'bold', fontSize: 20 }]}>Location:</Text>
            <View>
              <Text style={styles.roomdetails}>Latitude :{room.location.lat}</Text>
              <Text style={styles.roomdetails}>Longitude :{room.location.lon}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={[styles.roomdetails, { color: primaryColor, fontWeight: 'bold', fontSize: 20 }]}>LookingFor:</Text>
            <Text style={styles.roomdetails}>{room.gender}</Text>
          </View>

        </View>

        <View style={styles.contactContainer}>
          <TouchableOpacity style={styles.contactButton} onPress={openWhatsApp}>
            <Image
              source={whatsappIcon}
              style={styles.contactIcon}
              tintColor={'#1B8755'}
            />
            {/* <Text style={styles.contactText}>WhatsApp: {data && data[0] && data[0].whatsappLink}</Text> */}
            <Text style={styles.contactText}>WhatsApp: {room.whatsappLink}</Text>

          </TouchableOpacity>
          <TouchableOpacity style={styles.contactButton} onPress={openTelegram}>
            <Image
              source={telegramIcon}
              style={styles.contactIcon}
              tintColor={'#0088cc'}
            />
            {/* <Text style={styles.contactText}>Telegram: {data && data[0] && data[0].telegramLink}</Text> */}
            <Text style={styles.contactText}>Telegram: {room.telegramLink}</Text>

          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ marginLeft: 10, marginRight: 35, marginTop: 15 }}>
            <Text style={styles.price}>₹ {room.rent}</Text>
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
    // position: 'absolute',
    // top: 10,
    // left: 10,
    // zIndex: 1,
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
  Roomtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: primaryColor
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
    color: primaryColor
  },
  // amenitiesContainer: {
  // flexDirection: 'row',
  // flexWrap: 'wrap',
  // justifyContent: 'space-between',
  // },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 1,
  },
  amenityIcon: {
    width: 35,
    height: 35,
    margin: 10,

  },

  amenityItem: {
    alignItems: 'center',
    marginVertical: 10,
  },
  amenityImage: {
    width: 30,
    height: 30,
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
    color: primaryColor,
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
    marginBottom: 5
  },
  bookButtonText: {
    color: 'white',
    fontSize: 18,
  }, roomdetails: {
    fontSize: 18,
    color: 'black'
  },
  headerContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1,
    alignItems: 'center',

  },
  favoritesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  favoritesIcon: {
    height: 30,
    width: 30,
    tintColor:'#FFFFFF'
  },

});

export default RoomDetails;