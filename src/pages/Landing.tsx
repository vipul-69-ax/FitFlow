import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AnimatedItem} from "../components/styled/AnimatedStack";

export default function Landing() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <AnimatedItem/>
    </View>
  );
}

const styles = StyleSheet.create({});
