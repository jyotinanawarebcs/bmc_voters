import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet, TextInput, SafeAreaView, Text } from "react-native";
import { getVoters, Voter } from "../api/voterApi";
import VoterCard from "../components/VoterCard";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

type VotersScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Voters"
>;
export default function VotersScreen() {
  const [voters, setVoters] = useState<Voter[]>([]);
  const [filteredVoters, setFilteredVoters] = useState<Voter[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation<VotersScreenNavigationProp>();
  const [genderFilter, setGenderFilter] = useState<"all" | "M" | "F">("all");

  useEffect(() => {
    async function load() {
      try {
        const data = await getVoters();
        setVoters(data);
        setFilteredVoters(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  useEffect(() => {
  let list = voters;

  // search filter
  if (searchText !== "") {
    const lower = searchText.toLowerCase();
    list = list.filter(
      (v) =>
        v.full_name.toLowerCase().includes(lower) ||
        v.voter_id.toLowerCase().includes(lower)
    );
  }

  if (genderFilter !== "all") {
  list = list.filter(
    (v) => v.gender === genderFilter
  );
}

  setFilteredVoters(list);
}, [searchText, genderFilter, voters]);

  if (loading)
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by name or voter ID"
        value={searchText}
        onChangeText={setSearchText}
        autoCorrect={false}
        autoCapitalize="none"
        clearButtonMode="while-editing"
      />
      <View style={styles.genderFilterRow}>
        <Text
          style={[
            styles.genderOption,
            genderFilter === "all" && styles.genderActive,
          ]}
          onPress={() => setGenderFilter("all")}
        >
          All
        </Text>

        <Text
          style={[
            styles.genderOption,
            genderFilter === "M" && styles.genderActive,
          ]}
          onPress={() => setGenderFilter("M")}
        >
          Male
        </Text>

        <Text
          style={[
            styles.genderOption,
            genderFilter === "F" && styles.genderActive,
          ]}
          onPress={() => setGenderFilter("F")}
        >
          Female
        </Text>
      </View>

      {filteredVoters.length === 0 ? (
        <View style={styles.noResults}>
          <Text>No voters found</Text>
        </View>
      ) : (
        <FlatList
          data={filteredVoters}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => // inside your FlatList renderItem
          <VoterCard
            voter={item}
            onPress={() => navigation.navigate("VoterDetail", { voter: item, allVoters: voters })}
          />
          }
          keyboardShouldPersistTaps="handled"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f0f0", padding: 16 },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  searchBar: {
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 12,
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  noResults: { flex: 1, justifyContent: "center", alignItems: "center" },
  genderFilterRow: {
  flexDirection: "row",
  marginBottom: 12,
  justifyContent: "space-between",
},

genderOption: {
  flex: 1,
  textAlign: "center",
  backgroundColor: "#ddd",
  paddingVertical: 10,
  marginHorizontal: 4,
  borderRadius: 8,
  fontSize: 16,
  fontWeight: "600",
  color: "#333",
},

genderActive: {
  backgroundColor: "#007bff",
  color: "#fff",
},

});
