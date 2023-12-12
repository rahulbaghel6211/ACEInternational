// MainTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ViewScreen from '../Screens/View';
import AddNewScreen from '../Screens/AddNewScreen';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="View"
        component={ViewScreen}
        options={{ headerShown: false }} // Hide header for this screen
      />
      <Tab.Screen
        name="Add New"
        component={AddNewScreen}
        options={{ headerShown: false }} // Hide header for this screen
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
