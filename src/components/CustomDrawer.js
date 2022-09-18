import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {get} from '../service';
import {signout, signin} from '../stores/auth';
import {addProducts} from '../stores/products';
import AsyncStorageStatic from '@react-native-async-storage/async-storage';

const CustomDrawer = ({status, fetchData, navigation}) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([
    {id: -1, All: 'All', id: -2, Home: 'Anasayfa'},
  ]);

  useEffect(() => {
    const fetchCategory = () => {
      get('/api/categories').then(function (response) {
        setData([...data, ...response.data.categories]);
      });
    };
    fetchCategory();
  }, []);

  const fetchProducts = id => {
    get('/api/categories/' + id).then(response => {
      {
        dispatch(addProducts(response.data.products));
      }
    });
  };

  const handleLogout = () => {
    try {
      AsyncStorageStatic.removeItem('token').then(result => {
        dispatch(signout({token: 'Bearer' + ''}));
      });
    } catch {
      console.log(error);
    }
  };

  const renderData = item => {
    return (
      <SafeAreaView style={styles.categoryContainer}>
        <TouchableOpacity
          onPress={() => {
            {
              if (status !== 'active' && item.item.Home) {
                navigation.closeDrawer();
              } else if (status !== 'active' && item.item.title) {
                navigation.closeDrawer();
                fetchProducts(item.item.id);
              } else if (status === 'active' && item.item.title) {
                fetchProducts(item.item.id);
              } else if (status === 'active' && item.item.All) {
                fetchData();
              }
            }
          }}>
          {status === 'active' ? (
            <View style={styles.container}>
              <View style={styles.categorytxt}></View>
              <View style={styles.txtStyle}>
                <Text style={styles.txt}>{item.item.All}</Text>
                <Text style={styles.txt}>{item.item.title}</Text>
              </View>
            </View>
          ) : (
            <View style={styles.container}>
              <View style={styles.categorytxt}></View>
              <View style={styles.txtStyle}>
                <Text style={styles.txt}>{item.item.Home}</Text>
                <View style={styles.txtStyle}>
                  <Text style={styles.txt}>{item.item.title}</Text>
                </View>
              </View>
            </View>
          )}
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  return (
    <View>
      <FlatList
        horizontal={status === 'active' ? true : false}
        data={data}
        renderItem={renderData}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
      {status === 'active' ? null : (
        <TouchableOpacity
          onPress={() => {
            handleLogout();
          }}>
          <View style={styles.container}>
            <View style={styles.categorytxt}></View>
            <View style={styles.txtStyle}>
              <Text style={styles.txt}>Çıkış Yap</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  categoryContainer: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    flex: 1,
  },
  categorytxt: {
    width: 50,
    height: 50,
    backgroundColor: '#e1f5fe',
    borderRadius: 16,
    borderColor: 'black',
    borderWidth: 1,
  },

  txt: {
    color: '#7A420F',
    fontWeight: '700',
  },
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerView: {
    flexDirection: 'row',
  },
  txtStyle: {
    flexDirection: 'row',
  },
});
