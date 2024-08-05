import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { primaryColor } from "../Styles/Styles";
import { Button } from "react-native-paper";

const TransactionHistory = () => {
    const [selectedTab, setSelectedTab] = useState('Ongoing');

    const renderBookings = () => {
        switch (selectedTab) {
            case 'Ongoing':
                return (
                    <><><View style={styles.bookingContainer}>
                        {/* Render Ongoing Bookings here */}
                        <View style={styles.bookingItem}>
                            <Image
                                style={styles.bookingImage}
                                source={{ uri: 'https://hdwallpaperim.com/wp-content/uploads/2017/08/25/121661-living_rooms-interiors-interior_design.jpg' }} />
                            <View style={{ gap: 12 }}>
                                <Text style={styles.bookingText}>Royale President</Text>
                                <View style={{ flexDirection: 'row', gap: 10 }}>
                                    <Image source={require('../Images/ic_location.png')} tintColor={primaryColor} />
                                    <Text style={styles.bookingText}>Nellore</Text>
                                </View>
                                <View style={styles.holdButton}>
                                    <Text style={styles.holdText}>Hold</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{
                            width: '100%',
                            height: 1,
                            backgroundColor: '#CCC',
                        }}></View>
                        <TouchableOpacity style={{
                            height: 33, width: '90%', borderRadius: 10, backgroundColor: primaryColor,
                            alignItems: 'center', justifyContent: 'center', marginTop: 10, alignSelf: 'center'
                        }}>
                            <Text style={{ fontSize: 16, color: '#FFFFFF', fontWeight: 'bold' }}>View Booking</Text>
                        </TouchableOpacity>
                    </View><View style={styles.bookingContainer}>
                            {/* Render Ongoing Bookings here */}
                            <View style={styles.bookingItem}>
                                <Image
                                    style={styles.bookingImage}
                                    source={{ uri: 'https://1.bp.blogspot.com/-bA8VQA0Ytgw/UMd390JmHDI/AAAAAAAAbwI/YNSuLecpty8/s1600/Luxury+homes++interior+decoration+living+room+designs+ideas.+(2).jpg' }} />
                                <View style={{ gap: 12 }}>
                                    <Text style={styles.bookingText}>Martinez Cannes</Text>
                                    <View style={{ flexDirection: 'row', gap: 10 }}>
                                        <Image source={require('../Images/ic_location.png')} tintColor={primaryColor} />
                                        <Text style={styles.bookingText}>Kadapa</Text>
                                    </View>
                                    <View style={styles.holdButton}>
                                        <Text style={styles.holdText}>Hold</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{
                                width: '100%',
                                height: 1,
                                backgroundColor: '#CCC',
                            }}></View>
                            <TouchableOpacity style={{
                                height: 33, width: '90%', borderRadius: 10, backgroundColor: '#814ABF',
                                alignItems: 'center', justifyContent: 'center', marginTop: 10, alignSelf: 'center'
                            }}>
                                <Text style={{ fontSize: 16, color: '#FFFFFF', fontWeight: 'bold' }}>View Booking</Text>
                            </TouchableOpacity>
                        </View></><View style={styles.bookingContainer}>
                            {/* Render Ongoing Bookings here */}
                            <View style={styles.bookingItem}>
                                <Image
                                    style={styles.bookingImage}
                                    source={{ uri: 'https://www.kalmarlighting.com/wp-content/uploads/2021/05/Kalmar-Project-London_Mansion_and_NY_Penthouse_Designed_by_Keech_Green-Living-room-980x735.jpg' }} />
                                <View style={{ gap: 12 }}>
                                    <Text style={styles.bookingText}>pg hostel</Text>
                                    <View style={{ flexDirection: 'row', gap: 10 }}>
                                        <Image source={require('../Images/ic_location.png')} tintColor={primaryColor} />
                                        <Text style={styles.bookingText}>Prakasam</Text>
                                    </View>
                                    <View style={styles.holdButton}>
                                        <Text style={styles.holdText}>Hold</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{
                                width: '100%',
                                height: 1,
                                backgroundColor: '#CCC',
                            }}></View>
                            <TouchableOpacity style={{
                                height: 33, width: '90%', borderRadius: 10, backgroundColor: primaryColor,
                                alignItems: 'center', justifyContent: 'center', marginTop: 10, alignSelf: 'center'
                            }}>
                                <Text style={{ fontSize: 16, color: '#FFFFFF', fontWeight: 'bold' }}>View Booking</Text>
                            </TouchableOpacity>
                        </View></>     
             );
            case 'Completed':
                return (

                    <View style={styles.bookingContainer}>
                        {/* Render Ongoing Bookings here */}
                        <View style={styles.bookingItem}>
                            <Image
                                style={styles.bookingImage}
                                source={{ uri: 'https://media-cdn.tripadvisor.com/media/photo-s/12/fd/6c/ff/suite.jpg' }} />
                            <View style={{ gap: 12 }}>
                                <Text style={styles.bookingText}>Royale President</Text>
                                <View style={{ flexDirection: 'row', gap: 10 }}>
                                    <Image source={require('../Images/ic_location.png')} tintColor={primaryColor} />
                                    <Text style={styles.bookingText}>Hydrabad</Text>
                                </View>
                                <View style={styles.holdButton}>
                                    <Text style={styles.holdText}>Completed</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{
                            width: '100%',
                            height: 1,
                            backgroundColor: '#CCC',

                        }}></View>
                        <TouchableOpacity style={{
                            height: 33, width: '90%', borderRadius: 10, backgroundColor: '#E1F5E9',
                            alignItems: 'center', justifyContent: 'center', marginTop: 20, alignSelf: 'center', marginBottom: 10
                        }}>
                            <Text style={{ fontSize: 16, color: 'green', }}> ✓   Your room booking is completed</Text>
                        </TouchableOpacity>
                    </View>
                   

                );
            case 'Canceled':
                return (
                    <View style={styles.bookingContainer}>
                    {/* Render Ongoing Bookings here */}
                    <View style={styles.bookingItem}>
                        <Image
                            style={styles.bookingImage}
                            source={{ uri: 'https://i.pinimg.com/originals/fc/89/f2/fc89f2954df0cebb66ea1ba9f5842c0d.jpg' }} />
                        <View style={{ gap: 12 }}>
                            <Text style={styles.bookingText}>Neeraj </Text>
                            <View style={{ flexDirection: 'row', gap: 10 }}>
                                <Image source={require('../Images/ic_location.png')} tintColor={primaryColor} />
                                <Text style={styles.bookingText}>Vijayavada</Text>
                            </View>
                            <View style={[styles.holdButton,{backgroundColor:'#FDDDDE'}]}>
                                <Text style={[styles.holdText,{color:'red'}]}>Canceled</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        width: '100%',
                        height: 1,
                        backgroundColor: '#CCC',
                    }}></View>
                    <TouchableOpacity style={{
                        height: 33, width: '90%', borderRadius: 10, backgroundColor: '#FDDDDE',
                        alignItems: 'center', justifyContent: 'center', marginTop: 20, alignSelf: 'center', marginBottom: 10
                    }}>
                        <Text style={{ fontSize: 16, color: 'red', }}>! You are canceled this room</Text>
                    </TouchableOpacity>
                </View>
                                        
                );
            default:
                return null;
        }
    };

    return (
        <ScrollView style={styles.scrollContainer}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                
                    style={[styles.transactionButtons, selectedTab === 'Ongoing' && styles.activeButton]}
                    onPress={() => setSelectedTab('Ongoing')}
                >
                    <Text style={[styles.transactiontext ,selectedTab === 'Ongoing' && {color:'#FFFFFF'}]}>Ongoing</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.transactionButtons, selectedTab === 'Completed' && styles.activeButton]}
                    onPress={() => setSelectedTab('Completed')}
                >
                    <Text style={[styles.transactiontext ,selectedTab === 'Completed' && {color:'#FFFFFF'}]}>Completed</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.transactionButtons, selectedTab === 'Canceled' && styles.activeButton]}
                    onPress={() => setSelectedTab('Canceled')}
                >
                    <Text style={[styles.transactiontext ,selectedTab === 'Canceled' && {color:'#FFFFFF'}]}>Canceled</Text>
                </TouchableOpacity>
            </View>
            {renderBookings()}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        padding: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    transactionButtons: {
        height: 45,
        width: 110,
        borderRadius: 25,
        borderColor: primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth:2
    },
    activeButton: {
        backgroundColor: primaryColor, 
    },
    transactiontext: {
        color: primaryColor,
        fontSize: 18,
        fontWeight: 'bold',
    },
    bookingContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginBottom: 15,
        shadowColor: primaryColor,
        shadowOffset: {
            width: 2,
            height: 10,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
        padding: 15,
        borderWidth: 2,
        borderColor: '#DDD',
    },
    bookingItem: {
        flexDirection: 'row',

        marginBottom: 10,
    },
    bookingImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 30,
    },
    bookingText: {
        fontSize: 18,
    },
    holdButton: {
        height: 30,
        width: 100,
        backgroundColor: '#E1F5E9',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        
        
    },
    CompletedButton: {
        height: 30,
        width: 130,
        backgroundColor: '#E1F5E9',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    holdText: {
        color: 'green',
        fontSize: 14,


    },

});

export default TransactionHistory;
