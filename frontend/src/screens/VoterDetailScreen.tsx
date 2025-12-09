import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/type";
import { Voter } from "../api/type";

type Props = NativeStackScreenProps<RootStackParamList, "VoterDetail">;

export default function VoterDetailScreen({ route }: Props) {
  const { voter, allVoters } = route.params;

  const [activeTab, setActiveTab] = useState<"personal" | "family">("personal");

  const getSurname = (fullName: string) => {
    const parts = fullName.trim().split(" ");
    return parts.length > 1 ? parts[parts.length - 1] : parts[0];
  };

  const voterSurname = getSurname(voter.full_name);

  const familyMembers = useMemo(() => {
    return allVoters.filter((v: Voter) => getSurname(v.full_name) === voterSurname);
  }, [allVoters, voterSurname]);

  return (
    <View style={styles.container}>
      <View style={styles.toggleBar}>
        <TouchableOpacity
          style={[styles.toggleButton, activeTab === "personal" && styles.activeToggle]}
          onPress={() => setActiveTab("personal")}
        >
          <Text style={[styles.toggleText, activeTab === "personal" && styles.activeText]}>
            Personal Details
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toggleButton, activeTab === "family" && styles.activeToggle]}
          onPress={() => setActiveTab("family")}
        >
          <Text style={[styles.toggleText, activeTab === "family" && styles.activeText]}>
            Family Details
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        {activeTab === "personal" && (
          <View style={styles.card}>
            <Text style={styles.label}>Voter Name</Text>
            <Text style={styles.value}>{voter.full_name}</Text>
            <Text style={styles.label}>Voter ID</Text>
            <Text style={styles.value}>{voter.voter_id}</Text>
            <Text style={styles.label}>Age</Text>
            <Text style={styles.value}>{voter.age}</Text>
            <Text style={styles.label}>House No</Text>
            <Text style={styles.value}>{voter.house_no}</Text>
            <Text style={styles.label}>Part Number</Text>
            <Text style={styles.value}>{voter.part_number}</Text>
            <Text style={styles.label}>Relative Name</Text>
            <Text style={styles.value}>{voter.relative_name}</Text>
            <Text style={styles.label}>Gender</Text>
            <Text style={styles.value}>{voter.gender}</Text>
          </View>
        )}

        {activeTab === "family" && (
          <View style={styles.card}>
            <Text style={styles.label}>Family Members ({voterSurname})</Text>
            {familyMembers.length > 0 ? (
              <FlatList
                data={familyMembers}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View style={styles.familyRow}>
                    <Text style={styles.value}>{item.full_name}</Text>
                    <Text style={styles.subValue}>
                      Age: {item.age}, House: {item.house_no}
                    </Text>
                  </View>
                )}
              />
            ) : (
              <Text style={styles.value}>No family members found</Text>
            )}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
    padding: 16,
  },

  /* ---------- TAB SWITCH ---------- */
  toggleBar: {
    flexDirection: "row",
    padding: 4,
    borderRadius: 30,
    backgroundColor: "#E3E8EF",
    marginBottom: 18,
  },

  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: "center",
  },

  activeToggle: {
    backgroundColor: "#007BFF",
    shadowColor: "#007BFF",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },

  toggleText: {
    fontSize: 14,
    color: "#555",
    fontWeight: "600",
  },

  activeText: {
    color: "#fff",
    fontWeight: "700",
  },

  /* ---------- MAIN CARD ---------- */
  card: {
    backgroundColor: "#fff",
    padding: 22,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },

  /* ---------- LABEL + VALUE ---------- */
  label: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 14,
    fontWeight: "600",
  },

  value: {
    fontSize: 16,
    color: "#111827",
    marginTop: 4,
    fontWeight: "500",
  },

  /* ---------- FAMILY ROW ---------- */
  familyRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
  },

  subValue: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },
});
