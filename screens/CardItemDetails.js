import React, {useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  StatusBar,
  Platform,
  Alert,
} from 'react-native';
import HeaderImageScrollView, {
  TriggeringView,
} from 'react-native-image-header-scroll-view';

import * as Animatable from 'react-native-animatable';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {baseUrl, imgUrl} from '../api/url';
import AsyncStorage from '@react-native-community/async-storage';

const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 55;
const MAX_HEIGHT = 350;

const CardItemDetails = ({route}) => {
  const itemData = route.params.itemData;
  const navTitleView = useRef(null);

  const navigation = useNavigation();

  const addCart = async itemId => {
    const userId = await AsyncStorage.getItem('userId');
    console.log('item id - ', itemId);
    console.log('user id - ', userId);

    await fetch(`${baseUrl}/addToCart/${userId}/${itemId}`, {method: 'PUT'})
      .then(res => res.json())
      .then(res => {
        if (res.err) return Alert.alert(res.err);
        // console.log(res);
        navigation.navigate('CartScreen', {itemData: itemId});
      })
      .catch(err => {
        return Alert.alert('Something went wrong in add to cart front');
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <HeaderImageScrollView
        maxHeight={MAX_HEIGHT}
        minHeight={MIN_HEIGHT}
        maxOverlayOpacity={0.6}
        minOverlayOpacity={0.3}
        renderHeader={() => (
          <Image
            source={{
              uri: `${imgUrl}/${itemData.photo}`,
            }}
            style={styles.image}
          />
        )}
        renderForeground={() => (
          <View style={styles.titleContainer}>
            <Text style={styles.imageTitle}>
              {itemData.title.toUpperCase()}
            </Text>
          </View>
        )}
        renderFixedForeground={() => (
          <Animatable.View style={styles.navTitleView} ref={navTitleView}>
            <Text style={styles.navTitle}>{itemData.title}</Text>
          </Animatable.View>
        )}>
        <TriggeringView
          style={styles.section}
          onHide={() => navTitleView.current.fadeInUp(200)}
          onDisplay={() => navTitleView.current.fadeOut(100)}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.title}>Overview</Text>
            <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
              {/* <FontAwesome name="star" size={16} color="#FF6347" /> */}
              <Text style={{marginHorizontal: 2}}>{itemData.price}</Text>
              <Text>RS</Text>
            </View>
          </View>
        </TriggeringView>
        <View style={[styles.section, styles.sectionLarge]}>
          <Text style={styles.sectionContent}>{itemData.description}</Text>
          <TouchableOpacity
            style={styles.addCart}
            onPress={() => {
              addCart(itemData._id);
            }}>
            <Text style={styles.addCartTxt}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </HeaderImageScrollView>
    </View>
  );
};

export default CardItemDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: MAX_HEIGHT,
    width: Dimensions.get('window').width,
    alignSelf: 'stretch',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 20,
  },
  name: {
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    backgroundColor: 'white',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionContent: {
    fontSize: 16,
    textAlign: 'justify',
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  categoryContainer: {
    flexDirection: 'row',
    backgroundColor: '#FF6347',
    borderRadius: 20,
    margin: 10,
    padding: 10,
    paddingHorizontal: 15,
  },
  category: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 10,
  },
  titleContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageTitle: {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 24,
  },
  navTitleView: {
    height: MIN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 40 : 5,
    opacity: 0,
  },
  navTitle: {
    color: 'white',
    fontSize: 18,
    backgroundColor: 'transparent',
  },
  sectionLarge: {
    minHeight: 300,
  },
  addCart: {
    backgroundColor: 'orange',
    padding: 5,
    borderRadius: 15,
    marginTop: 20,
  },
  addCartTxt: {
    color: '#fff',
    fontSize: 21,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
