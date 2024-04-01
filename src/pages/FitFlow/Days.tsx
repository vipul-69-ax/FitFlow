import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getDayNames } from "../../utils/helpers";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { SearchNavigationProp } from "../../ts";
const {width} = Dimensions.get('screen')
export default function Days() {
  const daysOfWeek = getDayNames();
  const { navigate } = useNavigation<SearchNavigationProp>();
  const yPos = useSharedValue(-499);
  const [selectedDay, setSelectedDay] = useState("");
  const yPosStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: yPos.value,
        },
      ],
    };
  });
  const sdValue = useSharedValue(0),
    sdOpacity = useSharedValue(0);
  const sdStyles = useAnimatedStyle(() => {
    return {
      opacity: sdOpacity.value,
      transform: [{ scale: sdValue.value }],
    };
  });
  const sdAnimation = (i) => {
    setSelectedDay(i);
    sdOpacity.value = 1;
    sdValue.value = withDelay(300, withTiming(10, { duration: 3000 }));
    sdOpacity.value = withDelay(0, withTiming(0.2, { duration: 1000 }));
    setTimeout(() => {
      navigate("search", { data: i });
    }, 1500);
    setTimeout(() => {
      sdValue.value = 0;
      sdOpacity.value = 0;
      setSelectedDay("");
    }, 2000);
  };
  useEffect(() => {
    yPos.value = withDelay(500, withSpring(0));
  }, []);

  return (
    <Animated.View style={[yPosStyles, styles.container]}>
      {daysOfWeek.map((i, index) => (
        <TouchableOpacity
            onLongPress={()=>{

            }}
          onPress={() => sdAnimation(i)}
          style={[
            styles.dayContainer,
            {
              borderBottomWidth: index == daysOfWeek.length - 1 ? 0 : 0.7,
              borderTopRightRadius: index == 0 ? 14 : 0,
              borderTopLeftRadius: index == 0 ? 14 : 0,
              borderBottomRightRadius: index == daysOfWeek.length - 1 ? 14 : 0,
              borderBottomLeftRadius: index == daysOfWeek.length - 1 ? 14 : 0,
            },
          ]}
          key={index}
        >
          <Text style={styles.dayName}>{i}</Text>
        </TouchableOpacity>
      ))}
      <Animated.Text style={[styles.selectedDay, sdStyles]}>
        {selectedDay}
      </Animated.Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: "5%",
    flex: 1,
  },
  dayContainer: {
    backgroundColor: "#F7f7f7",
    padding: "3%",
    borderColor: "#d3d3d3",
  },
  dayName: {
    fontSize: 17,
    color: "#222",
  },
  selectedDay: {
    fontSize: 54,
    position: "absolute",
    alignSelf: "center",
    top: 250,
    fontWeight: "900",
  },
});
