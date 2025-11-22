import React, { useEffect, useState, useMemo } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { getVoters, Voter } from "../api/voterApi";

export default function VotersFamilyScreen() {
  const [voters, setVoters] = useState<Voter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getVoters();
        setVoters(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // ⭐ Extract surname from full name
  const getSurname = (fullName: string) => {
    const parts = fullName.trim().split(" ");
    return parts.length > 1 ? parts[parts.length - 1] : parts[0];
  };

  // ⭐ Group voters by surname
  const groupedFamilies = useMemo(() => {
    const groups: { [surname: string]: Voter[] } = {};

    voters.forEach((v) => {
      const surname = getSurname(v.full_name);
      if (!groups[surname]) groups[surname] = [];
      groups[surname].push(v);
    });

    // Convert map → array
    return Object.entries(groups)
      .filter(([surname, members]) => members.length > 1) // only show REAL families
      .map(([surname, members]) => ({
        surname,
        members,
      }));
  }, [voters]);

  if (loading)
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );

  return (
    <View style={styles.container}>
      <FlatList
        data={groupedFamilies}
        keyExtractor={(item) => item.surname}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>Family: {item.surname}</Text>

            {item.members.map((m) => (
              <View key={m.id} style={styles.memberRow}>
                <Text style={styles.name}>{m.full_name}</Text>
                <Text>Age: {m.age}</Text>
                <Text>House No: {m.house_no}</Text>
              </View>
            ))}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f0f0f0" },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 2,
  },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  memberRow: { marginBottom: 10 },
  name: { fontWeight: "600" },
});
