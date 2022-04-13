import React from 'react';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from 'react-native-paper';

import AdminHomeScreen from './AdminHomeScreen';
import AdminOrderScreen from './AdminOrderScreen';
import ProductDetailScreen from './ProductDetailScreen';
import EditProductScreen from './EditProductScreen';
import AddProductScreen from './AddProductScreen';

const HomeStack = createStackNavigator();
const OrderStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const AdminTabScreen = () => (
  <Tab.Navigator
    initialRouteName="Home"
    activeColor="#fff"
    barStyle={{backgroundColor: '#FF6347'}}
    inactiveColor="#000">
    <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarColor: '#FF6347',
        tabBarIcon: ({color}) => (
          <Icon name="ios-home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="OrderScreen"
      component={OrderStackScreen}
      options={{
        tabBarLabel: 'Items',
        tabBarColor: '#FF6347',
        tabBarIcon: ({color}) => (
          <Icon name="ios-menu" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileStackScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarColor: '#FF6347',
        tabBarIcon: ({color}) => (
          <Icon name="ios-person" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default AdminTabScreen;

const HomeStackScreen = ({navigation}) => {
  const {colors} = useTheme();

  return (
    <OrderStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FF6347',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <OrderStack.Screen
        name="AdminHomeScreen"
        component={AdminHomeScreen}
        options={{
          title: 'SCET CANTEEN',
          // headerLeft: () => (
          //   <Icon.Button
          //     name="ios-menu"
          //     size={25}
          //     backgroundColor="#1f65ff"
          //     onPress={() => navigation.openDrawer()}
          //   />
          // ),
        }}
      />
      <OrderStack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
        options={({route}) => ({
          // title: route.params.title,
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff',
        })}
      />
      <OrderStack.Screen
        name="EditProductScreen"
        component={EditProductScreen}
        options={{
          title: 'SCET CANTEEN',
        }}
      />
      <OrderStack.Screen
        name="AddProductScreen"
        component={AddProductScreen}
        options={{
          title: 'SCET CANTEEN',
        }}
      />
    </OrderStack.Navigator>
  );
};

const OrderStackScreen = ({navigation}) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#FF6347',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <HomeStack.Screen
      name="AdminOrderScreen"
      component={AdminOrderScreen}
      options={{
        title: 'SCET CANTEEN',
        // headerLeft: () => (
        //   <Icon.Button
        //     name="ios-menu"
        //     size={25}
        //     backgroundColor="#1f65ff"
        //     onPress={() => navigation.openDrawer()}
        //   />
        // ),
      }}
    />
  </HomeStack.Navigator>
);

const ProfileStackScreen = ({navigation}) => (
  <ProfileStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#FF6347',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <ProfileStack.Screen
      name="AdminHomeScreen"
      component={AdminHomeScreen}
      options={{
        title: 'SCET CANTEEN',
        // headerLeft: () => (
        //   <Icon.Button
        //     name="ios-menu"
        //     size={25}
        //     backgroundColor="#1f65ff"
        //     onPress={() => navigation.openDrawer()}
        //   />
        // ),
      }}
    />
  </ProfileStack.Navigator>
);
