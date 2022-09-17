import React, { useState } from "react"
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import { Button } from 'react-native-paper'
import Header from "../components/Header"
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "../stores/basket"



const ProductsDetail = ({ route, navigation }) => {
    const dispatch = useDispatch()
    const [product, setProduct] = useState(route.params)
    const [text, setText] = useState("Details")
    return (
        <View>
            <Header navigation={navigation} text={text} />
            <SafeAreaView style={styles.allContainer}>
                <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true} style={{ width: '100%' }}>

                    <TouchableOpacity>
                        <Image style={styles.img} source={{ uri: product.image }} />
                        <Text style={styles.txtProducts}>{product.title}</Text>
                        <Text style={styles.txtProducts}>{product.price}</Text>
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.txtProducts}>{product.description}</Text>
                    </View>
                    <View style={styles.btn}>
                        <Button mode="contained" onPress={() => {
                            { dispatch(addToCart(product)), navigation.navigate("MyCart", product) }

                        }}>
                            Sepete Ekle
                        </Button>
                    </View>


                </ScrollView>
            </SafeAreaView></View>
    )
}

export default ProductsDetail


const styles = StyleSheet.create({
    img: {
        height: 250,
        width: 250
    },

    allContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 12

    }, txtProducts: {
        fontSize: 22,
        fontWeight: "500"
    },
    btn: {
        paddingHorizontal: 30,
        paddingVertical: 70
    }
})