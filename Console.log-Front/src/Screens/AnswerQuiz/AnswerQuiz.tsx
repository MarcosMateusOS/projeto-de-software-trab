import { useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";

import { useEffect } from "react";

var screenWidth = Dimensions.get("window").width;

function AnswerQuiz({ route, navigation }) {
  const { quizData } = route.params;
  const scrollRef = useRef(null);

  useRef(() => {
    scrollRef.current.scrollTo({ x: 0, y: 0 });
  }, [scrollRef]);

  function sideScroll(value) {
    scrollRef.current.scrollTo({
      x: value * screenWidth,
      y: 0,
      animated: true,
    });
  }

  const quizMocado = {
    _id: "62bdec277b18c45174c7aef3",
    title: "Quick Sort",
    subject: {
      nm_subject: "Estrutura de Dados 2",
    },
    questions: [
      {
        title: "teste",
        alternatives: [
          {
            title: "alternativa 1",
            is_correct: false,
          },
          {
            title: "alternativa 2",
            is_correct: false,
          },
          {
            title: "alternativa 3",
            is_correct: true,
          },
          {
            title: "alternativa 5",
            is_correct: false,
          },
          {
            title: "alteernativa 6",
            is_correct: false,
          },
        ],
      },
      {
        title: "pergunta 2",
        alternatives: [
          {
            title: "alt 1",
            is_correct: false,
          },
          {
            title: "2",
            is_correct: false,
          },
          {
            title: "3",
            is_correct: false,
          },
          {
            title: "4",
            is_correct: false,
          },
          {
            title: "5",
            is_correct: true,
          },
        ],
      },
      {
        title: "",
        alternatives: [
          {
            title: "",
            is_correct: false,
          },
          {
            title: "",
            is_correct: false,
          },
          {
            title: "",
            is_correct: false,
          },
          {
            title: "",
            is_correct: true,
          },
          {
            title: "",
            is_correct: false,
          },
        ],
      },
      {
        title: "",
        alternatives: [
          {
            title: "",
            is_correct: true,
          },
          {
            title: "",
            is_correct: false,
          },
          {
            title: "",
            is_correct: false,
          },
          {
            title: "",
            is_correct: false,
          },
          {
            title: "",
            is_correct: false,
          },
        ],
      },
      {
        title: "",
        alternatives: [
          {
            title: "",
            is_correct: false,
          },
          {
            title: "",
            is_correct: true,
          },
          {
            title: "",
            is_correct: false,
          },
          {
            title: "",
            is_correct: false,
          },
          {
            title: "",
            is_correct: false,
          },
        ],
      },
    ],
  };

  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    let tempAnswers = [];

    quizData.questions.forEach((item, index) => {
      let tempAnswer = { index: index, answer: "" };
      tempAnswers.push(tempAnswer);
    });

    setAnswers(tempAnswers);
  }, []);

  function compareAnswers() {
    console.log("ENTROU AQ");
    let tempScore = 0;

    quizData.questions.forEach((item, index) => {
      let tempCorrect = item.alternatives.findIndex((element) => {
        return element.is_correct === true;
      });

      if (answers[index].answer === tempCorrect) tempScore++;
    });

    console.log("pontuação: ", tempScore);

    setScore(tempScore);
  }

  return (
    <ScrollView
      style={styles.scrollContainer}
      horizontal={true}
      pagingEnabled={true}
      showsHorizontalScrollIndicator={false}
      scrollEnabled={false}
      ref={scrollRef}
    >
      {quizData?.questions.map((item, index, arr) => {
        return (
          <View style={styles.questionContainer} key={index}>
            <View>
              <Text style={{ margin: "1rem" }}>
                {index + 1 + ") "} {item.title}
              </Text>
              <View
                style={{
                  width: screenWidth,
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <View style={styles.questionInternalContainer}>
                  {item.alternatives.map((item2, index2) => {
                    // console.log("index2: ", index2);
                    return (
                      <TouchableOpacity
                        key={index2}
                        style={styles.questionAlternative}
                        onPress={() => {
                          let tempAnswers = [...answers];

                          tempAnswers[index].answer = index2;

                          setAnswers(tempAnswers);

                          if (index + 1 === arr.length) compareAnswers();
                          sideScroll(index + 1);
                        }}
                      >
                        <Text>
                          {String.fromCharCode(index2 + 65).toLowerCase() + ")"}{" "}
                          {item2.title}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                <View
                  style={{
                    width: screenWidth,
                    justifyContent: "space-around",
                    flexDirection: "row",
                  }}
                >
                  {index !== 0 && (
                    <TouchableOpacity
                      style={{
                        height: "2rem",
                        width: "2rem",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#E4B423",
                        borderRadius: "1rem",
                        margin: "1rem",
                      }}
                      onPress={() => sideScroll(index - 1)}
                    >
                      <Text style={{ color: "white", fontSize: "1.5rem" }}>
                        ←
                      </Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    style={{
                      height: "2rem",
                      width: "2rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#E4B423",
                      borderRadius: "1rem",
                      margin: "1rem",
                    }}
                    onPress={() => {
                      if (index + 1 === arr.length) compareAnswers();
                      sideScroll(index + 1);
                    }}
                  >
                    <Text style={{ color: "white", fontSize: "1.5rem" }}>
                      {index + 1 === arr.length ? "✓" : "→"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        );
      })}
      <View style={{ width: screenWidth, alignItems: "center" }}>
        <View
          style={{
            width: "80%",
            backgroundColor: "white",
            padding: "1rem",
            marginVertical: "10rem",
            borderRadius: 2,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: "1.5rem" }}>Quiz finalizado. </Text>
          <Text>Sua pontuação nessa tentativa foi: </Text>
          <Text style={{ fontSize: "4rem", color: "#2F72BC" }}>{score}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    width: screenWidth,
  },
  questionContainer: {
    width: screenWidth,
  },
  questionInternalContainer: {
    width: screenWidth - 30,
    height: "20rem",
    backgroundColor: "#D2D2D2",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    paddingVertical: "0.35rem",
  },
  questionAlternative: {
    height: "4rem",
    width: "90%",
    justifyContent: "center",
    padding: "0.5rem",
    marginVertical: "0.35rem",
    backgroundColor: "white",
    borderRadius: 5,
  },
  questionAlternativeMarked: {
    height: "4rem",
    width: "90%",
    justifyContent: "center",
    padding: "0.5rem",
    marginVertical: "0.35rem",
    backgroundColor: "green",
    borderRadius: 5,
  },
});

export default AnswerQuiz;
