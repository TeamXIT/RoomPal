import React from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { primaryColor } from '../Styles/Styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SelectLocation = () => {
    const route = useRoute();
    const navigation = useNavigation();

    // Extract latitude and longitude from route parameters
    const { latitude, longitude } = route.params || {};

    const handleCapture = () => {
        // Navigate to RoomCreateScreen and pass the latitude and longitude
        navigation.navigate('RoomCreateScreen', { latitude, longitude });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.Mapcard}>
                <Text style={styles.header}>Create New Location</Text>
                {latitude && longitude ? (
                    <>
                        <Text style={styles.label}>Selected Latitude:</Text>
                        <Text style={styles.value}>{latitude}</Text>
                        <Text style={styles.label}>Selected Longitude:</Text>
                        <Text style={styles.value}>{longitude}</Text>
                    </>
                ) : (
                    <Text style={styles.noLocation}>No location selected.</Text>
                )}
                <TouchableOpacity onPress={() => navigation.navigate('MapsScreen')}
                    style={{ height: 40, width: 180, backgroundColor: primaryColor, alignItems: 'center', borderRadius: 10, justifyContent: 'center', marginTop: 20 }}>
                    <Text style={{ color: 'white', fontWeight: 'bold',fontSize:16 }}>Go Back to Map</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCapture}
                    style={{ height: 40, width: 180, backgroundColor: primaryColor, alignItems: 'center', borderRadius: 10, justifyContent: 'center', marginTop:20 }}>
                    <Text style={{ color: 'white', fontWeight: 'bold',fontSize:16  }}>Capture Location</Text>
                </TouchableOpacity>                
            </View>
        </SafeAreaView>
    );
};

export default SelectLocation;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: primaryColor
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: primaryColor
    },
    value: {
        fontSize: 16,
        marginBottom: 10,
    },
    noLocation: {
        fontSize: 16,
        color: 'gray',
    },
    Mapcard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        shadowColor: primaryColor,
        shadowOffset: {
            width: 2,
            height: 10,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
        paddingLeft:50,
        paddingRight:50,
        paddingTop:60,
        paddingBottom:60,
        borderWidth: 1,
        borderColor: '#DDD',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
});
