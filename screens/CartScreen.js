import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import StarRating from '../components/StarRating';
import {TouchableOpacity} from 'react-native-gesture-handler';

const CartScreen = () => {
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
        <View
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
                source={require('../assets/banners/food-banner4.jpg')}
                resizeMode="cover"
                style={styles.cardImg}
              />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>Pasta</Text>
              <StarRating ratings={4} reviews={99} />
            </View>
            <View
              style={{
                flex: 0.8,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 20,
              }}>
              <Text style={{fontSize: 25}}>35 RS</Text>
            </View>
          </View>
        </View>
        <View
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
                source={require('../assets/banners/food-banner4.jpg')}
                resizeMode="cover"
                style={styles.cardImg}
              />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>Pasta</Text>
              <StarRating ratings={4} reviews={99} />
            </View>
            <View
              style={{
                flex: 0.8,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 20,
              }}>
              <Text style={{fontSize: 25}}>35 RS</Text>
            </View>
          </View>
        </View>
        <View
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
                source={require('../assets/banners/food-banner4.jpg')}
                resizeMode="cover"
                style={styles.cardImg}
              />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>Pasta</Text>
              <StarRating ratings={4} reviews={99} />
            </View>
            <View
              style={{
                flex: 0.8,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 20,
              }}>
              <Text style={{fontSize: 25}}>35 RS</Text>
            </View>
          </View>
        </View>
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
          500 RS
        </Text>
      </View>
      <TouchableOpacity
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
