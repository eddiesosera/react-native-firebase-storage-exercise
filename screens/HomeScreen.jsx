import { Pressable, ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { getAllIMemories } from '../services/Database';

const HomeScreen = ({ navigation }) => {
    const [memories, setMemories] = useState([]);

    const handleGettingOfData = async () => {
        var allData = await getAllIMemories("memories");
        setMemories(allData);
        console.log("All Memories: " + allData);
    };

    useFocusEffect(useCallback(() => {
        handleGettingOfData()
        return () => {

        }
    }, []))

    return (
        <View style={styles.container}>
            <Pressable onPress={() => navigation.navigate("Add")} style={styles.button}>
                <Text style={styles.buttonText}>Add Memory</Text>
            </Pressable>

            {/* Card of your images that you need to loop through */}
            <ScrollView style={{ paddingBottom: 80, marginBottom: 40 }}>
                {
                    memories.map((memory, i) => {
                        return (
                            <View style={styles.card} key={i}>
                                <Image
                                    style={styles.img}
                                    source={{
                                        uri: memory.link,
                                    }} />

                                <Text style={styles.cardText}>{memory.name}</Text>
                            </View>
                        )
                    })
                }
            </ScrollView>

        </View>

    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    card: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 20
    },
    img: {
        width: '100%',
        height: 250,
        objectFit: 'cover'
    },
    cardText: {
        marginTop: 10,
    },
    button: {
        padding: 10,
        backgroundColor: 'green',
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white'
    }
})