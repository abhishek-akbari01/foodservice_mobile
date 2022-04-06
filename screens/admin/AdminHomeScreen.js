import {View, Text} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AuthContext} from '../../components/context';

const AdminHomeScreen = () => {
  const {signOut} = React.useContext(AuthContext);

  return (
    <View>
      <Text>AdminHomeScreen</Text>
      <TouchableOpacity onPress={() => signOut()}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AdminHomeScreen;
