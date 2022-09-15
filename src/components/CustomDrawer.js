import React, { useEffect, useState } from "react";
import { Text, View } from 'react-native'
import { FlatList } from "react-native-gesture-handler";
import { get } from '../service'

const CustomDrawer = () => {
    const [data, setData] = useState();

    useEffect(() => {
        const fetchData = () => {
            get("/api/categories").then(function (response) {
                setData(response.data.categories)
            })
        }
        fetchData()
    }, [])

    const renderData = (item) => {
        return (
            <View>
                <Text>{item.item.title}</Text>
            </View>
        )
    }


    return (
        <View>
            <Text>Anasayfa</Text>
            <FlatList
                data={data}
                renderItem={renderData}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}


export default CustomDrawer