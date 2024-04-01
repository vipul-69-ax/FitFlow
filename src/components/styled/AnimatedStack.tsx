import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  SensorType,
  useAnimatedSensor,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { HomeNavigationProp, ParallaxStyles, StateStore } from "../../ts";
import useStateStore from "../../store/stateStore";

const { height, width } = Dimensions.get("screen");

export const AnimatedItem = () => {
  const gesture = Gesture.Pan().onStart((i) => {
    console.log(i);
  });
  const setStoreState = useStateStore((s: StateStore) => s.setState);
  const rotation = useAnimatedSensor(SensorType.ROTATION);
  const parallaxStyles = useAnimatedStyle<ParallaxStyles>(() => {
    const { pitch, roll } = rotation.sensor.value;
    return {
      transform: [
        {
          translateX: withSpring(roll * 100, { damping: 200 }),
        },
        {
          translateY: withSpring(pitch * -100, { damping: 200 }),
        },
        {
          rotateY: withSpring(`${roll * 40}deg`),
        },
      ],
    };
  });

  const bg = useSharedValue("#FFF");
  const bgStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: bg.value,
    };
  });
  const swipeTextOpacity = useSharedValue(1);
  const swipeTextStyles = useAnimatedStyle(() => {
    return {
      opacity: swipeTextOpacity.value,
    };
  });
  const imgPos = useSharedValue(0);
  const imgStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: imgPos.value }],
    };
  });
  const swipeGesture = Gesture.Pan()
    .onStart((i) => {
      imgPos.value = withSpring(i.x + 100, {
        damping: 10,
        stiffness: 100,
      });
    })
    .onEnd((i) => {
      if (i.x + 100 > 200) {
        imgPos.value = withSpring(200, { damping: 10, stiffness: 100 });
      } else {
        imgPos.value = withSpring(0, { damping: 10, stiffness: 100 });
      }
    });
  useEffect(() => {
    swipeTextOpacity.value = withDelay(1000, withTiming(0));
  }, []);
  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={gesture}>
        <View style={styles.container}>
          <Animated.Image
            source={require("../../../assets/diet.png")}
            style={[styles.image, parallaxStyles]}
          />
          <Animated.View>
            <Text style={styles.title}>FitFlow</Text>
          </Animated.View>
          <View style={styles.actionContainer}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={async() => {
                if (imgPos.value >= 190) {
                  await setStoreState({state:true})
                }
              }}
            >
              <GestureDetector gesture={swipeGesture}>
                <Animated.Image
                  style={[imgStyles, { height: 40, width: 40 }]}
                  source={require("../../../assets/workout.png")}
                />
              </GestureDetector>
            </TouchableOpacity>
            <Animated.Text style={[styles.swipeText, swipeTextStyles]}>
              Swipe to continue
            </Animated.Text>
          </View>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EC5353",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: width,
  },
  image: {
    position: "absolute",
    height: 250,
    width: 250,
    opacity: 0.5,
  },
  title: {
    fontSize: 60,
    fontWeight: "900",
    color: "#FFF",
  },
  actionContainer: {
    position: "absolute",
    bottom: 40,
    opacity: 0.7,
    backgroundColor: "#FF7F7F",
    width: "80%",
    borderRadius: 50,
    padding: "5%",
    flexDirection: "row",
  },
  swipeText: {
    alignSelf: "center",
    marginLeft: "15%",
    fontSize: 18,
  },
});
