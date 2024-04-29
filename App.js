import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IntroPage from "./app/screens/Intro";
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ListScreen from "./app/screens/ListScreen";
import PasswordTouched from "./app/components/PasswordTouched";
import PasswordProvider from "./app/context/PasswordProvider";
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 5000)

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState({})
  const [runningFirstTime, setRunningFirstTime] = useState(false)

  const findUser = async () => {
    const result = await AsyncStorage.getItem('user')
    if (result === null) return setRunningFirstTime(true)

    setUser(JSON.parse(result))
    setRunningFirstTime(false)

  }

  useEffect(() => {
    findUser()
  }, [])
  const RenderListScreen = (props) => <ListScreen {...props} user={user} />
  if (runningFirstTime) return <IntroPage onFinish={findUser} />
  return <NavigationContainer>
    <PasswordProvider>
      <Stack.Navigator screenOptions={{ headerTitle: "", headerTransparent: true }}>
        <Stack.Screen component={RenderListScreen} name="ListScreen" options={{ headerShown: false }} />
        <Stack.Screen component={PasswordTouched} name="PasswordTouched" />
      </Stack.Navigator>
    </PasswordProvider>
  </NavigationContainer>


}


