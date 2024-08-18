import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/rootTypes';

type SplashScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Splash'>;
};

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Home');
    }, 2000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Social App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6200ea'
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20
  },
  title: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold'
  }
});

export default SplashScreen;
