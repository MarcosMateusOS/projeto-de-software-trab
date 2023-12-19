import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { useContext } from "react";
import { Avatar, IconButton } from "react-native-paper";
import { ScreenRoutes } from "../Enums/ScreenRoutes";
import Home from "../Screens/Home/Home";
import Profile from "../Screens/Profile/Profile";
import NewQuiz from "../Screens/NewQuiz/NewQuiz";
import AnswerQuiz from "../Screens/AnswerQuiz/AnswerQuiz";
import AppDrawerContent from "./AppDrawerContent";
import { useNavigation } from "@react-navigation/native";
import AuthUserContext from "../Contexts/AuthUserContext/context";
import Ranking from "../Screens/Ranking/Ranking";

const DrawerStack: React.FC = () => {
  const Drawer = createDrawerNavigator();
  const navigation = useNavigation();
  const { user } = useContext(AuthUserContext);
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: "#2F72BC" },
        headerTintColor: "#FFFFFF",
        drawerStyle: { backgroundColor: "#2F72BC" },
        drawerActiveTintColor: "#FFFFFF",
        drawerInactiveTintColor: "#a8a8a8",
        headerRight: () => (
          <IconButton
            style={{ borderWidth: 2, borderColor: "#FFFFFF", marginRight: 16 }}
            icon={() => {
              const image = user?.profile_picture
                ? {
                    uri: `data:image/jpg;base64,${Buffer.from(
                      user?.profile_picture,
                      "base64"
                    ).toString()}`,
                  }
                : require("../Assets/no-profile-photo.jpg");
              return <Avatar.Image size={32} source={image} />;
            }}
            size={22}
            onPress={() => navigation.navigate(ScreenRoutes.PROFILE as never)}
          />
        ),
      }}
      drawerContent={(props) => <AppDrawerContent {...props} />}
    >
      <Drawer.Screen name={ScreenRoutes.HOME} component={Home} />
      <Drawer.Screen
        name={ScreenRoutes.PROFILE}
        component={Profile}
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />
      <Drawer.Screen
        name={ScreenRoutes.NEWQUIZ}
        component={NewQuiz}
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />
      <Drawer.Screen
        name={ScreenRoutes.RANKING}
        component={Ranking}
        initialParams={{ id_ranking: null }}
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />
      <Drawer.Screen
        name={ScreenRoutes.ANSWERQUIZ}
        component={AnswerQuiz}
        initialParams={{ quizData: {} }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerStack;
