import { StyleSheet } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";
import { withExpoSnack } from "nativewind";
import { NavigationContainer } from "@react-navigation/native";
import BottomAppNavigator from "./src/navigator/BottomNavigator";
import useStateStore from "./src/store/stateStore";
import Landing from "./src/pages/FitFlow/Landing";

const queryClient = new QueryClient();

function Exercises() {
  return <BottomAppNavigator />;
}

const styles = StyleSheet.create({});

const App = () => {
  const state = useStateStore((s) => s.state);
  console.log(state)
  return (
    state?<NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <Exercises />
      </QueryClientProvider>
    </NavigationContainer>:<Landing/>
  );
};

export default withExpoSnack(App);
