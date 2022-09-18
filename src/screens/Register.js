import React from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {postRegister} from '../service';

const Register = ({navigation}) => {
  const register = React.useRef({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

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
      Alert.alert('Bilgi', 'Boş yerleri doldurun', [{text: 'Ok'}]);
    } else if (
      register.current.password !== register.current.password_confirmation
    ) {
      Alert.alert('Bilgi', 'Şifreler Eşleşmiyor', [{text: 'Ok'}]);
    } else if (
      register.current.password.length &&
      register.current.password_confirmation.length < 6
    ) {
      Alert.alert('Bilgi', 'Parola minimum 6 karakterden oluşmalıdır', [
        {text: 'Ok'},
      ]);
    } else {
      postRegister('/api/register', register.current).then(data => {
        //   console.log(data);
        navigation.navigate('LoginScreen');
      });
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <TextInput
          label="Name"
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
            label="Password"
            onChangeText={text => (register.current.password = text)}
            secureTextEntry
            mode="outlined"
            numberOfLines={6}
          />
        </View>
        <View style={{marginTop: 26}}>
          <TextInput
            label="Password Confirmation"
            onChangeText={text =>
              (register.current.password_confirmation = text)
            }
            secureTextEntry
            mode="outlined"
          />
        </View>
      </View>
      <Button mode="contained" onPress={() => handleRegister()}>
        SIGN UP
      </Button>
      <View style={{marginTop: 26}}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('LoginScreen')}>
          SIGN IN
        </Button>
      </View>
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

export default Register;
