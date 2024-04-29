import { StyleSheet, Text, View, Dimensions, Alert, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../misc/colors'
import RoundIconButton from './RoundIconButton'
import * as Clipboard from 'expo-clipboard'

const Password = ({ item, onPress }) => {
    const { website, username, password } = item
    const hiddenPassword = '*'.repeat(password.length)
    const copyPasswordToClipboard = async () => {
        await Clipboard.setStringAsync(password)
        // Optionally, provide feedback to the user that the password has been copied
        Alert.alert(
            'Yay!',
            'Your password has been copied')

    }
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <Text numberOfLines={1} style={styles.website}>Website: {website}</Text>
                <Text numberOfLines={1}>Username: {username}</Text>
                <Text numberOfLines={1}>Password: {hiddenPassword}</Text>
                <RoundIconButton size={15}
                    antIconName="copy1"
                    color="black"
                    style={{ backgroundColor: "white", marginTop: 5 }}
                    onPress={copyPasswordToClipboard}
                />
            </View>
        </TouchableOpacity>
    )
}
const width = Dimensions.get('window').width - 50
export default Password

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.PRIMARY,
        width: width,
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        alignItems: "center",
        justifyContent: "center"

    },
    website: {
        fontWeight: "bold",
        fontSize: 22
    }
})