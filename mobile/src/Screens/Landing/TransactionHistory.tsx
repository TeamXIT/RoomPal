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
                            <Text style={styles.holdText}>{room.availability}members</Text>
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
                    onPress={() => setSelectedTab('FAILED')}
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
        color: primaryColor,
        fontWeight: '600',
        fontSize: 14
    },
    noDataText: {
        textAlign: 'center',
        fontSize: 18,
        color: '#555',
        marginVertical: 20
    },
    bookingContainer: {
        alignSelf: 'center',
        width: '90%',
        backgroundColor: '#FFFFFF',
        marginVertical: 10,
        padding: 15,
        borderRadius: 10
    },
    bookingItem: {
        flexDirection: 'row',
        gap: 20
    },
    bookingImage: {
        width: 80,
        height: 80,
        borderRadius: 20
    },
    bookingText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#262626'
    },
    holdButton: {
        width: 48,
        height: 20,
        backgroundColor: primaryColor,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    holdText: {
        color: '#FFFFFF',
        fontWeight: '500',
        fontSize: 10
    },
    viewBookingButton: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12
    },
    viewBookingText: {
        color: primaryColor,
        fontSize: 14,
        fontWeight: '600'
    }
});

export default TransactionHistory;
