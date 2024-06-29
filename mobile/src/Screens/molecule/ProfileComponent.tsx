import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Alert,Text } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker'; // Import image picker library

const ProfileComponent = ({ setImageUri }) => {
    const handleSelectGallery = () => {
        Alert.alert('Select your option', 'Select one of the option to set your profile picture.', [
            {
                text: 'Open Camera',
                onPress: () => {
                    ImagePicker.openCamera({
                        width: 300,
                        height: 400,
                        cropping: true,
                    }).then(image => {
                        setImageUri(image.path); // Pass URI back to parent component
                    });
                },
            },
            {
                text: 'Select Picture',
                onPress: () => {
                    ImagePicker.openPicker({
                        width: 300,
                        height: 400,
                        cropping: true,
                    }).then(image => {
                        setImageUri(image.path); // Pass URI back to parent component
                    });
                },
            },
        ]);
    };

    return (
       
        <TouchableOpacity onPress={handleSelectGallery} style={styles.smallbtn}>
            {/* <Image style={{ height: 35, width: 35 }} source={require('../Images/ic_imageUpload.png')} tintColor={'white'} /> */}
            <Text style={{color:'#FFFFFF',fontSize:16}}>Browse Image</Text>
        </TouchableOpacity>
        
    );
};

const styles = StyleSheet.create({
    smallbtn: {
        height: 40,
        width: 200,
        backgroundColor: '#814ABF',
        borderRadius: 5,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
});

export default ProfileComponent;
