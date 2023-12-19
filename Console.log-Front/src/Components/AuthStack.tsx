import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ScreenRoutes } from '../Enums/ScreenRoutes';
import Login from '../Screens/Login/Login';
import Registration from '../Screens/Registration/Registration';

const AuthStack: React.FC = () => {
  const Auth = createNativeStackNavigator();
  return (
    <Auth.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Auth.Screen name={ScreenRoutes.LOGIN} component={Login} />
      <Auth.Screen name={ScreenRoutes.REGISTRATION} component={Registration} />
    </Auth.Navigator>
  );
};

export default AuthStack;
