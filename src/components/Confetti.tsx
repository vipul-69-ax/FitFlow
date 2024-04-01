import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { Easing, useSharedValue, withTiming } from 'react-native-reanimated';


const Confetti = () => {
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);

  const animateConfetti = () => {
    // Randomize confetti position
    const randomX = Math.random() * 300 - 150; // Adjust range as needed
    const randomY = Math.random() * 300 - 150; // Adjust range as needed

    translateY.value = withTiming(500,{
      duration: 1000, // Animation duration
      easing: Easing.inOut(Easing.ease),
    })
    translateX.value = withTiming(500,{
      duration: 1000, 
      easing: Easing.inOut(Easing.ease),
    })
    translateX.value = withTiming(randomX,{
      duration: 1000, 
      easing: Easing.inOut(Easing.ease),
    },()=>{
        translateX.value = 0
        translateY.value = 0
    })

  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.confetti,
          {
            transform: [{ translateY }, { translateX }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.confetti,
          {
            transform: [{ translateY }, { translateX }],
          },
        ]}
      />
      {/* Add more confetti Views as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confetti: {
    position: 'absolute',
    width: 10,
    height: 10,
    backgroundColor: 'red', 
    borderRadius: 5,
  },
});

export default Confetti;
