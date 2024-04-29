import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
const PasswordContext = createContext()
const PasswordProvider = ({ children }) => {
    const [details, setDetails] = useState([])
    const findDetails = async () => {
        const result = await AsyncStorage.getItem('allDetails')
        //console.log(result)
        if (result !== null) setDetails(JSON.parse(result))
    }
    useEffect(() => {
        findDetails()
    }, [])
    return (
        <PasswordContext.Provider value={{ details, setDetails, findDetails }}>
            {children}
        </PasswordContext.Provider>
    )
}

export default PasswordProvider

export const useDetails = () => useContext(PasswordContext)

const styles = StyleSheet.create({})