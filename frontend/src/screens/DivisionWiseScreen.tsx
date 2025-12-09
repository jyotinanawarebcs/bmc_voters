import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";

const sampleData = [
  { id: "1", name: "Patil", percentage: 17.4319, count: 1177 },
  { id: "2", name: "Pawar", percentage: 3.9988, count: 270 },
  { id: "3", name: "Chavan", percentage: 3.7767, count: 255 },
  { id: "4", name: "Jadhav", percentage: 3.3175, count: 224 },
  { id: "5", name: "Chaudhari", percentage: 2.6511, count: 179 },
  { id: "6", name: "Wagh", percentage: 2.3252, count: 157 },
];

export default function DivisionwiseSurname() {
  const [searchText, setSearchText] = useState("");

  const filtered = sampleData.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* ================= HEADER ================= */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Feather name="arrow-left" size={22} color="#fff" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Division-wise : Chalisgaon - 1</Text>
          <Text style={styles.headerSubtitle}>** Surname-wise **</Text>
        </View>

        <TouchableOpacity>
          <Feather name="moon" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* ================= SEARCH + TOTAL ================= */}
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Feather name="search" size={18} color="#555" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Surname..."
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        <View style={styles.totalBadge}>
          <Text style={{ color: "#555", fontWeight: "600" }}>
            Total - {sampleData.length}
          </Text>
        </View>
      </View>

      {/* ================= LIST ================= */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.cardTitle}>{item.name}</Text>

              <View style={styles.statsRow}>
                <View style={styles.percentChip}>
                  <Feather name="pie-chart" size={14} color="#2F67FF" />
                  <Text style={styles.percentText}>
                    {item.percentage.toFixed(4)} %
                  </Text>
                </View>

                <View style={styles.countChip}>
                  <Feather name="users" size={14} color="#2F67FF" />
                  <Text style={styles.countText}>{item.count}</Text>
                </View>
              </View>
            </View>

            <Feather name="more-vertical" size={22} color="#777" />
          </View>
        )}
      />

      {/* ================= FLOATING BUTTONS ================= */}
      <View style={styles.fabContainer}>
        <TouchableOpacity style={styles.fab}>
          <Feather name="file-text" size={22} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.fab}>
          <Feather name="bar-chart-2" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ====================== STYLES ======================
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#eef2f7" },

  /* ---------- HEADER ---------- */
  header: {
    backgroundColor: "#2F67FF",
    paddingTop: 45,
    paddingBottom: 18,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  headerCenter: { flex: 1, marginLeft: 12 },
  headerTitle: { color: "#fff", fontSize: 17, fontWeight: "700" },
  headerSubtitle: { color: "#eaeaff", fontSize: 12, marginTop: 2 },

  /* ---------- SEARCH & TOTAL ---------- */
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 16,
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    elevation: 3,
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  totalBadge: {
    backgroundColor: "#fff",
    marginLeft: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
    elevation: 3,
  },

  /* ---------- CARD ---------- */
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    padding: 20,
    marginTop: 15,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    borderLeftWidth: 5,
    borderLeftColor: "#2F67FF",

    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  cardTitle: { fontSize: 18, fontWeight: "700", marginBottom: 8 },

  statsRow: { flexDirection: "row", alignItems: "center", marginTop: 5 },

  percentChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e7f0ff",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginRight: 12,
  },
  percentText: { marginLeft: 5, color: "#2F67FF", fontWeight: "600" },

  countChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e7f0ff",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  countText: { marginLeft: 5, color: "#2F67FF", fontWeight: "600" },

  /* ---------- FLOATING BUTTONS ---------- */
  fabContainer: {
    position: "absolute",
    right: 20,
    bottom: 40,
    alignItems: "center",
    gap: 15,
  },
  fab: {
    backgroundColor: "#2F67FF",
    width: 55,
    height: 55,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },
});
