import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Share from 'react-native-share';

import files from '../assets/filesBase64';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import {baseUrl} from '../api/url';

const ProfileScreen = () => {
  const [name, setName] = useState();
  const [amount, setAmount] = useState();
  const [order, setOrder] = useState();

  useEffect(() => {
    getData();
    const willFocusSubscription = navigation.addListener('focus', () => {
      getData();
    });

    return willFocusSubscription;
  }, []);

  const getData = async () => {
    const name = await AsyncStorage.getItem('name');
    const id = await AsyncStorage.getItem('userId');

    await fetch(`${baseUrl}/getUserExpense/${id}`, {method: 'GET'})
      .then(res => res.json())
      .then(res => {
        if (res.err) return Alert.alert(res.err);
        setName(name);
        setAmount(res.totalMoney);
        setOrder(res.orderCount);
      })
      .catch(err => {
        return Alert.alert('something went wrong');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.userInfoSection}>
          <View style={{flexDirection: 'row'}}>
            <View style={{marginLeft: 0}}>
              <Title
                style={[
                  styles.title,
                  {
                    marginTop: 15,
                    marginBottom: 5,
                  },
                ]}>
                {name?.toUpperCase()}
              </Title>
            </View>
          </View>
        </View>

        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Icon name="map-marker-radius" color="#777777" size={20} />
            <Text style={{color: '#777777', marginLeft: 20}}>
              Kolkata, India
            </Text>
          </View>
          <View style={styles.row}>
            <Icon name="phone" color="#777777" size={20} />
            <Text style={{color: '#777777', marginLeft: 20}}>
              +91-900000009
            </Text>
          </View>
          <View style={styles.row}>
            <Icon name="email" color="#777777" size={20} />
            <Text style={{color: '#777777', marginLeft: 20}}>
              user@email.com
            </Text>
          </View>
        </View>

        <View style={styles.infoBoxWrapper}>
          <View
            style={[
              styles.infoBox,
              {
                borderRightColor: '#dddddd',
                borderRightWidth: 1,
              },
            ]}>
            <Title>₹{amount}</Title>
            <Caption>Expense</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>{order}</Title>
            <Caption>Orders</Caption>
          </View>
        </View>

        <View style={styles.menuWrapper}>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="account-check-outline" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>Support</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="settings-outline" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>Settings</Text>
            </View>
          </TouchableRipple>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});
