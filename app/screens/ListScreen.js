import { FlatList, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import colors from '../misc/colors'
import RoundIconButton from '../components/RoundIconButton'
import DetailsModal from '../components/DetailsModal'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Password from '../components/Password'
import { useDetails } from '../context/PasswordProvider'
import { SafeAreaView } from 'react-native-safe-area-context'




const ListScreen = ({ user, navigation }) => {
    const [modalVisible, SetModalVisible] = useState(false)
    const { details, setDetails, findDetails } = useDetails()


    const saveDetails = async (website, username, password) => {
        const detail = { id: Date.now(), website: website, username: username, password: password }
        const updatedDetails = [...details, detail]
        setDetails(updatedDetails)
        await AsyncStorage.setItem('allDetails', JSON.stringify(updatedDetails))

    }
    const openPassword = (item) => {
        navigation.navigate('PasswordTouched', { item })

    }
    return (
        <>
            {/* <StatusBar style="auto" /> */}
            <SafeAreaView style={{ flex: 1 }}>

                <View style={styles.container}>
                    <Text style={styles.headerText}>{`Hello, ${user.name}`}</Text>
                    <FlatList
                        data={details}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => <Password item={item} onPress={() => openPassword(item)} />}
                    />
                    {!details.length ?
                        <View style={[StyleSheet.absoluteFillObject, styles.emptyContentContainer]}>
                            <Text style={styles.emptyContentText}>Add Passwords</Text>

                        </View> : null}
                </View>
            </SafeAreaView>

            <RoundIconButton onPress={() => {
                SetModalVisible(true)
            }} antIconName='plus' style={styles.addButton} />
            <DetailsModal visible={modalVisible} onClose={() => SetModalVisible(false)} onSubmit={saveDetails} />

        </>
    )
}

export default ListScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,

    },
    headerText: {
        fontSize: 25,
        fontWeight: "bold",
        paddingVertical: 20
    },
    emptyContentContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        zIndex: -1

    },
    emptyContentText: {
        fontSize: 30,
        textTransform: "uppercase",
        fontWeight: "bold",
        opacity: 0.5
    },
    addButton: {
        position: "absolute",
        right: 15,
        bottom: 30
    }

})