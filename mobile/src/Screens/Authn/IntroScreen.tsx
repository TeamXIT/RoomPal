// IntroSlider.js

import React, { useRef, useState } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import {styles} from '../Styles/Styles'

const image1 = require('../Images/intro_image2.png');
const image2 = require('../Images/intro_image2.png');
const image3 = require('../Images/intro_image3.png');
const image4 = require('../Images/intro_image4.png');



const slides = [
    {
        key: 's1',
        text: 'Keep in touch with your loved ones and stay updated.',
        title: 'Stay Connected',
        image: image1,
        backgroundColor: '#e6daf1',
    },
    {
        key: 's2',
        title: 'Easy to Use',
        text: 'Our app is user-friendly and easy to navigate.',
        image: image2,
        backgroundColor: '#e6daf1',
    },
    {
        key: 's3',
        title: 'Find Roommates',
        text: 'Connect with potential roommates in your area.',
        image: image3,
        backgroundColor: '#e6daf1',
    },
    {
        key: 's5',
        title: 'Personalized Matches',
        text: 'Get matched with roommates based on preferences.',
        image: image4,
        backgroundColor: '#e6daf1',
    },
    
];

const RoomPalIntro = ({ navigation }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef(null);

    const onDone = () => {
        navigation.navigate("LoginScreen");
    };

    const onSkip = () => {
        navigation.navigate("LoginScreen");
    };

    const onNext = () => {
        if (sliderRef.current) {
            sliderRef.current.goToSlide(currentIndex + 1);
            setCurrentIndex(currentIndex + 1);
        } 
    };

    const RenderItem = ({ item }) => {
        return (
            <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
                <View style={{backgroundColor:'#FFFFFF',alignItems:'center',borderRadius:10,paddingTop:20}}>
                <Image style={styles.introImageStyle} source={item.image} />
                <Text style={styles.introTitleStyle}>{item.title}</Text>
                <Text style={styles.introTextStyle}>{item.text}</Text>
                </View>
            </View>
        );
    };

    const renderNextButton = () => {
        return (
            <TouchableOpacity style={styles.introbutton} onPress={onNext}>
                <Text style={[styles.introbuttonText,{ color: '#814ABF' }]}>Next</Text>
            </TouchableOpacity>
        );
    };

    const renderSkipButton = () => {
        return (
            <TouchableOpacity style={styles.introbutton} onPress={onSkip}>
                <Text style={[styles.introbuttonText, { color: '#814ABF' }]}>Skip</Text>
            </TouchableOpacity>
        );
    };

    const renderDoneButton = () => {
        return (
            <TouchableOpacity style={styles.introbutton} onPress={onDone}>
                <Text style={[styles.introbuttonText, { color: '#814ABF' }]}>Done</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <AppIntroSlider
                ref={sliderRef}
                data={slides}
                renderItem={RenderItem}
                renderNextButton={renderNextButton}
                renderSkipButton={renderSkipButton}
                renderDoneButton={renderDoneButton}
                showSkipButton={true}
                dotStyle={styles.dotStyle}
                activeDotStyle={styles.activeDotStyle}
                onSlideChange={(index) => setCurrentIndex(index)}
            />
        </View>
    );
};

export default RoomPalIntro;



















































