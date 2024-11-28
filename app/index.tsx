import React, { useEffect, useState } from "react";
import { Text, View, Alert, Button, StyleSheet } from "react-native";
import messaging from "@react-native-firebase/messaging";
import { Picker } from "@react-native-picker/picker"; // Install this using 'npm install @react-native-picker/picker'

export default function Index() {
  const [selectedTopic, setSelectedTopic] = useState("");
  const [confirmedTopic, setConfirmedTopic] = useState("");

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
  }

  useEffect(() => {
    requestUserPermission();
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
    });
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  const handleConfirm = () => {
    setConfirmedTopic(selectedTopic);
    messaging()
      .subscribeToTopic(selectedTopic)
      .then(() => console.log("Subscribed to topic!", selectedTopic));
    console.log("Confirmed Topic:", selectedTopic);
    Alert.alert("Confirmed!", `You Subscribed to: ${selectedTopic}`);
  };

  const handleDeselect = () => {
    messaging()
      .unsubscribeFromTopic(selectedTopic)
      .then(() => console.log("Unsubscribed fom the topic!", selectedTopic));
    setSelectedTopic("");
    setConfirmedTopic("");
    console.log("Deselected Topic");
    Alert.alert("Deselected!", "No topic selected.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Select a Topic</Text>
      <Picker
        selectedValue={selectedTopic}
        onValueChange={(itemValue) => setSelectedTopic(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Choose a topic" value="" />
        <Picker.Item label="Technology" value="Technology" />
        <Picker.Item label="Health" value="Health" />
        <Picker.Item label="Education" value="Education" />
        <Picker.Item label="Environment" value="Environment" />
      </Picker>
      <View style={styles.buttonContainer}>
        <Button
          title="Subscribe Topic"
          onPress={handleConfirm}
          disabled={!selectedTopic}
        />
        <Button title="Unsubscribe Topic" onPress={handleDeselect} />
      </View>
      {confirmedTopic ? (
        <Text style={styles.confirmationText}>
          Confirmed Topic: {confirmedTopic}
        </Text>
      ) : (
        <Text style={styles.confirmationText}>No topic confirmed.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: "80%",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 10,
    marginBottom: 5,
    gap: 20,
  },
  confirmationText: {
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
});
