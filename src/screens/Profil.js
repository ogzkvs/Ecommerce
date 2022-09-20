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
import {useSelector, useDispatch} from 'react-redux';
import {postRegister} from '../service';

const Profil = () => {
  const user = useSelector(state => state.auth);
  const update = React.useRef({
    name: user.name,
    email: user.email,
    password: '',
    password_confirmation: '',
  });

  const handleUpdate = () => {
    if (
      update.current.password === '' ||
      update.current.password_confirmation === ''
    ) {
      Alert.alert('Bilgi', 'Boş yerleri doldurun', [{text: 'Ok'}]);
    } else if (
      update.current.password !== update.current.password_confirmation
    ) {
      Alert.alert('Bilgi', 'Şifreler Eşleşmiyor', [{text: 'Ok'}]);
    } else if (
      update.current.password.length &&
      update.current.password_confirmation.length < 6
    ) {
      Alert.alert('Bilgi', 'Parola minimum 6 karakterden oluşmalıdır', [
        {text: 'Ok'},
      ]);
    } else {
      postRegister('/api/update-profile', update.current).then(data => {
        Alert.alert('Bilgi', 'Şifreniz Başarıyla Değiştirildi', [{text: 'Ok'}]);
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.inputView}>
            <TextInput
              label="Ad Soyad"
              mode="outlined"
              value={user.name}
              disabled="true"
            />
            <View style={{marginTop: 26}}>
              <TextInput
                label="Email"
                value={user.email}
                mode="outlined"
                disabled="true"
              />
            </View>
            <View style={{marginTop: 26}}>
              <TextInput
                label="Şifre"
                onChangeText={text => (update.current.password = text)}
                secureTextEntry
                mode="outlined"
                numberOfLines={6}
              />
            </View>
            <View style={{marginTop: 26}}>
              <TextInput
                label="Şifre onayı"
                onChangeText={text =>
                  (update.current.password_confirmation = text)
                }
                secureTextEntry
                mode="outlined"
              />
            </View>
          </View>
          <Button mode="contained" onPress={() => handleUpdate()}>
            ŞİFREYİ DEĞİŞTİR
          </Button>
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
  inputView: {
    justifyContent: 'center',
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingVertical: 76,
  },
});

export default Profil;
