import React from "react"
import { Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home'
import Login from './screens/Login'
import Register from "./screens/Register";
import { useSelector, useDispatch, Provider } from 'react-redux'
import store from "./store";
import cache from "./cache";
import LoginScreen from "./screens/LoginScreen";

const Stack = createNativeStackNavigator();

const Wrapper = () => {
  const { status, token } = useSelector((state) => state.auth)
  cache.token = token
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {
          status ? (
            <>
              <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            </>
          ) :
            <>
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
            </>
        }
      </Stack.Navigator >
    </NavigationContainer >

  )
}

const App = () => {
  return (
    <Provider store={store}><Wrapper /></Provider>
  )

}

export default App