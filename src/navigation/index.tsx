import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  HomeParamList,
} from '../models/navigation-params';
import NewsFeedScreen from "../components/screens/NewsFeedScreen"
import { navigationRef } from './RootNavigation';
const AppStack = createStackNavigator<HomeParamList>();

const navigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <AppStack.Navigator screenOptions={{ headerShown: false }}>
        <AppStack.Screen name="NewsFeedScreen" component={NewsFeedScreen} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default navigation;
