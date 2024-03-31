import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { StyledImage, StyledText, StyledView } from "./styled";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { capitalizeWords } from "../utils/helpers";

export const ExerciseCard = ({ data, index, press }) => {
  const translateXValue = useSharedValue(-2000);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateXValue.value }],
    };
  });
  useEffect(() => {
    translateXValue.value = withDelay(
      index * 500,
      withTiming(0, { duration: 200 }, () => {})
    );
  }, []);

  const moveValue = useSharedValue(0);
  const moveStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: moveValue.value }],
    };
  });
  const sideView = useSharedValue(300);
  const sideViewOpacity = useSharedValue(0);
  const sideViewStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: sideView.value }],
      opacity: sideViewOpacity.value,
    };
  });

  const swipeGesture = Gesture.Pan().onStart((i) => {
    if (i.velocityX < -300) {
      withSequence([
        (moveValue.value = withTiming(-90)),
        (sideView.value = withTiming(0)),
        (sideViewOpacity.value = 1),
      ]);
    }
    if (i.velocityX > 300) {
      withSequence([
        (moveValue.value = withTiming(0)),
        (sideView.value = withTiming(300)),
        (sideViewOpacity.value = 0),
      ]);
    }
  });
  return (
    <Animated.View style={[animatedStyles, moveStyles, styles.container]}>
      <GestureHandlerRootView style={{}}>
        <GestureDetector gesture={swipeGesture}>
          <TouchableOpacity onPress={press} activeOpacity={0.7}>
            <StyledView className="flex flex-row mt-3">
              <StyledView className="ml-4 mt-3">
                <StyledText className="text-lg">
                  {capitalizeWords(data?.name) || data?.bodyPart}
                </StyledText>
                <StyledView className="flex flex-row gap-3 pt-1">
                  <StyledText className="text-gray-400 text-md">
                    Targets: {data.muscle}
                  </StyledText>
                  <StyledText className="text-gray-400 text-md">
                    Machine: {data.equipment}
                  </StyledText>
                </StyledView>
              </StyledView>
              <Animated.View style={[sideViewStyles, styles.sideView]}>
                <Ionicons name="add" color={"black"} size={32} />
                <StyledText className="text-black mt-1">Add</StyledText>
              </Animated.View>
            </StyledView>
          </TouchableOpacity>
        </GestureDetector>
      </GestureHandlerRootView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
  },
  sideView: {
    height: "100%",
    marginLeft: "4%",
    padding: "3%",
    alignItems: "center",
    paddingHorizontal: "6%",
    justifyContent: "center",
    borderLeftWidth: 0.3,
  },
});
