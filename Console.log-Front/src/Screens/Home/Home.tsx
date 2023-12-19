import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";

import React, { useContext, useState, useEffect } from "react";
import api from "../../Service/api";
import { Icon } from "react-native-paper/lib/typescript/components/Avatar/Avatar";
import { Button, IconButton, Appbar, Searchbar } from "react-native-paper";

import AuthUserContext from "../../Contexts/AuthUserContext/context";
import { ScreenRoutes } from "../../Enums/ScreenRoutes";

import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    alignItems: "center",
  },
  flatList: {
    flex: 1,
    backgroundColor: "#ffff",
    alignItems: "center",
  },
  flatListContent: {
    flex: 1,
    width: "100%",
    backgroundColor: "#ffffffa2",
    flexDirection: "row",
    alignItems: "center",
  },
  text1: {
    margin: 30,
    fontSize: 15,
  },
  text2: {
    marginBottom: 10,
    fontSize: 18,
    marginLeft: 10,
  },
  bottom: {
    backgroundColor: "#2F72BC",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
});

const Home: React.FC = ({ route, navigation }) => {
  const { user } = useContext(AuthUserContext);

  const [subject, setSubject] = useState("");
  const [subjects, setSubjects] = useState<any>([]);
  const [subjectsToShow, setSubjectsToShow] = useState<any>([]);
  const [quiz, setQuiz] = useState<any>([]);
  const [quizToShow, setQuizToShow] = useState<any>([]);
  const [showSubjects, setShowSubjects] = useState<boolean>(true);
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [filtroDisciplinas, setFiltroDisciplinas] = useState("");
  const [filtroQuizes, setFiltroQuizes] = useState("");

  const saveQuiz = async (quizId: any) => {
    await api
      .post(`/save/${user?.id}`, { id_quiz: quizId })
      .then((response) => {
        setSubjects(response.data);
        setSubjectsToShow(response.data);
      });
  };

  async function loadSUbjects() {
    await api.get("/subjects").then((response) => {
      setSubjects(response.data);
      setSubjectsToShow(response.data);
    });
  }

  async function loadQuiz(_id_subject: string) {
    await api
      .get("/quiz", { params: { subject: _id_subject } })
      .then((response) => {
        setQuiz(response.data);
        setQuizToShow(response.data);
      });
  }

  useEffect(() => {
    loadSUbjects();
  }, []);

  const onChangeSearchDisciplina = (value: any) => {
    setFiltroDisciplinas(value);
    if (value) {
      const disciplinasFiltradas = subjects.filter((e: any) => {
        return e.nm_subject.includes(value);
      });
      setSubjectsToShow(disciplinasFiltradas);
    } else {
      setSubjectsToShow(subjects);
    }
  };

  const onChangeSearchQuiz = (value: any) => {
    setFiltroQuizes(value);
    if (value) {
      const quizesFiltrados = quiz.filter((e: any) => {
        return e.title.includes(value);
      });
      setQuizToShow(quizesFiltrados);
    } else {
      setQuizToShow(quiz);
    }
  };

  return (
    <View style={styles.container}>
      {user?.type == "T" && showQuiz && <Appbar style={styles.bottom}></Appbar>}
      {showSubjects && (
        <Text style={styles.text1}>Selecione uma disciplina:</Text>
      )}
      {showQuiz && (
        <Text style={styles.text1}>Selecione um Quiz de {subject}:</Text>
      )}

      {showSubjects && (
        <>
          <Searchbar
            placeholder="Busque uma disciplina"
            onChangeText={onChangeSearchDisciplina}
            value={filtroDisciplinas}
          />
          <FlatList
            style={{ width: "100%" }}
            data={subjectsToShow}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  margin: 5,
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "center",
                  borderBottomWidth: 1,
                }}
                onPress={() => {
                  setShowSubjects(false);
                  setShowQuiz(true);
                  setSubject(item.nm_subject);
                  loadQuiz(item._id);
                }}
              >
                {
                  <Image
                    style={{ width: 50, height: 50, margin: 10 }}
                    source={require("../../Assets/logo_ufjf.jpg")}
                  />
                }
                <View style={styles.flatListContent}>
                  <Text style={styles.text2}>{item.nm_subject}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </>
      )}
      {showQuiz && (
        <>
          <Searchbar
            placeholder="Busque um quiz"
            onChangeText={onChangeSearchQuiz}
            value={filtroQuizes}
          />
          <FlatList
            style={{ width: "100%" }}
            data={quizToShow}
            ListEmptyComponent={
              <Text style={{ alignSelf: "center", fontSize: 18, color: "red" }}>
                Ainda não possui nenhum Quiz para essa disciplina
              </Text>
            }
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  margin: 5,
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "center",
                  borderBottomWidth: 1,
                }}
                onPress={() => {
                  console.log("item: ", item);
                  navigation.navigate(ScreenRoutes.ANSWERQUIZ as never, {
                    quizData: item,
                  });

                  setShowSubjects(false);
                }}
              >
                {
                  <Image
                    style={{ width: 50, height: 50, margin: 10 }}
                    source={require("../../Assets/logo_ufjf.jpg")}
                  />
                }
                <View style={styles.flatListContent}>
                  <Text style={styles.text2}>{item.title}</Text>
                </View>

                <IconButton
                  icon="trophy"
                  size={45}
                  color="#E4B423"
                  onPress={() => {
                    navigation.navigate("Ranking", {
                      params: { id_ranking: item._id },
                    });
                  }}
                />
                <IconButton
                  icon="bookmark-outline"
                  size={30}
                  onPress={() => saveQuiz(item._id)}
                />
              </TouchableOpacity>
            )}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "0.75rem",
            }}
          >
            <IconButton
              icon="arrow-left-circle"
              size={45}
              color="#E4B423"
              onPress={() => {
                setShowSubjects(true);
                setShowQuiz(false);
                setQuiz([]);
              }}
            />
            {user?.type == "T" && (
              <IconButton
                icon="plus-circle"
                size={45}
                color="#E4B423"
                onPress={() =>
                  navigation.navigate(ScreenRoutes.NEWQUIZ as never)
                }
              />
            )}
          </View>
          {/* () => navigation.navigate(ScreenRoutes.NEWQUIZ as never) */}
        </>
      )}
    </View>
  );
};

export default Home;
