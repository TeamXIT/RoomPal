import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import your screen components
import ListOfRooms from '../Landing/ListOfRooms';
import RoomCreateScreen from '../Landing/RoomCreateScreen';
import ProfileScreen from '../Landing/ProfileScreen';

// Function to create custom tab bar icon
const homeIcon = require('../Images/ic_home.png');
const createIcon = require('../Images/ic_create.png');
const profileIcon = require('../Images/ic_profile.png');

// Create bottom tab navigator
const Tab = createBottomTabNavigator();

const Dashboard = () => (
    <Tab.Navigator
        tabBarOptions={{
            activeTintColor: '#814ABF',
            inactiveTintColor: 'gray',
        }}
    >
        <Tab.Screen
            name="Home"
            component={ListOfRooms}
            options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <Image
                        source={homeIcon}
                        style={{ tintColor: focused ? color : '#ccc', width: 30, height: 30 }}
                    />
                ),
                headerShown: false, 
            tabBarShowLabel: false, 
            }}
        />
        <Tab.Screen
            name="Create"
            component={RoomCreateScreen}
            options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <Image
                        source={createIcon}
                        style={{ tintColor: focused ? color : '#ccc', width: 30, height: 30 }}
                    />
                ),
                headerShown: false, 
               tabBarShowLabel: false, 
            }}
        />
        <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <Image
                        source={profileIcon}
                        style={{ tintColor: focused ? color : '#ccc', width: 30, height: 30 }}
                    />
                ),
                headerShown: false, 
               tabBarShowLabel: false, 
            }}
        />
    </Tab.Navigator>
);

export default Dashboard;
