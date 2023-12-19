import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import React, { useContext } from "react";
import AuthUserContext from "../Contexts/AuthUserContext/context";

const AppDrawerContent: React.FC = (props) => {
  const { logout } = useContext(AuthUserContext);
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Log out"
        onPress={() => {
          logout();
        }}
        inactiveTintColor="#FFFFFF"
        style={{ flex: 1, justifyContent: "flex-end" }}
      />
    </DrawerContentScrollView>
  );
};

export default AppDrawerContent;
