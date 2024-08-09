import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

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
        <View style={styles.container}>
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
            <Button
                title="Go Back to Map"
                onPress={() => navigation.navigate('MapsScreen')}
            />
            <Button
                title="Capture Location"
                onPress={handleCapture}
            />
        </View>
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
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
    },
    value: {
        fontSize: 16,
        marginBottom: 10,
    },
    noLocation: {
        fontSize: 16,
        color: 'gray',
    },
});
