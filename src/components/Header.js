import React from "react"
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import { useSelector } from "react-redux"
import { cartTotalSelector } from '../stores/selectors'
import Ionicons from 'react-native-vector-icons/Ionicons';



const Header = ({ navigation, text }) => {
    console.log(text)

    const total = useSelector(cartTotalSelector);
    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.container}>

                <View style={styles.backView}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <Ionicons
                            name="arrow-back-outline"
                            size={25}
                        /></TouchableOpacity>
                </View>
                <View>
                    {text === "Details" ? <Text style={styles.txt}>Detay</Text> : <Text style={styles.txt}>Sepetim</Text>}
                </View>

                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("MyCart")
                    }}
                >
                    <View style={styles.basketView}>
                        <Ionicons
                            name="cart-outline"
                            size={25}
                        />
                        <Text>{total}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Header;

const styles = StyleSheet.create({
    basketView: {
        flexDirection: "row"

    },
    backView: {
        justifyContent: "center",


    },
    mainContainer: {
        backgroundColor: "white",
        width: "100%",
        height: 70,
        justifyContent: "center"

    },
    container: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row"
    },
    txt: {
        fontSize: 22,
        color: "black"

    }
});
