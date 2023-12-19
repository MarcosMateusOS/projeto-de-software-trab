import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import React, { useContext, useState } from "react";
import AuthUserContext from "../../Contexts/AuthUserContext/context";
import { Switch } from "react-native-paper";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Profile: React.FC = ({ route, navigation }) => {
  const { user } = useContext(AuthUserContext);
  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(false);
  const image = user?.profile_picture
    ? {
        uri: `data:image/jpg;base64,${Buffer.from(
          user?.profile_picture,
          "base64"
        ).toString()}`,
      }
    : require("../../Assets/no-profile-photo.jpg");
  const medal = require("../../Assets/medal.svg");

  const medalhas = [
    "Top 1 - Estrutura de dados",
    "Top 1 - Teoria dos Grafos ",
    "Top 2 - Algoritmos",
    "Top 2 - Orientação a Objetos",
    "Top 3 - Lógica",
    "Top 3 - Lógica",
    "Top 3 - Lógica",
    "Top 3 - Lógica",
    "Top 3 - Lógica",
    "Top 3 - Lógica",
  ];

  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}></View>
      <View style={styles.containerImage}>
        <Image style={styles.image} source={image} />
        <Text style={styles.textoNome}>{user?.nm_user}</Text>
        {user?.type === "T" && <Text style={styles.textoTipo}>Professor</Text>}
        {user?.type === "S" && <Text style={styles.textoTipo}>Aluno</Text>}
        <View style={styles.containerInformation}>
          <View style={styles.containerInformationInside}>
            <Text style={styles.textoMdelha}>Medalhas</Text>
            <Switch
              value={isSwitchOn}
              onValueChange={onToggleSwitch}
              color={"#2F72BC"}
              style={{ alignSelf: "center", justifyContent: "center" }}
            />
            <Text style={styles.textoQuiz}>Quizes salvos</Text>
          </View>
          {!isSwitchOn && (
            <FlatList
              style={styles.containerMedalhas}
              data={medalhas}
              renderItem={({ item }) => (
                <View style={styles.conteinerContextMedalhas}>
                  <Image style={styles.medal} source={medal} />
                  <Text style={styles.textoInfoMedalha}>{item}</Text>
                </View>
              )}
            />
          )}
          {isSwitchOn && (
            <FlatList
              style={styles.containerMedalhas}
              data={medalhas}
              renderItem={({ item }) => (
                <View style={styles.conteinerContextMedalhas}>
                  <Image style={styles.medal} source={medal} />
                  <Text style={styles.textoInfoMedalha}>{item}</Text>
                </View>
              )}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  containerHeader: {
    flex: 0.3,
    width: "100%",
    backgroundColor: "#2F72BC",
    alignItems: "center",
  },
  containerImage: {
    margin: -130,
    width: 250,
    height: 250,
    backgroundColor: "#fff",
    alignItems: "center",
    borderRadius: 150,
    elevation: 10,
  },
  containerInformation: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: "150%",
    backgroundColor: "#2F72BC",
    flexDirection: "row",
    marginTop: 10,
    borderRadius: 30,
  },
  containerInformationInside: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    width: "99%",
    height: 47,
  },
  containerMedalhas: {
    marginTop: 360,
    backgroundColor: "#80BBE6",
    flex: 1,
    height: "580%",
    width: "100%",
    borderRadius: 30,
    position: "absolute",
    marginBottom: 10,
  },
  conteinerContextMedalhas: {
    flexDirection: "row",
    marginLeft: 20,
    backgroundColor: "#FFBC2B",
    width: "90%",
    height: 65,
    justifyContent: "center",
    alignItems: "center",
    margin: 7,
    borderRadius: 20,
  },
  image: {
    width: 240,
    height: 240,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 150,
    margin: 5,
  },
  medal: {
    width: 30,
    height: 30,
  },
  iconMedalhas: {
    marginRight: 20,
  },
  textoNome: {
    fontSize: 20,
    margin: 5,
  },
  textoTipo: {
    fontSize: 15,
  },
  textoMdelha: {
    marginLeft: 40,
    color: "#FFB200",
  },
  textoInfoMedalha: {
    fontSize: 20,
    marginLeft: 5,
  },
  textoQuiz: {
    marginRight: 20,
    color: "#2F72BC",
  },
});

export default Profile;
