import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types';
import {Screen} from '../enums';

type OnboardingScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, Screen.Onboarding>;
};

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Anime App!</Text>
      <Button
        title="Get Started"
        onPress={() => navigation.navigate(Screen.List)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default OnboardingScreen;
