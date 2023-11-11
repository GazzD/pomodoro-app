import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const options = ["Pomodoro", "Short Break", "Long Break"];

export default function Header({
  currentTime,
  setCurrentTime,
  setIsActive,
  setTime,
}) {
  function handlePress(index) {
    const newTime = index === 0 ? 25 : index === 1 ? 5 : 15;
    setIsActive(false);
    setCurrentTime(index);
    setTime(newTime * 60);
  }

  return (
    <View style={styles.container}>
      {options.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.item,
            currentTime !== index && { borderColor: "transparent" },
          ]}
          onPress={() => handlePress(index)}
        >
          <Text style={styles.itemText}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    alignItems: "center",
    borderColor: "white",
    borderRadius: 10,
    borderWidth: 3,
    marginVertical: 20,
    padding: 5,
    width: "33%",
  },
  itemText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
