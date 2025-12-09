import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const DIVISIONS = [
  { id: "1", name: "Chalisgaon - 1", percent: "7.1282", count: "6752" },
  { id: "2", name: "Chalisgaon - 2", percent: "5.3915", count: "5107" },
  { id: "3", name: "Chalisgaon - 3", percent: "5.8771", count: "5567" },
  { id: "4", name: "Chalisgaon - 4", percent: "4.9566", count: "4695" },
  { id: "5", name: "Chalisgaon - 5", percent: "6.0988", count: "5777" },
  { id: "6", name: "Chalisgaon - 6", percent: "5.5995", count: "5304" },
];

export default function DivisionScreen() {
  return (
    <SafeAreaView style={styles.container}>

      {/* ================= HEADER ================= */}
      <LinearGradient
        colors={["#2F80ED", "#56CCF2"]}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>By Division</Text>

        <View style={styles.adminTag}>
          <Feather name="user" size={14} color="#fff" />
          <Text style={styles.adminText}>Chalisgaon Admin</Text>
        </View>
      </LinearGradient>

      {/* ================= SEARCH BAR ================= */}
      <View style={styles.searchWrapper}>
        <Feather name="search" size={18} color="#8a8a8a" style={{ marginRight: 8 }} />
        <TextInput
          placeholder="Search divisions..."
          placeholderTextColor="#999"
          style={styles.searchInput}
        />
      </View>

      {/* ================= TOTAL BADGE ================= */}
      <View style={styles.totalBadge}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalValue}>{DIVISIONS.length}</Text>
      </View>

      {/* ================= CARDS LIST ================= */}
      <FlatList
        data={DIVISIONS}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ paddingBottom: 120 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* Percentage & Count */}
            <View style={styles.rowBetween}>
              <View>
                <Text style={styles.label}>PERCENTAGE</Text>
                <Text style={styles.percent}>{item.percent} %</Text>
              </View>

              <View style={{ alignItems: "flex-end" }}>
                <Text style={styles.label}>COUNT</Text>
                <Text style={styles.count}>{item.count}</Text>
              </View>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Division Name */}
            <Text style={styles.label}>Division Name</Text>
            <View style={styles.rowBetween}>
              <Text style={styles.divisionName}>{item.name}</Text>
              <Feather name="more-vertical" size={20} color="#666" />
            </View>
          </View>
        )}
      />

      {/* ================= FLOATING BUTTONS ================= */}
      <TouchableOpacity style={styles.fabGreen}>
        <MaterialIcons name="table-chart" size={24} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.fabOrange}>
        <MaterialIcons name="picture-as-pdf" size={24} color="#fff" />
      </TouchableOpacity>

      {/* ================= FOOTER ================= */}
      <Text style={styles.footerText}>
        © 2023 Chalisgaon Municipal Council. All rights reserved.
      </Text>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef3f8",
  },

  /* HEADER */
  header: {
    paddingVertical: 20,
    paddingHorizontal: 18,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
  },
  headerTitle: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "700",
  },
  adminTag: {
    position: "absolute",
    right: 18,
    top: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  adminText: {
    color: "#fff",
    fontSize: 12,
  },

  /* SEARCH BAR */
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    marginHorizontal: 16,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 12,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },

  /* TOTAL BADGE */
  totalBadge: {
    alignSelf: "flex-end",
    backgroundColor: "#fff",
    marginRight: 16,
    marginBottom: 10,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    elevation: 2,
  },
  totalLabel: {
    fontSize: 13,
    color: "#666",
  },
  totalValue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#2F80ED",
  },

  /* CARD */
  card: {
    width: "47%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 11,
    color: "#777",
  },
  percent: {
    fontSize: 16,
    fontWeight: "700",
    color: "red",
  },
  count: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2F80ED",
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 10,
  },
  divisionName: {
    fontSize: 15,
    fontWeight: "700",
    flex: 1,
  },

  /* FLOATING BUTTONS */
  fabGreen: {
    position: "absolute",
    bottom: 80,
    right: 20,
    backgroundColor: "#18c964",
    padding: 16,
    borderRadius: 50,
    elevation: 4,
  },
  fabOrange: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#ff7f0e",
    padding: 16,
    borderRadius: 50,
    elevation: 4,
  },

  /* FOOTER */
  footerText: {
    textAlign: "center",
    fontSize: 12,
    color: "#777",
    marginBottom: 10,
  },
});
