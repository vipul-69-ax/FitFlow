import { StyleSheet, Text, TextInput } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

export const Option = ({ delay = 0, title = "Hello", inputProps }) => {
  const yPos = useSharedValue(-500);
  const yStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: yPos.value,
        },
      ],
    };
  });
  useEffect(() => {
    yPos.value = withDelay(delay, withTiming(0));
  });
  return (
    <Animated.View style={[yStyles, styles.optionContainer]}>
      <Text style={styles.optionText}>{title}</Text>
      <TextInput {...inputProps} style={styles.input} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  optionText: {
    fontSize: 19,
    alignSelf: "center",
  },
  optionContainer: {
    marginTop: "3%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    padding: "3%",
    width: 120,
    borderRadius: 4,
    backgroundColor:'#F7F7F7'
  },
});
