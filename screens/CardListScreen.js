import React, {useEffect, useState} from 'react';
import {View, Text, Button, FlatList, StyleSheet, Alert} from 'react-native';
// import {data} from '../model/data';
import Card from '../components/Card';
import {baseUrl} from '../api/url';

const CardListScreen = ({navigation, route}) => {
  const category = route.params.category;
  // console.log('category - ', category);

  const [data, setData] = useState();

  useEffect(() => {
    fetch(`${baseUrl}/getCatProduct/${category}`, {
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
  }, []);

  const renderItem = ({item}) => {
    return (
      <Card
        key={item._id}
        itemData={item}
        onPress={() => navigation.navigate('CardItemDetails', {itemData: item})}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default CardListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
  },
});
