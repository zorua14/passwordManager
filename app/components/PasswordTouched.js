import { StyleSheet, Text, View, Alert } from 'react-native'
import React, { useState } from 'react'
import { useHeaderHeight } from '@react-navigation/elements'
import colors from '../misc/colors'
import RoundIconButton from './RoundIconButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDetails } from '../context/PasswordProvider'
import DetailsModal from './DetailsModal'

const formatDate = ms => {
    const date = new Date(ms);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hrs = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();

    return `${day}/${month}/${year} - ${hrs}:${min}:${sec}`;
}
const PasswordTouched = (props) => {
    //const { item } = props.route.params
    const [item, setItem] = useState(props.route.params.item)
    const headerHeight = useHeaderHeight()
    const { setDetails } = useDetails()
    const [showModal, setModalVisible] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const deletePassword = async () => {

        const result = await AsyncStorage.getItem('allDetails')
        let allPasswords = []
        if (result !== null) allPasswords = JSON.parse(result)

        const newAllPasswords = allPasswords.filter(n => n.id !== item.id)
        setDetails(newAllPasswords)
        await AsyncStorage.setItem('allDetails', JSON.stringify(newAllPasswords))
        props.navigation.goBack()
    }
    const displayDeleteAlert = () => {
        Alert.alert(
            'Are You Sure!',
            'This action will delete your note permanently!',
            [
                {
                    text: 'Delete',
                    onPress: deletePassword,
                },
                {
                    text: 'No Thanks',
                    onPress: () => console.log('no thanks'),
                },
            ],
            {
                cancelable: true,
            }
        );
    }
    const handleUpdate = async (website, username, password, id) => {
        const result = await AsyncStorage.getItem('allDetails')
        let details = []
        if (result !== null) details = JSON.parse(result)

        const newDetails = details.filter(n => {
            if (n.id === item.id) {
                n.website = website
                n.username = username
                n.password = password
                n.id = id
                n.isUpdated = true
                setItem(n)
            }
            return n
        })
        setDetails(newDetails)
        await AsyncStorage.setItem('allDetails', JSON.stringify(newDetails))

    }
    const handleOnClose = () => {
        setModalVisible(false)
    }


    return (
        <>
            <View style={[styles.container, { marginVertical: headerHeight }]}>
                <Text style={styles.time}>{item.isUpdated
                    ? `Updated At ${formatDate(item.id)}`
                    : `Created At ${formatDate(item.id)}`}</Text>
                <Text style={styles.website}>Website: {item.website}</Text>
                <Text style={styles.usualText}>Username: {item.username}</Text>
                <Text style={styles.usualText}>Password: {item.password}</Text>
                <View style={styles.buttonContainer}>
                    <RoundIconButton antIconName="delete" style={{ backgroundColor: "red" }} onPress={displayDeleteAlert} />
                    <RoundIconButton antIconName="edit" style={{ marginLeft: 15 }} color="black" onPress={() => { setModalVisible(true); setIsEdit(true) }} />
                </View>
            </View>
            <DetailsModal isEdit={isEdit} details={item} onClose={handleOnClose} onSubmit={handleUpdate} visible={showModal} />
        </>
    )
}

export default PasswordTouched

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15

    },
    website: {
        fontSize: 30,
        color: colors.PRIMARY,
        fontWeight: "bold"
    },
    usualText: {
        fontSize: 22,
        color: colors.DARK,
        opacity: 0.5
    },
    time: {
        textAlign: "right",
        fontSize: 12,
        opacity: 0.5
    },
    buttonContainer: {
        flexDirection: "row",
        margin: 15,
        justifyContent: "center"

    }
})