import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { handleUploadImage } from '../services/BucketService';

const AddScreen = ({ navigation }) => {

    const [title, setTitle] = useState('')

    // here you will add the permission stuff from the expo image picker 

    const [image, setImage] = useState(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    // this is calling out service 
    const uploadImage = async () => {
        await handleUploadImage(image, title) // choose the image and then write the title 
        navigation.navigate("Home")
    }

    useEffect(() => {

    }, [image])

    return (

        <View style={styles.container}>

            <TextInput
                style={styles.inputField}
                placeholder="Memory Title"
                onChangeText={newText => setTitle(newText)}
                defaultValue={title}
            />

            {/* TODO: Upload Image */}

            <TouchableOpacity style={styles.button} onPress={uploadImage}>
                <Text style={styles.buttonText}>Add Memory</Text>
            </TouchableOpacity>

            <Button title="Pick an image from camera roll" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={styles.image} />}

        </View>
    )
}

export default AddScreen

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    image: {
        width: 200,
        height: 200,
    },
    inputField: {
        borderWidth: 2,
        borderColor: 'black',
        marginTop: 15,
        padding: 10
    },
    button: {
        backgroundColor: "green",
        textAlign: 'center',
        padding: 15,
        marginTop: 30
    },
    buttonText: {
        textAlign: 'center',
        color: 'white'
    },
})