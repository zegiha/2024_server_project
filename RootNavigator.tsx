import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer} from "@react-navigation/native";
import {Colors} from "./shared/constants/color.ts";
import {
  Edit_screen,
  Home_Screen,
  Notifications_screen,
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
        initialRouteName={'Home'}
      >
        <Stack.Screen name="Home" component={Home_Screen}/>
        <Stack.Screen name={'Notifications'} component={Notifications_screen}/>
        <Stack.Screen name={'Wiki'} component={Wiki_Screen}/>
        <Stack.Group>
          <Stack.Screen name={'edit'} component={Edit_screen}/>
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
