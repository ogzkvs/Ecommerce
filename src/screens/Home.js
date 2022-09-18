import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {signout, signin} from '../stores/auth';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import CustomDrawer from '../components/CustomDrawer';
import {get, getWithPage} from '../service';
import {ActivityIndicator} from 'react-native-paper';
import {addProducts, loadMoreProduct} from '../stores/products';
import AsyncStorageStatic from '@react-native-async-storage/async-storage';
import cache from '../cache';

const {width, height} = Dimensions.get('window');

function HomeScreen({navigation}) {
  const products = useSelector(state => state.products);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
    getData();
  }, []);

  function fetchData() {
    get('/api/products').then(response => {
      {
        dispatch(addProducts(response.data.products));
      }
    });
  }

  const getData = () => {
    try {
      AsyncStorageStatic.getItem('token').then(result => {
        dispatch(signin({token: 'Bearer ' + result}));
      });
    } catch {
      console.log(error);
    }
  };

  const renderProducts = ({item}) => {
    return (
      <SafeAreaView style={styles.allContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ProductsDetail', item)}>
          <View style={styles.container}>
            <View style={styles.imgView}>
              <Image style={styles.img} source={{uri: item.image}} />
            </View>
            <View style={styles.txtView}>
              <Text style={styles.txtProducts}>{item.title}</Text>
              <Text style={styles.txtPrice}>{item.price}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  };
  const handleLoadMore = () => {
    if (products.next_page_url !== null) {
      setLoading(true);
      console.log(products.next_page_url);
      getWithPage(products.next_page_url).then(response => {
        dispatch(loadMoreProduct(response.data.products));
        setLoading(false);
      });
    }
  };

  const renderFooter = () => {
    return loading ? (
      <View style={styles.loader}>
        <ActivityIndicator animating={true} />
      </View>
    ) : null;
  };

  return (
    <View style={styles.drawerView}>
      <SafeAreaView style={styles.categoryContainer}>
        <CustomDrawer fetchData={fetchData} status="active" />
      </SafeAreaView>
      <FlatList
        data={products.data}
        renderItem={renderProducts}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.01}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
}

const Drawer = createDrawerNavigator();

const Home = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{headerShown: 'false'}}>
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerTitleAlign: 'center', title: 'Anasayfa'}}
      />
    </Drawer.Navigator>
  );
};

export default Home;

const styles = StyleSheet.create({
  img: {
    height: 250,
    width: 250,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#e0e0e0',
  },
  alltxt: {
    width: 50,
    height: 50,
    backgroundColor: 'gray',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  topView: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  categoryContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  categorytxt: {
    width: 150,
    height: 50,
    backgroundColor: 'gray',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  allContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: 350,
  },
  txtProducts: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
  },
  drawerView: {
    flexDirection: 'column',
    flex: 1,
  },
  loader: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtPrice: {
    color: '#7A420F',
    fontWeight: '700',
    fontSize: 20,
  },
  txtView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#DEDEDE',
    width: 300,
    height: 330,
    borderRadius: 16,
    borderWidth: 1,
  },
  containerAll: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginRight: 15,
  },
  imgView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  categorytxt: {
    width: 50,
    height: 50,
    backgroundColor: '#e1f5fe',
    borderRadius: 16,
    borderColor: 'black',
    borderWidth: 1,
  },
  txtAll: {
    color: '#7A420F',
    fontWeight: '900',
  },
});
