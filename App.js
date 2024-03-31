import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { fetchExercises } from "./src/api/exercises";
import React from "react";
import { StyledFlatList, StyledView } from "./src/components/styled";
import { ExerciseCard } from "./src/components/ExerciseCard";
import { StyledComponent, withExpoSnack } from "nativewind";
import { NavigationContainer } from "@react-navigation/native";
import SearchPage from "./src/pages/SearchPage";
import MainNavigator from "./src/navigator/MainNavigator";
import Landing from "./src/pages/Landing";

const queryClient = new QueryClient();

function Exercises() {
  return <MainNavigator/>
}

const styles = StyleSheet.create({});

const App = () => {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <Exercises />
      </QueryClientProvider>
    </NavigationContainer>
  );
};

export default withExpoSnack(App);
