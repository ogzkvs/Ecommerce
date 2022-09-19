import React, {useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/Home';
import Register from './screens/Register';
import {useSelector, useDispatch, Provider} from 'react-redux';
import store from './store';
import cache from './cache';
import LoginScreen from './screens/LoginScreen';
import ProductsDetail from './screens/ProductsDetail';
import MyCart from './screens/MyCart';
import Profil from './screens/Profil';
import AsyncStorageStatic from '@react-native-async-storage/async-storage';
import {signin, userinfo} from './stores/auth';

const Stack = createNativeStackNavigator();

const Wrapper = () => {
  const {status, token} = useSelector(state => state.auth);
  cache.token = token;
  const dispatch = useDispatch();

  useEffect(() => {
    getData();
  });

  const getData = async () => {
    try {
      const token = await AsyncStorageStatic.getItem('token');

      if (token && token !== 'undefined' && token !== '') {
        const user = JSON.parse(await AsyncStorageStatic.getItem('name'));
        const email = JSON.parse(await AsyncStorageStatic.getItem('email'));

        if (user && email && token) {
          dispatch(
            userinfo({token: 'Bearer ' + token, name: user, email: email}),
          );
          dispatch(signin({token: 'Bearer ' + token}));
        }
      }
    } catch {
      console.log(error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {status ? (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ProductsDetail"
              component={ProductsDetail}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="MyCart"
              component={MyCart}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Profil"
              component={Profil}
              options={{headerTitleAlign: 'center', title: 'Profil'}}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Register"
              component={Register}
              options={{headerTitleAlign: 'center', title: 'Kayıt Ol'}}
            />
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{headerTitleAlign: 'center', title: 'Giriş Yap'}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <Wrapper />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
