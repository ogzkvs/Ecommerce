import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {signin, userinfo} from '../stores/auth';
import {postLogin} from '../service';
import AsyncStorageStatic from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {
  const loginPost = React.useRef({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  useEffect(() => {}, []);

  const setToken = async (token, name, email) => {
    try {
      await AsyncStorageStatic.setItem('token', token);
      await AsyncStorageStatic.setItem('name', JSON.stringify(name));
      await AsyncStorageStatic.setItem('email', JSON.stringify(email));
    } catch (error) {
      console.log(error);
    }
  };

  const login = () => {
    if (loginPost.current.email === '' || loginPost.current.password === '') {
      Alert.alert('Bilgi', 'Boş yerleri doldurun', [{text: 'Tamam'}]);
    } else {
      postLogin('/api/login', loginPost.current)
        .then(response => {
          if (
            response.data.message === 'Parola Hatalı' &&
            response.data.status === false
          ) {
            Alert.alert('Bilgi', 'Parola Hatalı', [{text: 'Tamam'}]);
          } else if (
            response.data.status === false &&
            response.data.message === 'Kullanıcıya ait kayıt bulunamadı!'
          ) {
            Alert.alert('Bilgi', 'Kullanıcıya ait kayıt bulunamadı!', [
              {text: 'Tamam'},
            ]);
          } else {
            dispatch(signin({token: 'Bearer ' + response.data.token}));
            dispatch(
              userinfo({
                name: response.data.user.name,
                email: response.data.user.email,
                token: 'Bearer ' + response.data.token,
              }),
            );

            setToken(
              response.data.token,
              response.data.user.name,
              response.data.user.email,
            );
          }
        })
        .catch(err => {
          Alert.alert('Bilgi', 'Kullanıcıya ait kayıt bulunamadı', [
            {text: 'Tamam'},
          ]);
        });
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <TextInput
          label="Email"
          onChangeText={text => (loginPost.current.email = text)}
          mode="outlined"
        />
        <View style={{marginTop: 26}}>
          <TextInput
            label="Şifre"
            onChangeText={text => (loginPost.current.password = text)}
            secureTextEntry
            mode="outlined"
          />
        </View>
      </View>
      <Button mode="contained" onPress={() => login()}>
        GİRİŞ
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    justifyContent: 'center',
    flexDirection: 'column',
    paddingHorizontal: 16,
    paddingVertical: 56,
  },
});

export default LoginScreen;
