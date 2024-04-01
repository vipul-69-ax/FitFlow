import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { AnimatedItem } from "../../components/styled/AnimatedStack";
import { useNavigation } from "@react-navigation/native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

export default function Landing() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <AnimatedItem />
    </View>
  );
}

const styles = StyleSheet.create({});
