import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {postRegister, checkUser} from '../service';

const Register = ({navigation}) => {
  const register = React.useRef({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const checkEmail = email => {
    checkUser('/api/check-user', email).then(data => {
      if (data.data.register_status === true) {
        Alert.alert('Bilgi', 'Kullanıcıya ait kayıt bulundu!', [
          {text: 'Tamam'},
        ]);
      }
    });
  };

  const handleRegister = () => {
    /* const string = JSON.stringify(register.current.email);
    const found = string(element => element === '@ ');
    console.log(string);
    console.log(found);*/

    if (
      register.current.name === '' ||
      register.current.email === '' ||
      register.current.password === '' ||
      register.current.password_confirmation === ''
    ) {
      Alert.alert('Bilgi', 'Boş yerleri doldurun', [{text: 'Tamam'}]);
    } else if (
      register.current.password !== register.current.password_confirmation
    ) {
      Alert.alert('Bilgi', 'Şifreler Eşleşmiyor', [{text: 'Tamam'}]);
    } else if (
      register.current.password.length &&
      register.current.password_confirmation.length < 6
    ) {
      Alert.alert('Bilgi', 'Parola minimum 6 karakterden oluşmalıdır', [
        {text: 'Tamam'},
      ]);
    } else {
      postRegister('/api/register', register.current)
        .then(data => {
          navigation.navigate('LoginScreen');
        })
        .catch(error => {
          checkEmail(register.current.email);
        });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.container}>
            <TextInput
              label="Ad Soyad"
              onChangeText={text => (register.current.name = text)}
              mode="outlined"
            />
            <View style={{marginTop: 26}}>
              <TextInput
                label="Email"
                onChangeText={text => (register.current.email = text)}
                mode="outlined"
              />
            </View>
            <View style={{marginTop: 26}}>
              <TextInput
                label="Şifre"
                onChangeText={text => (register.current.password = text)}
                secureTextEntry
                mode="outlined"
                numberOfLines={6}
              />
            </View>
            <View style={{marginTop: 26}}>
              <TextInput
                label="Şifre onayı"
                onChangeText={text =>
                  (register.current.password_confirmation = text)
                }
                secureTextEntry
                mode="outlined"
              />
            </View>
          </View>
          <Button mode="contained" onPress={() => handleRegister()}>
            KAYIT OL
          </Button>
          <View style={{marginTop: 26}}>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('LoginScreen')}>
              GİRİŞ YAP
            </Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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

export default Register;
