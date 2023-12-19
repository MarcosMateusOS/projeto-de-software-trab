import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import AuthUserContext from "../../Contexts/AuthUserContext/context";
import { ScreenRoutes } from "../../Enums/ScreenRoutes";
import { NavigationScreenProp } from "react-navigation";
import api from "../../Service/api";
const gold = require("../../Assets/gold.svg");
const silver = require("../../Assets/silver.svg");
const bronze = require("../../Assets/bronze.svg");
const emoji = require("../../Assets/emoji.svg");

type RootParamList = {
  Home: undefined;
  BlurredSuccess: { blurredSuccessCallback: () => void };
};

type BlurredSuccessRouteProp = RouteProp<RootParamList, "BlurredSuccess">;
type BlurredSuccessNavigationProp = NavigationScreenProp<
  RootParamList,
  "BlurredSuccess"
>;

type Props = {
  navigation: BlurredSuccessNavigationProp;
  route: any;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Ranking: React.FC = ({ route, navigation }: Props) => {
  const { user } = useContext(AuthUserContext);
  const [rankingID, setRanking] = useState("");
  const [rankings, setRankings] = useState<any>([]);
  const [rankingNm, setRankingNm] = useState<any>([]);
  const image =
    user?.type === "S"
      ? require("../../Assets/aluno.png")
      : require("../../Assets/professor.jpg");

  useEffect(() => {
    if (route.params) {
      const { params } = route.params;
      setRanking(params.id_ranking);
      load(params.id_ranking);
    }
  }, []);

  async function load(id: string) {
    await api.get(`/ranking/${id}`, { params: { id: id } }).then((response) => {
      console.log("DEU BOM aaaa");
      setRankings(response.data);
      setRankingNm(response.data[0].quiz.title);
    });
  }

  return (
    <View style={styles.containerPrincipal}>
      <View style={styles.containerInfoCurso}>
        <Text style={styles.textInfoCurso}>{rankingNm}</Text>
      </View>
      <FlatList
        style={styles.containerRanking}
        data={rankings}
        renderItem={({ item, index }) => (
          <View style={styles.containerBoxPlace}>
            <View style={styles.containerMedal}>
              {index == 0 && <Image style={styles.medal} source={gold} />}
              {index == 1 && <Image style={styles.medal} source={silver} />}
              {index == 2 && <Image style={styles.medal} source={bronze} />}
              {index > 2 && <Image style={styles.medal} source={emoji} />}
            </View>
            <View style={styles.containerPlace}>
              <Text style={styles.textPlace}>
                {item.user}: {item.points} pontos
              </Text>
            </View>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.buttonBack}
        onPress={() => {
          navigation.navigate(ScreenRoutes.HOME as never);
        }}
      >
        <Text style={styles.textBack}>VOLTAR AO INÍCIO</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  containerInfoCurso: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFBC2B",
    width: "90%",
    height: "11%",
    borderRadius: 37,
    marginTop: 20,
    marginBottom: -15,
  },
  containerRanking: {
    backgroundColor: "#fff",
    width: "100%",
    marginTop: 20,
    marginBottom: 80,
  },
  medal: {
    width: 40,
    height: 35,
  },
  containerBoxPlace: {
    flexDirection: "column",
    marginBottom: 25,
    width: "100%",
    height: "70%",
  },
  containerMedal: {
    marginTop: 30,
    marginBottom: 20,
    marginLeft: 25,
    width: "80%",
    height: "78%",
    backgroundColor: "#DFDFDF",
    borderRadius: 40,
    justifyContent: "center",
    paddingLeft: 6,
  },
  containerPlace: {
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    height: "90%",
    backgroundColor: "#2F72BC",
    borderRadius: 40,
    marginTop: 25,
    marginBottom: 20,
    marginLeft: 70,
    position: "absolute",
  },
  containerBotton: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  buttonBack: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2F72BC",
    width: "45%",
    height: "5%",
    marginBottom: 40,
    borderRadius: 5,
  },
  textInfoCurso: {
    fontSize: 20,
  },
  textPlace: {
    fontSize: 20,
    color: "#fff",
  },
  textBack: {
    fontSize: 15,
    color: "#fff",
  },
});

export default Ranking;
