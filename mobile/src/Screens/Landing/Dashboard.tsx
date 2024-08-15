import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet, Keyboard } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {styles} from '../Styles/Styles'

// Import your screen components
import ListOfRooms from '../Landing/ListOfRooms';
import RoomCreateScreen from '../Landing/RoomCreateScreen';
import ProfileScreen from '../Landing/ProfileScreen';

// Import your icon images
const homeIcon = require('../Images/ic_home.png');
const createIcon = require('../Images/ic_create.png');
const profileIcon = require('../Images/ic_profile.png');

// Create bottom tab navigator
const Tab = createBottomTabNavigator();

const Dashboard = () => {
    const [isTabBarVisible, setIsTabBarVisible] = useState(true);

    const handleTabBarVisibility = (visible) => {
        setIsTabBarVisible(visible);
    };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => handleTabBarVisibility(false)
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => handleTabBarVisibility(true)
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: isTabBarVisible ? styles.dashbordtabBar : { display: 'none' },
                headerShown: false,
            }}
        >
            <Tab.Screen
                name="Home"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.dashbordiconContainer}>
                            <Image
                                source={homeIcon}
                                style={[styles.dashbordicon, focused && styles.dashbordiconFocused]}
                            />
                        </View>
                    ),
                }}
            >
                {props => <ListOfRooms {...props} setTabBarVisibility={handleTabBarVisibility} />}
            </Tab.Screen>
            <Tab.Screen
                name="Create"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.dashbordcreateIconContainer}>
                            <Image
                                source={createIcon}
                                style={[styles.dashbordcreateIcon, focused && styles.dashbordcreateIconFocused]}
                            />
                        </View>
                    ),
                }}
            >
                {props => <RoomCreateScreen {...props} setTabBarVisibility={handleTabBarVisibility} />}
            </Tab.Screen>
            <Tab.Screen
                name="Profile"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.dashbordiconContainer}>
                            <Image
                                source={profileIcon}
                                style={[styles.dashbordicon, focused && styles.dashbordiconFocused]}
                            />
                        </View>
                    ),
                }}
            >
                {props => <ProfileScreen {...props} setTabBarVisibility={handleTabBarVisibility} />}
            </Tab.Screen>
        </Tab.Navigator>
    );
};


export default Dashboard;
