import { StyleSheet, Text, TextInput, View, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import colors from '../misc/colors'
import RoundIconButton from '../components/RoundIconButton'
import AsyncStorage from '@react-native-async-storage/async-storage';

const IntroPage = ({ onFinish }) => {
    const [name, setName] = useState('')
    const handleOnChangeText = (text) => {
        setName(text)
    }
    const createUser = async () => {
        const user = { name: name }
        await AsyncStorage.setItem('user', JSON.stringify(user))
        if (onFinish) onFinish()
    }
    return (
        <>
            <StatusBar hidden />
            <View style={styles.container}>
                <Text style={styles.titleText}>Enter your name to Continue</Text>
                <TextInput value={name} onChangeText={handleOnChangeText} placeholder="Enter Name" style={styles.textInput} />
                {name.trim().length >= 3 ? <RoundIconButton antIconName="arrowright" onPress={createUser} /> : null}
            </View>
        </>
    )
}

export default IntroPage
const width = Dimensions.get('window').width - 50
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    textInput: {
        borderWidth: 2,
        borderColor: colors.PRIMARY,
        color: colors.PRIMARY,
        width: width,
        height: 50,
        borderRadius: 10,
        paddingLeft: 15,
        fontSize: 25,
        margin: 10
    },
    titleText: {
        alignSelf: "flex-start",
        paddingLeft: 25,
        opacity: 0.5,
        fontSize: 18

    }

})