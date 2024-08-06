import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import { primaryColor } from "../Styles/Styles";
import { getPaymentsByStatus } from "../../reducers/payment/roomDataSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TransactionHistory = () => {
    const [selectedTab, setSelectedTab] = useState('Ongoing');
    const [userId, setUserId] = useState('');
    const dispatch = useDispatch();
    const payments = useSelector((state) => state.app.payments);
    const roomData = useSelector((state) => state.app.room);
    AsyncStorage.getItem('userId').then((value) => {
        console.log('User ID:', value);
        setUserId(value);
    })
    useEffect(() => {
        console.log(selectedTab)
        dispatch(getPaymentsByStatus(selectedTab,userId));
    }, [selectedTab, dispatch]);

    useEffect(() => {
        // console.log('Payments:', payments);
        // console.log('Room Data:', roomData);
    }, [payments, roomData]);

    const renderBookings = () => {
        // console.log(roomData);
        if (!Array.isArray(roomData) || roomData.length === 0) {
            return <Text style={styles.noDataText}>No bookings available.</Text>;
        }
        
        return roomData.map((room, index) => (
            <View key={index} style={styles.bookingContainer}>
                <View style={styles.bookingItem}>
                    <Image style={styles.bookingImage} source={{ uri: roomData.images[0] }} />
                    <View style={{ gap: 12 }}>
                        <Text style={styles.bookingText}>{roomData.roomName}</Text>
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                            <Image source={require('../Images/ic_location.png')} tintColor={primaryColor} />
                            <Text style={styles.bookingText}>{roomData.location.lat}, {roomData.location.lon}</Text>
                        </View>
                        <View style={styles.holdButton}>
                            <Text style={styles.holdText}>{room.availability}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ width: '100%', height: 1, backgroundColor: '#CCC' }}></View>
                <TouchableOpacity style={styles.viewBookingButton}>
                    <Text style={styles.viewBookingText}>View Booking</Text>
                </TouchableOpacity>
            </View>
        ));
    };

    return (
        <ScrollView style={styles.scrollContainer}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.transactionButtons, selectedTab === 'Ongoing' && styles.activeButton]}
                    onPress={() => setSelectedTab('PENDING')}
                >
                    <Text style={[styles.transactiontext, selectedTab === 'Ongoing' && { color: '#FFFFFF' }]}>Ongoing</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.transactionButtons, selectedTab === 'Completed' && styles.activeButton]}
                    onPress={() => setSelectedTab('SUCCESS')}
                >
                    <Text style={[styles.transactiontext, selectedTab === 'Completed' && { color: '#FFFFFF' }]}>Completed</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.transactionButtons, selectedTab === 'Rejected' && styles.activeButton]}
                    onPress={() => setSelectedTab('FAILURE')}
                >
                    <Text style={[styles.transactiontext, selectedTab === 'Rejected' && { color: '#FFFFFF' }]}>Rejected</Text>
                </TouchableOpacity>
            </View>
            {renderBookings()}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: '#F3F3F3'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        width: '90%',
        height: 46,
        alignSelf: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginTop: 10
    },
    transactionButtons: {
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    activeButton: {
        backgroundColor: primaryColor,
        borderRadius: 10
    },
    transactiontext: {
        fontSize: 14,
        color: primaryColor
    },
    bookingContainer: {
        width: '100%',
        padding: 12,
        alignSelf: 'center',
        backgroundColor: '#FFFFFF',
        marginTop: 10
    },
    bookingItem: {
        flexDirection: 'row',
        gap: 20,
    },
    bookingImage: {
        width: 120,
        height: 90,
        borderRadius: 10
    },
    bookingText: {
        fontSize: 14,
        color: '#000000'
    },
    holdButton: {
        width: 60,
        height: 23,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: primaryColor,
        borderRadius: 8
    },
    holdText: {
        fontSize: 12,
        color: '#FFFFFF'
    },
    viewBookingButton: {
        height: 33, 
        width: '90%', 
        borderRadius: 10, 
        backgroundColor: primaryColor,
        alignItems: 'center', 
        justifyContent: 'center', 
        marginTop: 10, 
        alignSelf: 'center'
    },
    viewBookingText: {
        fontSize: 16, 
        color: '#FFFFFF', 
        fontWeight: 'bold'
    },
    noDataText: {
        fontSize: 16,
        color: '#000',
        textAlign: 'center',
        marginTop: 20
    }
});

export default TransactionHistory;
