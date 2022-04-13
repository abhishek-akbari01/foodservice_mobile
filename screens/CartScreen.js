import {View, Text, Image, StyleSheet, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import StarRating from '../components/StarRating';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import {baseUrl, imgUrl} from '../api/url';
import {ActivityIndicator} from 'react-native-paper';

const CartScreen = ({route}) => {
  const [data, setData] = useState();
  const change = route.params.itemData;
  // console.log('skdg - ', change);
  let total = 0;

  useEffect(() => {
    // console.log('screen called');
    getCartProducts();
  }, [change]);

  const getCartProducts = async () => {
    const userId = await AsyncStorage.getItem('userId');
    // console.log(userId);
    await fetch(`${baseUrl}/getCartItems/${userId}`, {method: 'GET'})
      .then(res => res.json())
      .then(res => {
        // console.log('ressd - ', res[0].addCart);
        if (res.err) return Alert.alert(res.err);
        setData(res[0].addCart);
      })
      .catch(err => {
        return Alert.alert('Something went wrong in cart list');
      });
  };

  const placeOrder = async () => {
    // console.log(data);
    const userId = await AsyncStorage.getItem('userId');
    await fetch(`${baseUrl}/placeOrder/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(res => {
        // console.log(res);
        if (res.err) return Alert.alert(res.err);
        getCartProducts();
      })
      .catch(err => {
        return Alert.alert('Something went wrong!');
      });
  };

  const renderItem = ({item}) => {
    total = total + item.price;
    return (
      <View
        key={item._id}
        style={{
          backgroundColor: '#ffffff',
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 6},
          shadowOpacity: 0.39,
          shadowRadius: 8.3,
          elevation: 13,
          borderRadius: 10,
          // paddingHorizontal: '4%',
          // paddingTop: '3%',
          marginVertical: '2%',
          // marginHorizontal: '3%',
        }}>
        <View style={styles.card}>
          <View style={styles.cardImgWrapper}>
            <Image
              source={{
                uri: `${imgUrl}/${item.photo}`,
              }}
              resizeMode="cover"
              style={styles.cardImg}
            />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <StarRating ratings={3} reviews={3} />
          </View>
          <View
            style={{
              flex: 0.8,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 20,
            }}>
            <Text style={{fontSize: 25}}>{item.price} RS</Text>
          </View>
        </View>
      </View>
    );
  };

  const getTotal = () => {
    data.forEach(element => {
      // console.log('sudgfhj', element.price);
      total = total + element.price;
    });
    return total;
  };

  if (data == undefined) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          backgroundColor: '#1f65ff',
          height: 45,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
          My Cart
        </Text>
      </View>
      <View style={{flex: 1, width: '90%', alignSelf: 'center'}}>
        {data.length == 0 && (
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text>Empty Cart</Text>
          </View>
        )}
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View
        style={{
          backgroundColor: '#ffffff',
          height: 50,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 60},
          shadowOpacity: 0.9,
          shadowRadius: 8.3,
          elevation: 10,
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <Text style={{fontSize: 20, alignSelf: 'center', marginLeft: 20}}>
          Total:
        </Text>
        <Text style={{fontSize: 20, alignSelf: 'center', marginRight: 20}}>
          {getTotal()} RS
        </Text>
      </View>
      <TouchableOpacity
        onPress={placeOrder}
        style={{
          backgroundColor: '#1f65ff',
          height: 45,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
          Place Order
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  cardsWrapper: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
  card: {
    height: 100,
    marginVertical: 10,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardImgWrapper: {
    flex: 1,
  },
  cardImg: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardInfo: {
    flex: 1.5,
    padding: 10,
    borderColor: '#ccc',
    // borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 20,
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
  },
});
