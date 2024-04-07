import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { NavigationContainer } from "@react-navigation/native";
import BottomAppNavigator from "./src/navigator/BottomNavigator";
import useStateStore from "./src/store/stateStore";
import Landing from "./src/pages/FitFlow/Landing";

const queryClient = new QueryClient();

const App = () => {
  const { state } = useStateStore();
  return state ? (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <BottomAppNavigator />
      </QueryClientProvider>
    </NavigationContainer>
  ) : (
    <Landing />
  );
};

export default App;
