import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

export default function FadeLetter({ letter, index, style }) {
  const textOpacity = useSharedValue(0);
  const textStyles = useAnimatedStyle(() => {
    return {
      opacity: textOpacity.value,
    };
  });
  useEffect(() => {
    textOpacity.value = withDelay(index * 100, withTiming(1));
  }, []);
  return <Animated.Text style={[textStyles, style]}>{letter}</Animated.Text>;
}

const styles = StyleSheet.create({});
