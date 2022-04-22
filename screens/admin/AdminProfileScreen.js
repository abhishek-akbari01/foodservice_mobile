import {View, Text, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {baseUrl} from '../../api/url';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AuthContext} from '../../components/context';

const AdminProfileScreen = () => {
  const [name, setName] = useState();
  const [totalAmount, setTotalAmount] = useState();
  const [totalOrder, setTotalOrder] = useState();

  const {signOut} = React.useContext(AuthContext);

  useEffect(() => {
    getData();
    const willFocusSubscription = navigation.addListener('focus', () => {
      getData();
    });

    return willFocusSubscription;
  }, []);

  const getData = async () => {
    const name = await AsyncStorage.getItem('name');

    await fetch(`${baseUrl}/admin/getOrderCount`, {method: 'GET'})
      .then(res => res.json())
      .then(res => {
        setName(name);
        setTotalAmount(res.totalMoney);
        setTotalOrder(res.orderCount);
      })
      .catch(err => {
        return Alert.alert('Somthing went wrong!!');
      });
  };

  return (
    <View>
      <View>
        <Text
          style={{
            fontSize: 28,
            alignSelf: 'center',
            marginTop: 20,
            fontWeight: 'bold',
          }}>
          {name?.toUpperCase()}
        </Text>
      </View>
      <View>
        <Text style={{fontSize: 25, alignSelf: 'center', marginTop: 20}}>
          Total orders : {totalOrder}
        </Text>
        <Text style={{fontSize: 25, alignSelf: 'center', marginTop: 20}}>
          Total Money : {totalAmount}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          signOut();
        }}
        style={{
          backgroundColor: '#FF6347',
          marginHorizontal: 80,
          marginTop: 20,
          padding: 8,
          borderRadius: 8,
        }}>
        <Text
          style={{
            fontSize: 22,
            alignSelf: 'center',
            color: 'white',
            fontWeight: 'bold',
            alignSelf: 'center',
          }}>
          SignOut
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AdminProfileScreen;
