import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Voter } from "../api/voterApi";

type VoterCardProps = {
  voter: Voter;
  onPress: () => void;   // required
};

export default function VoterCard({ voter, onPress }: VoterCardProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <Text style={styles.name}>{voter.full_name}</Text>
        <Text>Voter ID: {voter.voter_id}</Text>
        <Text>Part Number: {voter.part_number}</Text>
        <Text>House No: {voter.house_no}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
});
