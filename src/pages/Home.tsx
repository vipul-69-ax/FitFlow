import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { StyledView } from "../components/styled";
import HomeExerciseCard from "../components/HomeExercise";
import useExerciseStore from "../store/exerciseStore";
import {
  DateInfo,
  DaysNavigationProp,
  Exercise,
  ExerciseStore,
  SearchNavigationProp,
} from "../ts";
import FadeLetter from "../components/FadingTextAnim";
import { getDateInfo } from "../utils/helpers";
import { YStaggerText } from "../components/YStaggerText";

export default function Home() {
  const { navigate } = useNavigation<DaysNavigationProp>();
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const DATE: DateInfo = getDateInfo();

  const { exercises, completeExercise, removeExercise } =
    useExerciseStore() as ExerciseStore;

  const parsedExercises = exercises
    .map((i: string) => {
      const e: Exercise = JSON.parse(i);
      if (e.day == DATE.dayName) return e;
      return;
    })
    .filter((i) => i);

  const sheetValue = useSharedValue(500);
  const sheetStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: sheetValue.value }],
  }));

  const sheetAnimation = (i) => {
    if (sheetValue.value == 0) {
      sheetValue.value = withTiming(2000);
      return;
    }
    setCurrentExercise(i);
    sheetValue.value = withTiming(0);
  };

  const sheetGesture = Gesture.Pan()
    .onStart((i) => {
      if (i.y > 0) {
        sheetValue.value = withTiming(i.y * 8);
      }
    })
    .onUpdate((i) => {
      if (i.y > 0) {
        sheetValue.value = withTiming(i.y * 8);
      }
    })
    .onEnd((i) => {
      if (i.y > 230) {
        sheetValue.value = withTiming(2000);
      } else {
        sheetValue.value = withTiming(0);
      }
    });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Animated.View exiting={FadeOut} style={{ flex: 1 }}>
        <StyledView className="px-4" style={{ paddingTop: "15%" }}>
          <Animated.Text
            style={{ fontSize: 18 }}
            onPress={() => console.log(parsedExercises)}
          >
            Hello Vipul
          </Animated.Text>

          <StyledView className="flex-row" style={{ gap: 5 }}>
            {"Let's Workout".split(" ").map((i, index) => (
              <YStaggerText
                index={index}
                key={index}
                styles={styles.animatedText}
                word={i}
              />
            ))}
          </StyledView>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigate("days")}
            style={[styles.button, styles.scheduleButton]}
          >
            <StyledView className="flex-row">
              {"Schedule Your Workout".split("").map((i, index) => (
                <FadeLetter
                  letter={i}
                  key={index}
                  style={styles.fadeLetter}
                  index={index}
                />
              ))}
            </StyledView>
            <Ionicons
              name="search"
              color={"#aaa"}
              size={20}
              style={styles.icon}
            />
          </TouchableOpacity>
          <View style={styles.dateContainer}>
            {`${DATE.dayName} ${DATE.date} ${DATE.monthName}`
              .split(" ")
              .map((i, index) => (
                <YStaggerText
                  index={index}
                  word={i}
                  key={index}
                  styles={styles.dateText}
                />
              ))}
          </View>
          {parsedExercises.length > 0 ? (
            parsedExercises.map((item, index) => (
              <HomeExerciseCard
                key={index}
                press={() => sheetAnimation(item)}
                data={item}
                index={index}
              />
            ))
          ) : (
            <Text style={styles.noWorkoutText}>No workout for today.</Text>
          )}
        </StyledView>

        <GestureDetector gesture={sheetGesture}>
          <Animated.View style={[sheetStyles, styles.sheet]}>
            <Text style={styles.sheetTitle}>{currentExercise?.name}</Text>
            <Text style={styles.sheetText}>
              Targets: {currentExercise?.muscle}
            </Text>
            <Text
              numberOfLines={6}
              style={[styles.sheetText, { fontWeight: "normal" }]}
            >
              {currentExercise?.instructions}
            </Text>
            <Text style={styles.sheetText}>Reps x Sets</Text>
            <Text style={styles.repsSetsText}>
              {currentExercise?.sets} x {currentExercise?.reps}
            </Text>
            {!currentExercise?.completed && (
              <Button
                onPress={() => {
                  sheetValue.value = withTiming(500);
                  completeExercise(currentExercise?.exerciseId);
                }}
                title="Complete for Today"
              />
            )}
            <Button
              onPress={() => {
                sheetValue.value = withTiming(500);
                removeExercise(currentExercise?.exerciseId);
              }}
              title="Remove"
            />
          </Animated.View>
        </GestureDetector>
      </Animated.View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  animatedText: {
    fontSize: 40,
    marginTop: "1%",
    fontWeight: "bold",
  },
  button: {
    padding: "3%",
    flexDirection: "row",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "3%",
  },
  scheduleButton: {
    backgroundColor: "#f4f4f4",
  },
  icon: {
    marginLeft: "2%",
  },
  fadeLetter: {
    fontSize: 17,
    color: "#aaa",
  },
  noWorkoutText: {
    fontSize: 19,
    color: "#d3d3d3",
    alignSelf: "center",
    marginTop: "25%",
  },
  sheet: {
    height: "55%",
    width: "100%",
    backgroundColor: "#000",
    position: "absolute",
    bottom: 0,
    padding: "4%",
  },
  sheetTitle: {
    color: "#FFF",
    fontSize: 32,
    fontWeight: "800",
  },
  sheetText: {
    color: "#aaa",
    fontSize: 17,
    marginTop: "2%",
    fontWeight: "700",
  },
  repsSetsText: {
    color: "#aaa",
    fontSize: 42,
    marginTop: "1%",
    fontWeight: "700",
  },
  dateContainer: {
    gap: 5,
    flexDirection: "row",
    marginVertical: "4%",
  },
  dateText: {
    fontSize: 28,
    fontWeight: "800",
    color: "gray",
  },
});
