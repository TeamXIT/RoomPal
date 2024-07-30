import React, {useState, useRef, useEffect} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import {fetchRoomById, fetchRoomByName} from '../../reducers/room/roomSlice';

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

const {width} = Dimensions.get('window');

// const allAmenities = [
//   { id: 'wifi', src: wifiImage, label: '100 Mbps Wifi', value: 'wifi' },
//   { id: 'bathroom', src: bathroomImage, label: 'Inside Bathroom', value: 'bathroom' },
//   { id: 'airCondition', src: airConditionerImage, label: 'Air Conditioner', value: 'airCondition' },
//   { id: 'springBed', src: springBedImage, label: 'Spring Bed', value: 'springBed' },
//   { id: 'kitchen', src: kitchenImage, label: 'Kitchen', value: 'kitchen' },
//   { id: 'parking', src: parkingImage, label: 'Parking Area', value: 'parking' },
//   { id: 'balcony', src: balconyImage, label: 'Balcony', value: 'balcony' },
// ];

const RoomDetails = ({route,navigation}) => {
  const dispatch = useDispatch();
  const {data} = useSelector(state => state.room);
  const [details,setDetails]=useState({})
  const {roomId} = route.params;
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const response=dispatch(fetchRoomById(roomId));
    setDetails(response.data);
    console.log
  }, [dispatch, roomId]);

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

  const renderCarouselItem = ({item}) => {
    return (
      <View style={styles.carouselItem}>
        <Image
          source={{uri: `data:image/png;base64,${item}`}}
          style={styles.carouselImage}
        />
      </View>
    );
  };

  const renderAmenityItem = ({item}) => {
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
      'Booking Confirmation',
      'Are you sure you want to book this room?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
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
        {text: 'Yes', onPress: () => console.log('Yes Pressed')},
      ],
      {cancelable: false},
    );
  };

  const openWhatsApp = () => {
    if (data && data[0]) {
      const url = `whatsapp://send?text=Hello&phone=${data[0].whatsappLink}`;
      Linking.openURL(url).catch(err =>
        console.error("Couldn't load page", err),
      );
    }
  };

  const openTelegram = () => {
    if (data && data[0]) {
      const url = `tg://resolve?domain=${data[0].telegramLink}`;
      Linking.openURL(url).catch(err =>
        console.error("Couldn't load page", err),
      );
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
        <Text style={styles.Roomtitle}></Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.Roomrating}>⭐4.9 </Text>
          <Text style={styles.middleDot}> •</Text>
          <Text style={styles.Roomreviews}>324 reviews</Text>
        </View>

        <Text style={styles.amenitiesTitle}>Amenities and facilities</Text>
        {/* <View style={styles.amenitiesContainer}>
          {route.params.amenities.map((item) => renderAmenityItem({ item }))}
        </View> */}
        <View style={styles.contactContainer}>
          <TouchableOpacity style={styles.contactButton} onPress={openWhatsApp}>
            <Image
              source={whatsappIcon}
              style={styles.contactIcon}
              tintColor={'#1B8755'}
            />
            <Text style={styles.contactText}>
              WhatsApp: {data && data[0] && data[0].whatsappLink}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactButton} onPress={openTelegram}>
            <Image
              source={telegramIcon}
              style={styles.contactIcon}
              tintColor={'#0088cc'}
            />
            <Text style={styles.contactText}>
              Telegram: {data && data[0] && data[0].telegramLink}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{marginLeft: 10, marginRight: 35, marginTop: 15}}>
            <Text style={styles.price}> {data && data[0] && data[0].rent}</Text>
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
