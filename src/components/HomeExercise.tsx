import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  SlideOutRight,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { StyledText, StyledView } from "./styled";

export default function HomeExerciseCard({ data, index, press }) {
  const cardPos = useSharedValue((80 * (index + 1)) / 2);
  const cardOpacity = useSharedValue(0);
  const cardStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: cardPos.value,
        },
      ],
      opacity: cardOpacity.value,
    };
  });
  const dividerOpacity = useSharedValue(0);
  const dividerStyle = useAnimatedStyle(() => {
    return {
      opacity: dividerOpacity.value,
    };
  });
  useEffect(() => {
    cardPos.value = withDelay(index * 140, withSpring(0));
    cardOpacity.value = withDelay(
      index * 140,
      withTiming(1, {}, () => {
        dividerOpacity.value = withTiming(1);
      })
    );
  }, []);
  const scaleText = useSharedValue(1),
    pos = useSharedValue("relative");
  const scaleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: scaleText.value }],
      //   position: pos.value,
    };
  });
  const bg = useSharedValue("#FFF");
  const bgStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: bg.value,
    };
  });
  useEffect(() => {
    if (data?.completed) {
      bg.value = withTiming("#f5f5f5");
    }
  }, [data?.completed]);
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => {
        press();
        scaleText.value = withTiming(300);
        pos.value = "absolute";
        scaleText.value = withDelay(
          300,
          withTiming(0, {}, () => {
            pos.value = "relative";
          })
        );
      }}
    >
      <Animated.View
        exiting={SlideOutRight}
        style={[styles.cardContainer, cardStyles, bgStyles]}
      >
        <View style={styles.textView}>
          <Animated.Text
            style={[styles.titleText, { maxWidth: "85%" }, scaleStyle]}
            numberOfLines={1}
          >
            {data?.name}
          </Animated.Text>
          <Text style={styles.infoText}>
            Targets: {data?.muscle} Difficulty: {data?.difficulty}
          </Text>
        </View>
        <View style={styles.setsRepsView}>
          <Text style={styles.setsRepsText}>
            {data?.sets} x {data?.reps}
          </Text>
        </View>
      </Animated.View>
      {!data?.completed && <Animated.View style={[styles.divider, dividerStyle]} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: "1%",
    padding: "4%",
    borderRadius: 4,
    flexDirection: "row",
  },
  textView: {
    maxWidth: "85%",
  },
  titleText: {
    fontSize: 20,
  },
  infoText: {
    fontSize: 14,
    color: "#888",
  },
  setsRepsView: {
    position: "absolute",
    right: 10,
    alignSelf: "center",
  },
  setsRepsText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },
  divider: {
    borderWidth: 0.5,
    borderColor: "#aaa",
    width: "100%",
  },
});
