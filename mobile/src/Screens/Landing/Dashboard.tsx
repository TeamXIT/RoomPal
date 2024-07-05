import React, { useState } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: isTabBarVisible ? styles.tabBar : { display: 'none' },
                headerShown: false,
            }}
        >
            <Tab.Screen
                name="Home"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.iconContainer}>
                            <Image
                                source={homeIcon}
                                style={[styles.icon, focused && styles.iconFocused]}
                            />
                        </View>
                    ),
                }}
            >
                {props => <ListOfRooms {...props} setTabBarVisibility={handleTabBarVisibility} />}
            </Tab.Screen>
            <Tab.Screen
                name="Create"
                // component={RoomCreateScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.createIconContainer}>
                            <Image
                                source={createIcon}
                                style={[styles.createIcon, focused && styles.createIconFocused]}
                            />
                        </View>
                    ),
                }}
                >
                {props => <RoomCreateScreen {...props} setTabBarVisibility={handleTabBarVisibility} />}
            
                </Tab.Screen>
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.iconContainer}>
                            <Image
                                source={profileIcon}
                                style={[styles.icon, focused && styles.iconFocused]}
                            />
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        position: 'absolute',
        bottom: 5,
        left: 20,
        right: 20,
        elevation: 0,
        backgroundColor: '#814ABF',
        borderRadius: 15,
        height: 60,
        borderTopWidth: 0,
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: 30,
        height: 30,
        tintColor: '#ccc',
    },
    iconFocused: {
        tintColor: 'white',
    },
    createIconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1E1E1E',
        width: 70,
        height: 70,
        borderRadius: 35,
        borderColor: 'white',
        borderWidth: 3,
        top: -5,
    },
    createIcon: {
        width: 40,
        height: 40,
        tintColor: '#ccc',
    },
    createIconFocused: {
        tintColor: 'white',
    },
});

export default Dashboard;
