import {View, Text, StyleSheet, Alert, Image, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {AuthContext} from '../../components/context';
import {baseUrl, imgUrl} from '../../api/url';
import StarRating from '../../components/StarRating';
import {ActivityIndicator} from 'react-native-paper';

const {width, height} = Dimensions.get('window');
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;

const AdminHomeScreen = () => {
  const {signOut} = React.useContext(AuthContext);

  const [data, setData] = useState();

  useEffect(() => {
    getAllOrder();
  }, []);

  const getAllOrder = async () => {
    await fetch(`${baseUrl}/admin/getAllOrder`, {method: 'GET'})
      .then(res => res.json())
      .then(res => {
        // console.log('response - ', res);
        const newData = res.map(v => {
          return {...v, order: v.order.filter(o => o.orderStatus == false)};
        });
        const ndata = [];

        // console.log(newData);

        newData.forEach(element => {
          if (element.order.length) {
            element.order.forEach(o => {
              ndata.push({
                username: element.username,
                userId: element._id,
                order: o,
              });
            });
          }
        });

        // console.log('ndata - ', ndata.length);

        setData(ndata);
        // console.log('newData - ', newData[2].order);
      })
      .catch(err => {
        return Alert.alert('Something went wrong');
      });
  };

  const confirmOrder = async (orderId, userId) => {
    // console.log(orderId);
    // console.log(userId);
    await fetch(`${baseUrl}/admin/confirmOrder/${userId}/${orderId}`, {
      method: 'PUT',
    })
      .then(res => res.json())
      .then(res => {
        if (res.err) return Alert.alert(res.err);
      })
      .catch(err => {
        return Alert.alert('Something went wrong');
      });

    getAllOrder();
  };

  if (data == undefined) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  if (data.length == 0) {
    return (
      <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
        <Text style={{fontSize: 20}}>No order found</Text>
      </View>
    );
  }

  const renderItem = ({item}) => {
    if (!item) {
      return null;
    }
    return (
      <View style={{marginTop: 0, marginBottom: 0}}>
        <View
          style={{
            backgroundColor: '#FF6347',
            marginTop: 15,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              textAlign: 'center',
              paddingVertical: 2,
            }}>
            {(item?.username).toUpperCase()}
          </Text>
        </View>
        <View style={styles.card}>
          <View style={styles.cardImgWrapper}>
            <Image
              source={{
                uri: `${imgUrl}/products/food-banner1.jpg`,
              }}
              resizeMode="cover"
              style={styles.cardImg}
            />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>
              {item.order.title.toUpperCase()}
            </Text>
            <StarRating ratings={3} reviews={3} />
            <Text numberOfLines={2} style={styles.cardDetails}>
              {item.order.description}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => confirmOrder(item.order._id, item.userId)}
          style={{
            backgroundColor: '#FF6347',
            marginBottom: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}>
          <Text style={{fontSize: 20, paddingVertical: 5, textAlign: 'center'}}>
            Confirm
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default AdminHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
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

  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 12,
    color: '#444',
  },

  cardsWrapper: {
    marginTop: 100,
    width: '90%',
    alignSelf: 'center',
  },
  card: {
    height: 100,
    // marginVertical: 10,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    backgroundColor: '#FFF',
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
    fontSize: 18,
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
  },
});
