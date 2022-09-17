import React, { useEffect, useState } from "react"
import { Text, View, StyleSheet, FlatList, Image, ScrollView, SafeAreaView, Dimensions } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { signout, signin } from '../stores/auth'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import CustomDrawer from "../components/CustomDrawer"
import { get, getWithPage } from '../service'
import { ActivityIndicator } from 'react-native-paper'
import { TouchableOpacity } from "react-native-gesture-handler";
const { width, height } = Dimensions.get('window');

function HomeScreen({ navigation }) {
    const [status, setStatus] = useState('All')
    const [data, setData] = useState([]);
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState()
    const paging = React.useRef()
    const [isloading, setisLoading] = useState(false);
    console.log(status)
    const fetchData = () => {
        get('/api/products/').then(response => {
            setData([...response.data.products.data]),
                paging.current = { ...response.data.products }
        })
    }


    const fetchProducts = (id) => {
        setStatus("farkli")
        get('/api/products/' + id,).then(response => {
            setProducts([response.data])
            //      paging.current = { ...response.data.products }
        })
    }

    const fetchPageData = () => {
        setisLoading(true)
        getWithPage(paging.current.next_page_url).then(response => {
            setData([...data, ...response.data.products.data]),
                paging.current = { ...response.data.products }
            setisLoading(false)
        })

    }

    const fetchCategories = () => {
        get("/api/categories").then(function (response) {
            setCategories(response.data.categories)
        })
    }

    useEffect(() => {
        fetchCategories()
        fetchData()
    }, [])

    const renderData = ({ item }) => {
        return (
            <View>
                {status === "All"
                    ?
                    <SafeAreaView style={styles.allContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate("ProductsDetail", item)}>
                            <Text>{item.id}</Text>

                            <Image style={styles.img} source={{ uri: item.image }} />
                            <Text style={styles.txtProducts}>{item.title}</Text>
                            <Text style={styles.txtProducts}>{item.price}</Text></TouchableOpacity>
                    </SafeAreaView>
                    :
                    <SafeAreaView style={styles.allContainer}>
                        <TouchableOpacity>
                            <Image style={styles.img} source={{ uri: item.product.image }} />
                            <Text style={styles.txtProducts}>{item.product.title}</Text>
                            <Text style={styles.txtProducts}>{item.product.price}</Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                }
            </View >
        )
    }
    const renderCategories = (item) => {
        return (
            <SafeAreaView style={styles.categoryContainer}>
                <TouchableOpacity onPress={() => fetchProducts(item.item.id)}>
                    <View style={styles.categorytxt}>
                        <Text style={styles.txt}>{item.item.title}</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
    const renderFooter = () => {
        return isloading ? (
            < View style={styles.loader} >
                <ActivityIndicator animating={true} />
            </View >
        ) : null;
    };

    const handleLoadMore = () => {
        if (paging.current.next_page_url !== null) {
            fetchPageData()
        } else {
            console.log("next_page_url son da ", paging.current.next_page_url)
        }
    }


    return (
        <SafeAreaView style={styles.mainContainer}>
            <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true} style={{ width: '100%' }}>
                <View style={styles.topView}>
                    <TouchableOpacity onPress={() => { fetchData(), setStatus("All") }}>
                        <View style={styles.alltxt}>
                            <Text style={styles.txt}>All</Text>
                        </View>
                    </TouchableOpacity>
                    <ScrollView horizontal={false} nestedScrollEnabled={true}>
                        <FlatList
                            style={{ flex: 1 }}
                            horizontal
                            data={categories}
                            renderItem={renderCategories}
                            keyExtractor={(item, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                        />
                    </ScrollView>
                </View>
                <ScrollView horizontal={true} nestedScrollEnabled={true}>
                    <FlatList
                        style={{ flex: 1 }}
                        data={status === "All" ? data : products}
                        renderItem={renderData}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        ListFooterComponent={renderFooter}
                        onEndReached={handleLoadMore}
                    />
                </ScrollView>
            </ScrollView>
        </SafeAreaView >
    );
}


const Drawer = createDrawerNavigator();

const Home = () => {
    return (
        <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />} screenOptions={{ headerShown: 'false' }} >
            <Drawer.Screen name="HomeScreen" component={HomeScreen} options={{ headerTitleAlign: 'center', title: 'Anasayfa' }} />
        </Drawer.Navigator>

    )
}


export default Home

const styles = StyleSheet.create({
    img: {
        height: 250,
        width: 250
    },
    mainContainer: {
        flex: 1,
        backgroundColor: '#e0e0e0',
    },
    alltxt: {
        width: 50,
        height: 50,
        backgroundColor: "gray",
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center"

    }, txt: {
        fontSize: 16,
        fontWeight: "bold"

    },
    topView: {
        flexDirection: "row",
        paddingVertical: 16,
        paddingHorizontal: 16
    },
    categoryContainer: {

        paddingHorizontal: 16
    },
    categorytxt: {
        width: 150,
        height: 50,
        backgroundColor: "gray",
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center"
    },
    allContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 12

    }, txtProducts: {
        fontSize: 22,
        fontWeight: "500"
    }
})