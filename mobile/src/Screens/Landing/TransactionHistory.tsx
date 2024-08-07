import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import { primaryColor } from "../Styles/Styles";
import { getPaymentsByStatus } from "../../reducers/payment/roomDataSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TransactionHistory = () => {
    const [selectedTab, setSelectedTab] = useState('PENDING');
    const [userId, setUserId] = useState('');
    const dispatch = useDispatch();
    const payments = useSelector((state) => state.app.payments);
    const rooms = useSelector((state) => state.app.rooms);

    useEffect(() => {
        AsyncStorage.getItem('userId').then((value) => {
            setUserId(value);
        });
    }, []);

    useEffect(() => {
        if (userId) {
            dispatch(getPaymentsByStatus(selectedTab, userId));
        }
    }, [selectedTab, dispatch, userId]);

    const renderBookings = () => {
        if (!Array.isArray(rooms) || rooms.length === 0) {
            return <Text style={styles.noDataText}>No bookings available.</Text>;
        }

        return rooms.map((room, index) => (
            <View key={index} style={styles.bookingContainer}>
                <View style={styles.bookingItem}>
                    <Image style={styles.bookingImage} source={{ uri: `data:image/png;base64,${room.images[0]}` }} />
                    <View style={{ gap: 12 }}>
                        <Text style={styles.bookingText}>{room.roomName}</Text>
                        <Text style={styles.bookingText}>{room.details}</Text>
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                            <Image source={require('../Images/ic_location.png')} tintColor={primaryColor} />
                            <Text style={styles.bookingText}>{room.location.lat}, {room.location.lon}</Text>
                        </View>
                        <View style={styles.holdButton}>
                            <Text style={styles.holdText}>{room.availability} members</Text>
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
                    <Text style={[styles.transactionText, selectedTab === 'Ongoing' && { color: '#FFFFFF' }]}>Ongoing</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.transactionButtons, selectedTab === 'Completed' && styles.activeButton]}
                    onPress={() => setSelectedTab('SUCCESS')}
                >
                    <Text style={[styles.transactionText, selectedTab === 'Completed' && { color: '#FFFFFF' }]}>Completed</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.transactionButtons, selectedTab === 'Canceled' && styles.activeButton]}
                    onPress={() => setSelectedTab('USER_DROPPED')}
                >
                    <Text style={[styles.transactionText, selectedTab === 'Canceled' && { color: '#FFFFFF' }]}>Canceled</Text>
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
        borderWidth: 2,
    },
    activeButton: {
        backgroundColor: primaryColor,
    },
    transactionText: {
        color: primaryColor,
        fontSize: 18,
        fontWeight: 'bold',
    },
    noDataText: {
        textAlign: 'center',
        fontSize: 18,
        color: '#555',
        marginVertical: 20,
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
        color:"#000",
    },
    holdButton: {
        height: 30,
        width: 100,
        backgroundColor: '#E1F5E9',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    holdText: {
        color: 'green',
        fontSize: 14,
    },
    viewBookingButton: {
        height: 33,
        width: '90%',
        borderRadius: 10,
        backgroundColor: primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        alignSelf: 'center',
    },
    viewBookingText: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});

export default TransactionHistory;
