import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ContactsScr from "../screens/Contacts";
import ContactDetail from "../screens/ContactDetail";
import RoomScreen from "../screens/ChatScreen";
import Recording from "../screens/Recording";
import Paring from "../screens/ParingScreen";


const Stack = createStackNavigator();

function AppHome() {
  return (

    <Stack.Navigator>
      <Stack.Screen name="Contacts" component={ContactsScr}  />
      <Stack.Screen name="ContactDetail" component={ContactDetail}  />
      <Stack.Screen name="RoomScreen" component={RoomScreen}  />
      <Stack.Screen name="Recording" component={Recording}  />
      <Stack.Screen name="Paring" component={Paring}  />
    </Stack.Navigator>
  );
}

export default AppHome;