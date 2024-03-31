import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchExercises } from "../api/exercises";
import { StatusBar } from "expo-status-bar";
import { StyledInput, StyledView } from "../components/styled";
import { ExerciseCard } from "../components/ExerciseCard";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { FlatList, Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import FadeLetter from "../components/FadingTextAnim";
import { InfoNavigationProp } from "../ts";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";



export default function SearchPage() {
  const [listItems, setListItems] = useState([]);
  const { navigate } = useNavigation<InfoNavigationProp>();
  const yPos = useSharedValue(0);
  const yPosStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: yPos.value }],
  }));
  const indicatorPos = useSharedValue(-100);
  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: indicatorPos.value }],
  }));
  const refreshGesture = Gesture.Pan().onStart((i) => {
    if (i.velocityY > 250) {
      indicatorPos.value = 0;
      yPos.value = withSpring(40, { duration: 500 }, () => {
        yPos.value = withDelay(2000, withTiming(0));
        indicatorPos.value = withDelay(2000, withTiming(-100));
      });
    }
  });
  const [input, setInput] = useState("");
  const { data, error, isLoading, refetch } = useQuery(
    "exercises",
    () => fetchExercises(input),
    {
      enabled: false,
      onSuccess: (data) => setListItems(data),
    }
  );
  const search = () => {
    refetch();
  };

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={refreshGesture}>
      <Animated.View>
        <Animated.View style={indicatorStyle}>
          <ActivityIndicator style={styles.indicator} />
        </Animated.View>
        <Animated.View style={yPosStyles}>
          <StyledView className="px-5">
            <StyledInput
              onChangeText={(val) => setInput(val)}
              onBlur={search}
              style={styles.input}
              placeholder="Search Exercise"
            />
            <FlatList
              data={listItems}
              ListEmptyComponent={() => (
                <Text style={styles.emptyListText}>
                  {input.trim().length == 0 ? "Search here" : "Nothing here..."}
                </Text>
              )}
              keyExtractor={(item) => item.name}
              showsVerticalScrollIndicator={false}
              renderItem={({ item: i, index }) => (
                <ExerciseCard
                  press={() => {
                    navigate("info", { data: i });
                  }}
                  data={i}
                  key={index}
                  index={index}
                />
              )}
            />
          </StyledView>
        </Animated.View>
      </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  indicator: {
    position: "absolute",
    top: 20,
    alignSelf: "center",
  },
  input: {
    borderWidth: 0.7,
    borderColor: "#aaa",
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  emptyListText: {
    alignSelf: "center",
    flexDirection: "row",
    marginTop: "25%",
    fontSize: 17,
    color: "#aaa",
  },
});