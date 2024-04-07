import { Button, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { YStaggerText } from "../../components/YStaggerText";
import { Option } from "../../components/UserOptions";
import useUserStore from "../../store/userStore";
import { State, User } from "../../ts";
import { roundInt } from "../../utils/helpers";
import { UserSchema } from "../../zod";
import LottieView from "lottie-react-native";

export default function UserHome() {
  const store = useUserStore;
  const user = useUserStore((state: State) => state.user);
  const [name, setName] = useState(user?.name);
  const [age, setAge] = useState(user?.age.toString());
  const [height, setHeight] = useState(user?.height.toString());
  const setUser = useUserStore((state: State) => state.setUser);

  const addUserInformation = () => {
    const data: User = {
      name,
      age: parseInt(age),
      height: parseInt(height),
    };
    try {
      const validatedUser = UserSchema.parse(data);
      setUser(validatedUser);
      alert("Updated Information!");
    } catch (err) {
      alert("Error updating information!");
    }
    store.setState({});
  };
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        {"User Options".split(" ").map((i, index) => (
          <YStaggerText
            word={i + " "}
            styles={styles.topText}
            index={index}
            key={index}
          />
        ))}
      </View>
      <LottieView
        source={require("../../../assets/Home.json")}
        style={styles.lottie}
        autoPlay
        loop
      />
      <Option
        delay={300}
        title="Name"
        inputProps={{
          value: name,
          onChangeText: (val: string) => setName(val),
        }}
      />
      <Option
        delay={600}
        title="Age"
        inputProps={{
          value: age,
          onChangeText: (val: string) => setAge(val),
        }}
      />
      <Option
        delay={900}
        title="Height in cm"
        inputProps={{
          value: height,
          onChangeText: (val: string) => setHeight(val),
        }}
      />
      <View style={{ marginTop: "2%" }}>
        <Button title="Update Me!" onPress={addUserInformation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "4%",
    paddingTop: "15%",
  },
  topText: {
    fontSize: 36,
    fontWeight: "900",
  },
  optionText: {
    fontSize: 19,
    alignSelf: "center",
  },
  optionContainer: {
    marginTop: "3%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    borderWidth: 0.6,
    padding: "3%",
    width: 120,
    borderRadius: 4,
  },
  lottie: {
    marginVertical: "3%",
    height: 200,
    width: 200,
    alignSelf: "center",
  },
});
