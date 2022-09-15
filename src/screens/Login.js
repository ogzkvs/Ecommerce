import React from "react"
import { Text, View, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'

const Login = ({ navigation }) => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <Button mode="contained" onPress={() => navigation.navigate("LoginScreen")}>
                    LOGIN
                </Button>
                <View style={{ marginTop: 26 }}>
                    <Button mode="outlined" onPress={() => navigation.navigate("Register")}>
                        SIGN UP
                    </Button></View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1, justifyContent: "center"
    },
    container: {
        justifyContent: 'center',
        flexDirection: "column",

        paddingHorizontal: 16,

    }
})


export default Login