import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer} from "@react-navigation/native";
import {Colors} from "./shared/constants/color.ts";
import {
  Edit_screen,
  Edit_selection_screen,
  Home_Screen, Login_screen,
  Notifications_screen, Register_screen,
  Wiki_Screen,
} from "./screens";

const Stack = createNativeStackNavigator();

function RootNavigator(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {backgroundColor: Colors.gray010},
        }}
        initialRouteName={'Auth/Register'}
      >
        <Stack.Group>
          <Stack.Screen name='Auth/Register' component={Register_screen}/>
          <Stack.Screen name='Auth/Login' component={Login_screen}/>
        </Stack.Group>
        <Stack.Screen name="Home" component={Home_Screen}/>
        <Stack.Screen name={'Notifications'} component={Notifications_screen}/>
        <Stack.Screen name={'Wiki'} component={Wiki_Screen}/>
        <Stack.Group>
          <Stack.Screen name={'Edit/Selection'} component={Edit_selection_screen}/>
          <Stack.Screen name={'Edit'} component={Edit_screen}/>
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
