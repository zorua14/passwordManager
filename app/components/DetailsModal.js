import { Keyboard, Modal, StatusBar, StyleSheet, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../misc/colors'
import RoundIconButton from './RoundIconButton'

const DetailsModal = ({ visible, onClose, onSubmit, details, isEdit }) => {
    const [website, SetWebsite] = useState('')
    const [username, SetUsername] = useState('')
    const [password, SetPassword] = useState('')

    useEffect(() => {
        if (isEdit) {
            SetWebsite(details.website)
            SetUsername(details.username)
            SetPassword(details.password)
        }
    }, [isEdit])
    const handleOnChangeText = (text, valueFor) => {

        if (valueFor === 'website') SetWebsite(text)
        if (valueFor === 'username') SetUsername(text)
        if (valueFor === 'password') SetPassword(text)
    }

    const handleKeyboardClose = () => {
        Keyboard.dismiss()
    }
    const handleSubmit = () => {
        if (!website.trim() && !username.trim() && !password.trim()) {
            return onClose()
        }
        if (isEdit) {
            onSubmit(website, username, password, Date.now())

        } else {
            onSubmit(website, username, password)
            SetWebsite('')
            SetUsername('')
            SetPassword('')

        }
        onClose()
    }
    const cancelEntry = () => {
        if (!isEdit) {
            SetWebsite('')
            SetUsername('')
            SetPassword('')
        }
        onClose()
    }
    return <>
        <StatusBar hidden />
        <Modal visible={visible} animationType='slide'>
            <View style={styles.inputContainer}>
                <TextInput value={website} onChangeText={(text) => handleOnChangeText(text, 'website')} multiline placeholder='Website' style={[styles.input, { height: 60 }]} />
                <TextInput value={username} onChangeText={(text) => handleOnChangeText(text, 'username')} placeholder='Username' style={styles.input} />
                <TextInput value={password} onChangeText={(text) => handleOnChangeText(text, 'password')} placeholder='Password' style={styles.input} />
                <View style={styles.submitButtonContainer}>
                    <RoundIconButton size={20} antIconName='check' onPress={handleSubmit} />
                    <RoundIconButton size={20} style={{ marginLeft: 15 }} antIconName='close' onPress={cancelEntry} />
                </View>
            </View>
            <TouchableWithoutFeedback onPress={handleKeyboardClose}>
                <View style={[styles.modalBackground, StyleSheet.absoluteFillObject]}>

                </View>
            </TouchableWithoutFeedback>

        </Modal>
    </>
}

export default DetailsModal

const styles = StyleSheet.create({
    input: {
        borderBottomWidth: 2,
        borderBottomColor: colors.PRIMARY,
        fontSize: 20,
        color: colors.DARK,
        height: 40,
        marginVertical: 10,


    },
    inputContainer: {
        paddingHorizontal: 20,

    },
    modalBackground: {
        flex: 1,
        zIndex: -1
    },
    submitButtonContainer: {
        flexDirection: "row",

        justifyContent: "center",
        paddingHorizontal: 15,
        paddingVertical: 10
    }
})