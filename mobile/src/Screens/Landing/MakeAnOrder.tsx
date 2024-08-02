import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CFPaymentGatewayService } from 'react-native-cashfree-pg-sdk';
import {
    CFDropCheckoutPayment,
    CFEnvironment,
    CFPaymentComponentBuilder,
    CFPaymentModes,
    CFSession,
    CFThemeBuilder,
} from 'cashfree-pg-api-contract';
import  {X_CLIENT_ID, X_CLIENT_SECRET} from '../../reducers/config/cashfree'
import RoomCard from '../molecule/roomCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function MakeAnOrder({route}) {
    const mobileNumber=AsyncStorage.getItem("MobileNumber");
console.log(mobileNumber)
    const room=route.params.room;
    const [order, setOrder] = useState({
        payment_session_id: '123456780',
        order_id: 'Order_id_002',
        order_expiry_time: ' ',
    });
    const [orderStatus, setOrderStatus] = useState();
    const createOrder = () => {
        console.log("createOrder Started");
        return new Promise((resolve, reject) => {
            fetch('https://sandbox.cashfree.com/pg/orders', {
                headers: {
                    'X-Client-Secret': X_CLIENT_SECRET,
                    'X-Client-Id': X_CLIENT_ID,
                    'Content-Type': 'application/json',
                    'x-api-version': '2023-08-01',
                },
                method: 'POST',
                body: JSON.stringify({
                    order_amount: room.rent,
                    order_currency: 'INR',
                    customer_details: {
                        customer_id: 'USER123',
                        customer_name: 'joe',
                        customer_email: 'joe.s@cashfree.com',
                        customer_phone:'+919705074430',
                    },
                    order_meta: {
                        return_url: 'https://b8af79f41056.eu.ngrok.io?order_id=order_123',
                    },
                }),
            })
                .then(response => response.json())
                .then(result => {
                    setOrder(result);
                    resolve(result);
                })
                .catch(err => reject(err));
        });
    };
    useEffect(() => {
        const onReceivedEvent = (eventName: string, map: any) => {
            console.log(
                'Event recieved on screen: ' +
                eventName +
                ' map: ' +
                JSON.stringify(map),
            );
        };
        const onVerify = (orderId: string) => {
            console.log('orderId is :' + orderId);
            updateStatus(orderId);
        };
        const onError = (error: any, orderId: string) => {
            console.log(
                'exception is : ' + JSON.stringify(error) + '\norderId is :' + orderId,
            );
            updateStatus(JSON.stringify(error));
        };
        CFPaymentGatewayService.setEventSubscriber({ onReceivedEvent });
        CFPaymentGatewayService.setCallback({ onVerify, onError });
        return () => {
            console.log('UNMOUNTED');
            CFPaymentGatewayService.removeCallback();
            CFPaymentGatewayService.removeEventSubscriber();
        };
    }, []);
    const updateStatus = (message: any) => {
        setOrderStatus(message);
    };
    const _startCheckout = async () => {
        try {
            console.log("_startCheckout start");
            const session =  getSession();
            console.log("Session: ", JSON.stringify(session));
            const paymentModes = new CFPaymentComponentBuilder()
                .add(CFPaymentModes.CARD)
                .add(CFPaymentModes.UPI)
                .add(CFPaymentModes.NB)
                .add(CFPaymentModes.WALLET)
                .add(CFPaymentModes.PAY_LATER)
                .build();
            console.log("paymentModes: ", JSON.stringify(paymentModes));
            const theme = new CFThemeBuilder()
                .setNavigationBarBackgroundColor('#814ABF')
                .setNavigationBarTextColor('#FFFFFF')
                .setButtonBackgroundColor('#FFC107')
                .setButtonTextColor('#FFFFFF')
                .setPrimaryTextColor('#212121')
                .setSecondaryTextColor('#757575')
                .build();
            console.log("theme: ", JSON.stringify(theme));
            const dropPayment = new CFDropCheckoutPayment(
                session,
                paymentModes,
                theme,
            );
            console.log("dropPayment: ", JSON.stringify(dropPayment));
            CFPaymentGatewayService.doPayment(dropPayment);
        } catch (e) {
            console.log("Exception in _startCheckout: ", e);
        }
    };
    // Implement other methods similarly
    const getSession = () => {
        console.log("getSession: ", order);
        if (!order.payment_session_id || !order.order_id) {
            throw new Error('Invalid order details');
        }
        return new CFSession(
            order.payment_session_id, // sessionId
            order.order_id, // orderId
            CFEnvironment.SANDBOX,
        );
    };

    useEffect(() => {
        createOrder();
    }, []);
    return (
        <View style={styles.container}>
              <RoomCard  room={room} />
            <TouchableOpacity style={styles.btn} onPress={_startCheckout}>
                <Text style={{ color: 'white',fontSize:20,fontWeight:'bold' }}>Pay now</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
    },
    card: {
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        width: '90%',
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
    },
    btn: {
        marginTop: 20,
        backgroundColor: '#814ABF',
        width: '50%',
        height: 50,
        padding: 10,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    
    },
});