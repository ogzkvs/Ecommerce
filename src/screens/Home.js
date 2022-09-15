import React, { useEffect, useState } from "react"
import { Text, View, StyleSheet, FlatList, Image } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { signout, signin } from '../stores/auth'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import CustomDrawer from "../components/CustomDrawer"
import { get, getWithPage } from '../service'
import { ActivityIndicator } from 'react-native-paper'

function HomeScreen({ navigation }) {

    const [data, setData] = useState([])
    const paging = React.useRef()
    const [isloading, setisLoading] = useState(false);

    const fetchData = () => {

        setisLoading(true);

        if (paging.current === undefined) {
            paging.current = { to: 25 }
        }

        getWithPage('/api/products', paging.current.to / 25).then(response => {
            setData([...data, ...response.data.products.data]),
                paging.current = { ...response.data.products }
            console.log(paging.current.to / 25)
            setisLoading(false)
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    const renderData = (item) => {
        return (
            <View>
                <Image style={styles.img} source={{ uri: item.item.image }} />
                <Text>{item.item.title}</Text>
                <Text>{item.item.price}</Text>
            </View>
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
            fetchData()
        } else {
            console.log("next_page_url son da ", paging.current.next_page_url)
        }
    }


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <FlatList
                data={data}
                renderItem={renderData}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                ListFooterComponent={renderFooter}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.01}
            />
        </View>
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
        height: 150,
        width: 150
    }
})