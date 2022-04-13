import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {launchImageLibrary} from 'react-native-image-picker';
import {Picker} from '@react-native-community/picker';
import {baseUrl, imgUrl} from '../../api/url';
import {useNavigation} from '@react-navigation/native';

const EditProductScreen = ({route}) => {
  const itemData = route.params.itemData;
  console.log('object - ', itemData);
  const navigation = useNavigation();

  const [productDetail, setProductDetail] = useState({
    photo: null,
    title: '',
    description: '',
    category: null,
    price: null,
    photoUri: '',
  });

  useEffect(() => {
    setProductDetail({
      ...productDetail,
      title: itemData.title,
      price: '' + itemData.price,
      description: itemData.description,
      photoUri: itemData.photo,
      //   photo: itemData.photo,
      category: itemData.category,
    });
  }, []);

  console.log('product detail - ', productDetail);

  let icon = '\u20B9';
  const chooseImage = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        console.log('success');
        console.log('kdslghs - ', response);
        console.log('response - ', response.assets[0].uri);
        const uri = response.assets[0].uri;
        const photo = response.assets[0];
        setProductDetail({...productDetail, photo: photo, photoUri: uri});
      }
    });
  };

  const updateProduct = async productId => {
    const {title, description, photo, category, price} = productDetail;
    console.log('productId', productId);

    if (
      title != '' &&
      description != '' &&
      price != '' &&
      category != 'Select Category'
    ) {
      let formData = new FormData();
      //   console.log('photo name - ', photo.fileName);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('price', price);
      if (photo != null) {
        formData.append('photo', {
          name: photo.fileName,
          type: photo.type,
          uri: photo.uri,
        });
      }

      console.log('formData - ', formData);

      await fetch(`${baseUrl}/admin/updateProduct/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      })
        .then(response => response.json())
        .then(response => {
          console.log('asd - ', response);
          if (response.err) {
            return Alert.alert(response.err);
          }
          navigation.navigate('AdminOrderScreen');
        })
        .catch(err => {
          console.log(err);
          return Alert.alert('Something went wrong');
        });
    } else {
      return Alert.alert('Please enter all the field');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{flex: 1}}>
        <View style={{marginHorizontal: '4%', marginTop: '4%'}}>
          {/* image picker */}
          <View>
            <View>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    width: 100,
                    height: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                    borderColor: '#78909c',
                  }}
                  onPress={chooseImage}>
                  <Icon name="ios-camera" size={30} />
                </TouchableOpacity>
                {productDetail.photoUri != null ? (
                  <View style={{marginLeft: 2}}>
                    <Image
                      source={{
                        uri:
                          productDetail.photo == null
                            ? `${imgUrl}/${productDetail.photoUri}`
                            : productDetail.photoUri,
                      }}
                      style={{height: 100, width: 100, borderRadius: 10}}
                    />
                  </View>
                ) : (
                  <View />
                )}
              </View>
              <Text style={{color: '#78909c', marginTop: 2}}>
                Add product image
              </Text>
            </View>
          </View>
          {/* product detail form */}
          <View style={{marginTop: 20}}>
            <View style={{marginTop: 10}}>
              <TextInput
                placeholder="Product Title"
                placeholderTextColor="#78909c"
                style={{borderBottomWidth: 1, padding: 0, color: '#000'}}
                value={productDetail.title}
                onChangeText={value => {
                  setProductDetail({...productDetail, title: value});
                }}
              />
            </View>
            <View style={{marginTop: 30}}>
              <Picker
                selectedValue={productDetail.category}
                style={styles.pickerStyle}
                onValueChange={value => {
                  console.log('value - ', value);
                  setProductDetail({
                    ...productDetail,
                    category: value,
                  });
                }}>
                <Picker.Item label="Select Category" />
                <Picker.Item label="Lunch" value={0} key={0} />
                <Picker.Item label="Cold-Drinks" value={1} key={1} />
                <Picker.Item label="Snacks" value={2} key={2} />
              </Picker>
            </View>
            <View style={{marginTop: 30, flexDirection: 'row'}}>
              <TextInput
                placeholder={`${icon} Price`}
                placeholderTextColor="#78909c"
                style={{
                  borderBottomWidth: 1,
                  padding: 0,
                  color: '#000',
                  flex: 1,
                  marginRight: 30,
                }}
                value={productDetail.price}
                onChangeText={value => {
                  setProductDetail({...productDetail, price: value});
                }}
              />
            </View>

            <View style={{marginTop: 30}}>
              <TextInput
                placeholder="Product Details"
                placeholderTextColor="#78909c"
                style={{
                  borderBottomWidth: 1,
                  padding: 0,
                  color: '#000',
                  flex: 1,
                }}
                value={productDetail.description}
                onChangeText={value => {
                  setProductDetail({...productDetail, description: value});
                }}
              />
            </View>
            <View
              style={{marginTop: 30, alignItems: 'center', marginBottom: 30}}>
              <TouchableOpacity
                onPress={() => updateProduct(itemData._id)}
                style={{
                  backgroundColor: '#FF6347',
                  width: '50%',
                  padding: 10,
                  borderRadius: 20,
                }}>
                <Text
                  style={{color: '#ffffff', fontSize: 20, textAlign: 'center'}}>
                  Update Product
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#1976d2',
    height: '8%',
    justifyContent: 'center',
  },
  pickerStyle: {
    width: '100%',
    height: 20,
    color: '#78909c',
    fontSize: 14,
  },
});
