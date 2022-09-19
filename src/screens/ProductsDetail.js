import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Button} from 'react-native-paper';
import Header from '../components/Header';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../stores/basket';

const {width, height} = Dimensions.get('window');

const ProductsDetail = ({route, navigation}) => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState(route.params);
  const [text, setText] = useState('Details');
  return (
    <View>
      <Header navigation={navigation} text={text} />
      <SafeAreaView style={styles.allContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
          style={{width: '100%'}}>
          <SafeAreaView style={styles.productContainer}>
            <View style={styles.container}>
              <View style={styles.imgView}>
                <Image style={styles.img} source={{uri: product.image}} />
              </View>
              <View style={styles.txtView}>
                <Text style={styles.txtProducts}>{product.title}</Text>
                <Text style={styles.txtPrice}>₺{product.price}</Text>
                <View style={styles.descriptionView}>
                  <Text style={styles.txtProducts}>{product.description}</Text>
                </View>
              </View>
            </View>
          </SafeAreaView>
          <View style={styles.btn}>
            <Button
              mode="contained"
              onPress={() => {
                {
                  dispatch(addToCart(product)),
                    navigation.navigate('MyCart', product);
                }
              }}>
              Sepete Ekle
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ProductsDetail;

const styles = StyleSheet.create({
  img: {
    height: 250,
    width: 250,
  },

  allContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtProducts: {
    fontSize: 22,
    fontWeight: '500',
  },
  btn: {
    paddingHorizontal: 30,
    paddingVertical: 70,
  },
  productContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: 480,
  },
  container: {
    backgroundColor: '#DEDEDE',
    width: 300,
    height: 330,
    borderRadius: 16,
    borderWidth: 1,
  },
  txtView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtProducts: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
  },
  txtPrice: {
    color: '#7A420F',
    fontWeight: '700',
    fontSize: 20,
  },
  imgView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  descriptionView: {
    justifyContent: 'center',
    width: 350,
    height: 150,
  },
});
