/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';

import {DrawerContent} from './screens/DrawerContent';

import MainTabScreen from './screens/MainTabScreen';
import SupportScreen from './screens/SupportScreen';
import SettingsScreen from './screens/SettingsScreen';
import BookmarkScreen from './screens/BookmarkScreen';

import {AuthContext} from './components/context';

import RootStackScreen from './screens/RootStackScreen';

import AsyncStorage from '@react-native-community/async-storage';
import AdminTabScreen from './screens/admin/AdminTabScreen';
import CartScreen from './screens/CartScreen';

const Drawer = createDrawerNavigator();

const App = () => {
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState(null);

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
    userId: null,
    role: null,
  };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333',
    },
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff',
    },
  };

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          role: action.role,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.username,
          userToken: action.token,
          userId: action.id,
          isLoading: false,
          role: action.role,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          userId: null,
          role: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.username,
          userToken: action.token,
          userId: action.id,
          isLoading: false,
          role: action.role,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async foundUser => {
        console.log('object - ', foundUser.id);
        // setUserToken('fgkj');
        // setIsLoading(false);
        const userToken = foundUser.token;
        const userName = foundUser.username;
        const userId = foundUser.id;
        const role = foundUser.role;

        try {
          await AsyncStorage.setItem('userToken', userToken);
          await AsyncStorage.setItem('userId', userId);
          await AsyncStorage.setItem('role', role.toString());
        } catch (e) {
          console.log(e);
        }
        // console.log('user token: ', userToken);
        dispatch({
          type: 'LOGIN',
          id: userId,
          username: userName,
          token: userToken,
          role: role,
        });
      },
      signOut: async () => {
        // setUserToken(null);
        // setIsLoading(false);
        try {
          await AsyncStorage.removeItem('userToken');
          await AsyncStorage.removeItem('userId');
          await AsyncStorage.removeItem('role');
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGOUT'});
      },
      // signUp: () => {
      //   // setUserToken('fgkj');
      //   // setIsLoading(false);
      // },
      toggleTheme: () => {
        setIsDarkTheme(isDarkTheme => !isDarkTheme);
      },
    }),
    [],
  );

  useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);
      let userToken;
      let role;
      userToken = null;
      role = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
        role = await AsyncStorage.getItem('role');
        console.log('usertoken - ', userToken);
        console.log('role - ', role);
      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken, role: role});
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer theme={theme}>
          {loginState.userToken !== null && loginState.role == 0 ? (
            <Drawer.Navigator
              drawerContent={props => <DrawerContent {...props} />}>
              <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
              <Drawer.Screen name="SupportScreen" component={SupportScreen} />
              <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
              <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} />
              <Drawer.Screen name="CartScreen" component={CartScreen} />
            </Drawer.Navigator>
          ) : loginState.userToken !== null && loginState.role == 1 ? (
            <AdminTabScreen />
          ) : (
            // <Drawer.Navigator
            //   drawerContent={props => <DrawerContent {...props} />}>
            //   <Drawer.Screen
            //     name="AdminHomeDrawer"
            //     component={AdminTabScreen}
            //   />
            // {/* <Drawer.Screen name="SupportScreen" component={SupportScreen} /> */}
            // {/* <Drawer.Screen name="SettingsScreen" component={SettingsScreen} /> */}
            // {/* <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} /> */}
            // </Drawer.Navigator>
            <RootStackScreen />
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );
};

export default App;
