import React from 'react';
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Main from "../pages/Main/Main";
import Completed from '../pages/Completed/Completed';
import Calendar from '../pages/Calendar/Calendar';
import Categories from '../pages/Categories/Categories';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const DefaultTheme = {
    "colors": {
      "secondaryContainer": "#588157",
    }
  }

const MainStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }} >
            <Stack.Screen name="Main" component={Main} initialParams={Main} />
            <Stack.Screen name="Completed" component={Completed} options={{
                headerShown: true,
                title: "Tamamlanan Görevler",
                headerTitleAlign: "center",
                headerTitleStyle: {
                    color: "black",
                    fontSize: 18
                }
            }} />
        </Stack.Navigator>
    )
}

function Router() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Tab.Navigator theme={DefaultTheme} barStyle={{ height: 68, backgroundColor: "white" }} activeColor='black' shifting={true} >
                    <Tab.Screen name="MainStack" component={MainStack} options={{
                        title: "Görevler",
                        tabBarIcon: () => (
                            <Icon name="library-outline" size={22} color={"black"} />
                        )
                    }} />
                    <Tab.Screen name="Completed" component={Calendar} options={{
                        title: "Tamamlananlar",
                        tabBarIcon: () => (
                            <Icon name="checkbox-outline" size={22} color={"black"} />
                        )
                    }} />
                    <Tab.Screen name="Calendar" component={Calendar} options={{
                        title: "Takvim",
                        tabBarIcon: () => (
                            <Icon name="calendar-outline" size={22} color={"black"} />
                        )
                    }} />
                    <Tab.Screen name="Categories" component={Categories} options={{
                        title: "Kategoriler",
                        tabBarIcon: () => (
                            <Icon name="grid-outline" size={22} color={"black"} />
                        )
                    }} />
                </Tab.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>

    )
};

export default Router;