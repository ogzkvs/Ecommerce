import React from "react"
import { Text, View, StyleSheet, Alert } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import { signin } from '../stores/auth'
import { postLogin } from '../service'


const LoginScreen = () => {
    const loginPost = React.useRef({
        email: '',
        password: ''
    })
    const dispatch = useDispatch()

    const login = () => {
        if (
            loginPost.current.email === '' ||
            loginPost.current.password === ''
        ) {
            Alert.alert('Bilgi', 'Boş yerleri doldurun', [{ text: 'Tamam' }]);
        } else {
            postLogin('/api/login', loginPost.current).then(response => {
                console.log("response", response.data.message)
                dispatch(signin({ token: 'Bearer ' + response.data.token }))
            }).catch(err => { Alert.alert('Bilgi', 'Kullanıcıya ait kayıt bulunamadı', [{ text: 'Tamam' }]); })
        }
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <TextInput
                    label="Email"
                    onChangeText={text => (loginPost.current.email = text)}
                    mode="outlined"
                />
                <View style={{ marginTop: 26 }}>
                    <TextInput
                        label="Password"
                        onChangeText={text => (loginPost.current.password = text)}
                        secureTextEntry
                        mode="outlined"
                    />
                </View>
            </View>
            <Button mode="contained" onPress={() => login()}>
                LOGIN
            </Button>
        </View >
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1, justifyContent: "center",
    },
    container: {
        justifyContent: 'center',
        flexDirection: "column",
        paddingHorizontal: 16,
        paddingVertical: 56
    }
})


export default LoginScreen