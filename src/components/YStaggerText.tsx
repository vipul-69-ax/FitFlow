import { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";

export const YStaggerText = ({ word, index, styles }) => {
  const yPos = useSharedValue(-50 - index * 10);
  const yPosStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: yPos.value,
        },
      ],
    };
  });
  useEffect(() => {
    yPos.value = withDelay(index * 50, withSpring(0));
  }, []);
  return <Animated.Text style={[styles, yPosStyles]}>{word}</Animated.Text>;
};
