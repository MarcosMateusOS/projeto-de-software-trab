import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthUserProvider from "./src/Contexts/AuthUserContext/provider";
import Routes from "./src/Components/Routes";

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <AuthUserProvider>
        <Routes />
      </AuthUserProvider>
    </NavigationContainer>
  );
};

export default App;
