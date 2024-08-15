import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import { primaryColor,styles } from "../Styles/Styles";
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
            <View key={index} style={styles.transactionbookingContainer}>
                <View style={styles.transactionbookingItem}>
                    <Image style={styles.transactionbookingImage} source={{ uri: `data:image/png;base64,${room.images[0]}` }} />
                    <View style={{ gap: 12 }}>
                        <Text style={styles.transactionbookingText}>{room.roomName}</Text>
                        <Text style={styles.transactionbookingText}>{room.details}</Text>
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                            <Image source={require('../Images/ic_location.png')} tintColor={primaryColor} />
                            <Text style={styles.transactionbookingText}>{room.location.lat}, {room.location.lon}</Text>
                        </View>
                        <View style={styles.transactionholdButton}>
                            <Text style={styles.transactionholdText}>{room.availability} members</Text>
                        </View>
                    </View>
                </View>
                <View style={{ width: '100%', height: 1, backgroundColor: '#CCC' }}></View>
                <TouchableOpacity style={styles.transactionviewBookingButton}>
                    <Text style={styles.transactionviewBookingText}>View Booking</Text>
                </TouchableOpacity>
            </View>
        ));
    };

    return (
        <ScrollView style={styles.transactionscrollContainer}>
            <View style={styles.transactionbuttonContainer}>
                <TouchableOpacity
                    style={[styles.transactionButtons, selectedTab === 'Ongoing' && styles.transactionactiveButton]}
                    onPress={() => setSelectedTab('PENDING')}
                >
                    <Text style={[styles.transactionText, selectedTab === 'Ongoing' && { color: '#FFFFFF' }]}>Ongoing</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.transactionButtons, selectedTab === 'Completed' && styles.transactionactiveButton]}
                    onPress={() => setSelectedTab('SUCCESS')}
                >
                    <Text style={[styles.transactionText, selectedTab === 'Completed' && { color: '#FFFFFF' }]}>Completed</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.transactionButtons, selectedTab === 'Canceled' && styles.transactionactiveButton]}
                    onPress={() => setSelectedTab('USER_DROPPED')}
                >
                    <Text style={[styles.transactionText, selectedTab === 'Canceled' && { color: '#FFFFFF' }]}>Canceled</Text>
                </TouchableOpacity>
            </View>
            {renderBookings()}
        </ScrollView>
    );
};


export default TransactionHistory;
