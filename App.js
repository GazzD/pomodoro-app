import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, Platform, SafeAreaView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import Header from './src/components/Header';
import Timer from './src/components/Timer';
import {Audio} from 'expo-av';

const colors = [ '#F7DC6F', '#A2D9CE', '#D7BDE2'];

export default function App() {

  const [isWorking, setIsWorking] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "BEAK");

  useEffect(() => {
    let interval = null;
    if(isActive) {
      interval = setInterval(() => {
        setTime(time - 1);
      }, 1);
    }
    else {
      clearInterval(interval);
    }

    if(time === 0) {
      playAlarm();
      setIsActive(false);
      setIsWorking((prev) => !prev);
      if(currentTime === 0) {
        setTime(25 * 60);
      } else if(currentTime === 2) {
        setTime(15 * 60);
      }
      else {
        setTime(5 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  function handleStartStop() {
    playSound();
    setIsActive(!isActive);
  }

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/bubble.mp3')
    );
    await sound.playAsync();
  }

  async function playAlarm() {
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/alarm.mp3')
    );
    await sound.playAsync();
  }

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors[currentTime]}]}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 15,
          paddingTop: Platform.OS === "android" && 30
      }}
      >
        <Text style={styles.titleText}>Pomodoro</Text>
        <Header currentTime={currentTime} setIsActive={setIsActive} setCurrentTime={setCurrentTime} setTime={setTime} />
        <Timer time={time} setTime={setTime} isWorking={isWorking} setIsWorking={setIsWorking} />
        <TouchableOpacity style={styles.button} onPress={handleStartStop}>
          <Text style={styles.buttonLabel}>{isActive ? "STOP" : "START"}</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold"
  },
  button: {
    backgroundColor: "#333333",
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    alignItems: "center"
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white"
  }
});
