import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen.tsx';
import HomeScreen from '../screens/HomeScreen';
import EventDetailScreen from '../screens/EventDetailScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers/rootReducer';
import { RootStackParamList } from './types';
import { restoreUser } from '../redux/actions/authActions.ts';
import { useAppDispatch } from '../redux/hooks.ts';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      await dispatch(restoreUser());
      setIsLoading(false);
    };
    initAuth();
  }, [dispatch]);

  if (isLoading) {
    return <SplashScreen/>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Signup" component={SignupScreen}/>
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="EventDetail" component={EventDetailScreen}/>
            <Stack.Screen name="Profile" component={ProfileScreen}/>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
