import {View, Text, StyleSheet, Dimensions, Alert, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {baseUrl, imgUrl} from '../../api/url';
import {ActivityIndicator} from 'react-native-paper';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import StarRating from '../../components/StarRating';
import {useNavigation, useTheme} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;

const AdminOrderScreen = () => {
  const [data, setData] = useState();

  const navigation = useNavigation();

  useEffect(() => {
    getProducts();
    const willFocusSubscription = navigation.addListener('focus', () => {
      getProducts();
    });

    return willFocusSubscription;
  }, []);

  const getProducts = () => {
    fetch(`${baseUrl}/getAllProduct`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(res => {
        // console.log('res - ', res[2]);
        if (res.err) {
          return Alert.alert(res.err);
        }
        setData(res);
      })
      .catch(err => {
        return Alert.alert('Something went wrong on getting food items');
      });
  };

  const renderItem = ({item}) => {
    // console.log(item);
    return (
      // <Card
      //   itemData={item}
      //   onPress={() => navigation.navigate('CardItemDetails', {itemData: item})}
      // />
      // <Text>Hello</Text>
      <TouchableOpacity
        key={item._id}
        onPress={() =>
          navigation.navigate('ProductDetailScreen', {itemData: item})
        }>
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
            <Text style={styles.cardTitle}>{item.title.toUpperCase()}</Text>
            <StarRating ratings={3} reviews={3} />
            <Text numberOfLines={2} style={styles.cardDetails}>
              {item.description}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (data == null) {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
        <TouchableOpacity
          style={styles.addCart}
          onPress={() => navigation.navigate('AddProductScreen')}>
          <Text style={styles.addCartTxt}>Add Product</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AdminOrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
  },
  addCart: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 15,
    marginVertical: 10,
  },
  addCartTxt: {
    color: '#fff',
    fontSize: 21,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  header: {
    backgroundColor: '#d02860',
    height: 40,
    justifyContent: 'center',
  },
  searchBox: {
    position: 'absolute',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  chipsScrollView: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 90 : 80,
    paddingHorizontal: 10,
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: {x: 2, y: -2},
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: 'hidden',
  },
  cardImage: {
    flex: 3,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 12,
    color: '#444',
  },
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    alignItems: 'center',
    marginTop: 5,
  },
  signIn: {
    width: '100%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  textSign: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  cardsWrapper: {
    marginTop: 100,
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
    flex: 2,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontWeight: 'bold',
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
  },
});
