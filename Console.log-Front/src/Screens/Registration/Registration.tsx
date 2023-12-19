/* eslint-disable global-require */
import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useContext } from "react";
import {
  Avatar,
  Button,
  IconButton,
  RadioButton,
  TextInput,
} from "react-native-paper";
import api from "../../Service/api";
import { IStoreUser } from "../../Interfaces/store-users.interface";
import AuthUserContext from "../../Contexts/AuthUserContext/context";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});

const Registration: React.FC = () => {
  const { setActiveUser } = useContext(AuthUserContext);
  const navigation = useNavigation();

  const [userName, setUsername] = React.useState("");
  const [userPassword, setPassword] = React.useState("");
  const [userEmail, setEmail] = React.useState("");
  const [userRegistration, setRegistration] = React.useState("");
  const [userType, setUserType] = React.useState("S");
  const [userProfilePicture, setUserProfilePicture] = React.useState<any>("");

  const handleStore = async () => {
    const storeData: IStoreUser = {
      nm_user: userName,
      email: userEmail,
      registration: userRegistration,
      type: userType,
      password: userPassword,
      profile_picture: userProfilePicture,
    };

    await api
      .post("/users", storeData)
      .then((response) => {
        console.log(response.data);
        setActiveUser(response.data);
      })
      .catch((error) => {
        console.log(error.message);
        alert("Erro ao registrar usuário.");
      });
  };

  const handleUploadProfilePicture = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        base64: true,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setUserProfilePicture(result.base64);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Avatar.Image
          style={{ marginTop: 64, marginBottom: 20 }}
          size={92}
          source={
            userProfilePicture
              ? { uri: `data:image/jpg;base64,${userProfilePicture}` }
              : require("../../Assets/no-profile-photo.jpg")
          }
        />
        <IconButton
          icon="plus"
          style={{
            backgroundColor: "#E4B423",
            width: 33,
            height: 33,

            position: "absolute",
            marginTop: 127,
            marginLeft: 55,
          }}
          color="#FFFFFF"
          size={20}
          onPress={handleUploadProfilePicture}
        />
      </View>
      <TextInput
        mode="flat"
        activeUnderlineColor="#2F72BC"
        placeholder="Digite seu nome"
        label="Nome"
        style={{ width: 328, height: 54, marginBottom: 24 }}
        onChangeText={(newValue) => {
          setUsername(newValue);
        }}
      />
      <TextInput
        mode="flat"
        activeUnderlineColor="#2F72BC"
        placeholder="Digite seu e-mail"
        label="E-mail"
        style={{ width: 328, height: 54, marginBottom: 24 }}
        onChangeText={(newValue) => {
          setEmail(newValue);
        }}
      />
      <TextInput
        secureTextEntry
        mode="flat"
        activeUnderlineColor="#2F72BC"
        placeholder="Digite a senha desejada"
        label="Senha"
        style={{ width: 328, height: 54 }}
        onChangeText={(newValue) => {
          setPassword(newValue);
        }}
      />
      <View style={{ marginTop: 13.5, width: 328 }}>
        <View style={{ alignSelf: "flex-start" }}>
          <Text>Você é?...</Text>
        </View>
        <RadioButton.Group
          onValueChange={(newValue) => setUserType(newValue)}
          value={userType}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RadioButton.Item color="#2F72BC" label="PROFESSOR" value="T" />
            <RadioButton.Item color="#2F72BC" label="ALUNO" value="S" />
          </View>
        </RadioButton.Group>
      </View>
      <TextInput
        mode="flat"
        activeUnderlineColor="#2F72BC"
        placeholder="Digite seu número de matrícula"
        keyboardType="phone-pad"
        label="Número de Matrícula"
        style={{ width: 328, height: 54, marginBottom: 24 }}
        onChangeText={(newValue) => {
          setRegistration(newValue);
        }}
      />
      <Button
        style={{ width: 145, height: 35 }}
        mode="contained"
        color="#2F72BC"
        onPress={() => {
          handleStore();
        }}
      >
        <Text style={{ color: "#FFFFFF" }}>Criar conta</Text>
      </Button>
    </ScrollView>
  );
};

export default Registration;
