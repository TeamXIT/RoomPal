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

// Importing local images
const backArrowImage = require('../Images/ic_backArrow.png');
const wifiImage = require('../Images/ic_wifi.png');
const bathroomImage = require('../Images/ic_bathRoom.png');
const airConditionerImage = require('../Images/ic_airconditioner.png');
const springBedImage = require('../Images/ic_springbed.png');
const kitchenImage = require('../Images/ic_kitchen.png');
const parkingImage = require('../Images/ic_parking.png');
const balconyImage = require('../Images/ic_balcony.png');

const {width} = Dimensions.get('window');

const images = [
  {
    id: 1,
    src: 'https://t3.ftcdn.net/jpg/02/71/08/28/360_F_271082810_CtbTjpnOU3vx43ngAKqpCPUBx25udBrg.jpg',
  },
  {
    id: 2,
    src: 'https://media.istockphoto.com/id/627892060/photo/hotel-room-suite-with-view.jpg?s=612x612&w=0&k=20&c=YBwxnGH3MkOLLpBKCvWAD8F__T-ypznRUJ_N13Zb1cU=',
  },
  {id: 3, src: 'https://thumbs.dreamstime.com/b/hotel-rooms-8146308.jpg'},
];

const amenities = [
  {id: 1, src: wifiImage, label: '100 Mbps Wifi'},
  {id: 2, src: bathroomImage, label: 'Inside Bathroom'},
  {id: 3, src: airConditionerImage, label: 'Air Conditioner'},
  {id: 4, src: springBedImage, label: 'Spring Bed'},
  {id: 5, src: kitchenImage, label: 'Kitchen'},
  {id: 6, src: parkingImage, label: 'Parking Area'},
  {id: 7, src: balconyImage, label: 'Balcony'},
];

const RoomDetails = ({ route }) => {
  const { roomName } = route.params;
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        setActiveIndex(prevIndex => (prevIndex + 1) % images.length);
        carouselRef.current.snapToNext();
      }
    }, 3000); // Adjust interval time as needed

    return () => clearInterval(interval);
  }, []);

  const renderCarouselItem = ({item}) => {
    return (
      <View style={styles.carouselItem}>
        <Image source={{uri: item.src}} style={styles.carouselImage} />
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
    const url = 'whatsapp://send?text=Hello&phone=+1234567890'; // Replace with your phone number
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  const openTelegram = () => {
    const url = 'tg://resolve?domain=your_telegram_username'; // Replace with your Telegram username
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
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
        <Text style={styles.Roomtitle}>De' Aura - Exclusive Kost</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.Roomrating}>⭐4.9 </Text>
          <Text style={styles.middleDot}> •</Text>
          <Text style={styles.Roomreviews}>324 reviews</Text>
        </View>

        <Text style={styles.amenitiesTitle}>Amenities and facilities</Text>
        <View style={styles.amenitiesContainer}>
          {amenities.map(item => renderAmenityItem({item}))}
        </View>
        <View style={styles.contactContainer}>
          <TouchableOpacity style={styles.contactButton} onPress={openWhatsApp}>
            <Image
              source={require('../Images/ic_whatsApp.png')}
              style={styles.contactIcon}
              tintColor={'#1B8755'}
            />
            <Text style={styles.contactText}>WhatsApp: +1234567890</Text>
           
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactButton} onPress={openTelegram}>
            <Image
              source={require('../Images/ic_telegram.png')}
              style={styles.contactIcon}
              tintColor={'#0088cc'}
            />
            <Text style={styles.contactText}>
              Telegram: @your_telegram_username
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{marginLeft: 10, marginRight: 35}}>
            <Text style={styles.price}>Rp1.650.000 </Text>
            <Text>per week </Text>
          </View>
          <TouchableOpacity style={styles.bookButton} onPress={bookAlert}>
            <Text style={styles.bookButtonText}>Pay</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bookChat} onPress={chatAlert}>
            <Image
              source={require('../Images/ic_chat.png')}
              style={{height: 20, width: 20}}
              tintColor={'#814ABF'}
            />
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
    height: 200,
    position: 'relative',
  },
  middleDot: {
    fontSize: 16,
    marginHorizontal: 5,
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
  },
  paginationContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  paginationText: {
    color: '#fff',
    fontSize: 14,
  },
  detailsContainer: {
    padding: 20,
  },
  Roomtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  Roomrating: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },
  Roomreviews: {
    fontSize: 16,
    color: 'gray',
    marginRight: 5,
  },
  availability: {
    fontSize: 16,
    color: 'red',
    marginVertical: 10,
  },
  host: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lastOnline: {
    fontSize: 14,
    color: 'gray',
  },
  amenitiesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: 'black',
    marginTop: 30,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  amenityItem: {
    alignItems: 'center',
    marginBottom: 10,
    width: width / 4 - 10, // Fit four items per row with some spacing
  },
  amenityImage: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  amenityLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginVertical: 10,
  },
  bookButton: {
    backgroundColor: '#814ABF',
    height: 45,
    width: 140,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    borderRadius: 10,
  },
  bookButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  bookChat: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    width: 50,
    borderColor: '#814ABF',
    borderWidth: 2,
    marginTop: 15,
    marginLeft: 8,
    borderRadius: 10,
  },
  contactContainer: {
    marginTop: 25,
    marginBottom:25
},
contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
},
contactIcon: {
    width: 28,
    height: 28,
    marginRight: 10,
    marginBottom: 15,
},
contactText: {
    fontSize: 18,
    color: 'black',
    marginBottom: 15,
},
});

export default RoomDetails;
