import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  TextInput,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import useExerciseStore from "../../store/exerciseStore";
import { generateRandomString, getDateInfo, roundInt } from "../../utils/helpers";
import { DateInfo, ExerciseStore, InfoRouteData, RouteData } from "../../ts";
import { ExerciseSchema } from "../../zod";

const Information = ({ name, value }) => (
  <View style={styles.informationContainer}>
    <Text numberOfLines={4} style={styles.informationText}>
      {name}
    </Text>
    <Text numberOfLines={4} style={styles.informationTextValue}>
      {value}
    </Text>
  </View>
);

const ExerciseInfo = () => {
  const route = useRoute().params;
  const { data, day } = route as InfoRouteData;
  const [reps, setReps] = useState("0");
  const [sets, setSets] = useState("0");
  const { addExercise } = useExerciseStore() as ExerciseStore;
  const [loading, setLoading] = useState(false);
  const DATE: DateInfo = getDateInfo();
  const animOpacity = useSharedValue(0);
  const animY = useSharedValue(-400);
  const animStyles = useAnimatedStyle(() => ({
    opacity: animOpacity.value,
    transform: [{ translateX: animY.value }],
  }));

  useEffect(() => {
    animOpacity.value = withTiming(1, { duration: 1000 });
    animY.value = withTiming(0);
  }, []);

  const handleAddExercise = async () => {
    try {
      setLoading(true);
      const d = {
        ...data,
        sets: roundInt(sets),
        reps: roundInt(reps),
        completed: false,
        exerciseId: generateRandomString(10),
        day: day || DATE.dayName,
      };
      const validateData = ExerciseSchema.parse(d);
      await addExercise(JSON.stringify(validateData));
      alert("Exercise Added");
    } catch (err) {
      alert("Exercise not added");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Animated.View style={[styles.container, animStyles]}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>{data?.name.toUpperCase()}</Text>
        <Text numberOfLines={4} style={styles.guideText}>
          Guide
        </Text>
        <Text numberOfLines={4} style={styles.guideText}>
          {data.instructions}
        </Text>

        <Text numberOfLines={4} style={styles.infoHeader}>
          Information
        </Text>
        <Information name={"Type"} value={data.type} />
        <Information name={"Muscle"} value={data.muscle} />
        <Information name={"Difficulty"} value={data.difficulty} />

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Sets</Text>
            <TextInput
              value={sets}
              onChangeText={(val) => setSets(val)}
              style={styles.input}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Reps</Text>
            <TextInput
              value={reps}
              onChangeText={(val) => setReps(val)}
              style={styles.input}
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={handleAddExercise}
        >
          {loading ? (
            <ActivityIndicator color={"white"} />
          ) : (
            <Text style={styles.buttonText}>Add</Text>
          )}
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  guideText: {
    marginTop: 8,
    fontSize: 16,
    color: "#888",
  },
  infoHeader: {
    marginTop: 16,
    fontSize: 16,
    color: "#888",
  },
  informationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  informationText: {
    marginTop: 12,
    flex: 1,
    fontSize: 16,
  },
  informationTextValue: {
    marginTop: 12,
    flex: 1,
    fontSize: 16,
    position: "absolute",
    right: 0,
    fontWeight: "700",
  },
  inputContainer: {
    flexDirection: "row",
    marginTop: 16,
    gap: 6,
  },
  inputWrapper: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 0.8,
    marginTop: 10,
    padding: 12,
    borderRadius: 5,
  },
  button: {
    marginTop: 20,
    borderRadius: 5,
    backgroundColor: "#222",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default ExerciseInfo;
