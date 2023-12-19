import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext } from "react";
import AuthUserContext from "../Contexts/AuthUserContext/context";
import AuthStack from "./AuthStack";
import DrawerStack from "./DrawerStack";

const Routes: React.FC = () => {
  const RootStack = createNativeStackNavigator();
  const { user: userLoggedIn } = useContext(AuthUserContext);
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {!userLoggedIn ? (
        <RootStack.Screen name="Auth" component={AuthStack} />
      ) : (
        <RootStack.Screen name="App" component={DrawerStack} />
      )}
    </RootStack.Navigator>
  );
};

export default Routes;
