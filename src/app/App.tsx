import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import OnboardingScreen from '../screens/OnboardingScreen';
import AnimeListScreen from '../screens/AnimeListScreen';
import AnimeDetailsScreen from '../screens/AnimeDetailsScreen';
import {RootStackParamList} from '../types';

const Stack = createStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding">
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen
          name="List"
          component={AnimeListScreen}
          options={{title: 'Anime List'}}
        />
        <Stack.Screen
          name="Details"
          component={AnimeDetailsScreen}
          options={{title: 'Details'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
