import React, { useState } from "react"
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import { useDispatch, useSelector } from "react-redux"
import Ionicons from 'react-native-vector-icons/Ionicons';
import { increment, decrement, removeItem } from "../stores/basket"
import { cartTotalPriceSelector, cartTotalSelector } from '../stores/selectors'
import Header from "../components/Header";
import { Button } from 'react-native-paper'


const MyCart = ({ route, navigation }) => {
    const dispatch = useDispatch()
    const basket = useSelector((state) => state.basket)
    const totalPrice = useSelector(cartTotalPriceSelector)
    const [text, setText] = useState("Sepetim")
    const renderBasket = ({ item }) => {
        return (
            <View style={styles.storeItem}>
                <View style={styles.storeItemImg}>
                    <Image style={styles.storeItemImage} source={{ uri: item.image }} />

                </View>
                <View style={styles.storeItemInfo}>
                    <View style={styles.closeTitle}>
                        <Text style={styles.storeItemTitle}>{item.title}</Text>
                        <View style={styles.cartItemRemove}>
                            <TouchableOpacity
                                onPress={() => {
                                    dispatch(removeItem(item.id));
                                }}
                                style={styles.cartItemRemoveButton}
                            >
                                <Ionicons
                                    name="close-outline"
                                    size={25}
                                />

                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={styles.storeItemPrice}>
                        ₺{item.quantity * item.price}
                    </Text>
                    <View style={styles.addToCart}>
                        <View style={styles.cartItemAmount}>
                            <TouchableOpacity
                                onPress={() => {
                                    if (item.quantity === 1) {
                                        dispatch(removeItem(item.id));

                                        console.log("removed");
                                        return;
                                    } else {
                                        dispatch(decrement(item.id));
                                    }
                                }}
                            >
                                <Ionicons
                                    name="remove-outline"
                                    size={25}
                                />
                            </TouchableOpacity>
                            <Text style={styles.cartItemAmountText}>{item.quantity}</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    dispatch(increment(item.id));
                                }}
                            >
                                <Ionicons
                                    name="add-outline"
                                    size={25}
                                />
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </View>
        );
    };


    return (
        <View>
            <Header navigation={navigation} text={text} />
            <FlatList
                data={basket}
                renderItem={renderBasket}
                keyExtractor={(item) => item.id}
                ListFooterComponent={() => {
                    return (
                        <View style={styles.cartFooter}>
                            <View style={styles.checkout}>
                                {basket.length === 0 ? (
                                    <View style={styles.emptyView}>
                                        <Text style={styles.checkoutText}>Your cart is empty</Text></View>
                                ) : (
                                    <View style={styles.checkoutFull}>
                                        <View style={styles.txtContainer}>
                                            <Text style={styles.checkoutText}>
                                                TOPLAM:
                                            </Text>
                                            <Text style={styles.checkoutText}>
                                                ₺{totalPrice}
                                            </Text>
                                        </View>
                                        <Button buttonColor="#995D28" textColor="white" mode="elevated" onPress={() => login()}>
                                            Tamamla
                                        </Button>
                                        <View style={styles.btn}>
                                            <Button buttonColor="#995D28" textColor="white" mode="outlined" onPress={() => navigation.navigate("Home")}>
                                                Devam et
                                            </Button>
                                        </View>
                                    </View>
                                )}
                            </View>
                            <View style={{ height: 200 }} />
                        </View>
                    );
                }}
            />
        </View >
    )
}

export default MyCart


const styles = StyleSheet.create({
    storeItem: {
        flexDirection: "row",
        padding: 10,
        marginBottom: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 22,
        backgroundColor: "white",
        justifyContent: "center",

    },
    storeItemImg: {
        width: "30%",
        height: 100,
        borderRadius: 8,
        overflow: "hidden",
    },
    storeItemImage: {
        width: "100%",
        height: "100%",
    },
    storeItemInfo: {
        width: "70%",
        padding: 10,
    },
    storeItemTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    storeItemPrice: {
        fontSize: 16,
        color: "#995D28"
    },
    addToCart: {
        backgroundColor: "#FFFFFF",
        borderRadius: 5,
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    addToCartText: {
        color: "#FEFEFE",
        fontSize: 16,
        fontWeight: "bold",
    },
    cartItemAmount: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "80%",
    },
    cartItemAmountText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    cartItemRemove: {
        marginLeft: 50,


    },
    cartItemRemoveButton: {
        marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    cartFooter: {

        flexDirection: "column-reverse"

    },
    checkoutFull: {

        paddingHorizontal: 16,
        paddingVertical: 60
    },
    btn: {
        marginTop: 25,
        color: "#995D28"


    },
    checkoutText: {
        fontSize: 16,
        color: "#995D28"

    },
    txtContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginBottom: 22,
        backgroundColor: "#FFFFFF",
        width: '100%',
        height: 50

    },
    closeTitle: {
        flexDirection: "row",

    },
    emptyView: {
        justifyContent: "center",
        alignItems: "center"
    }
});