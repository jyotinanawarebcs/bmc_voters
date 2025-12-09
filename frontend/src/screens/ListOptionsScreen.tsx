import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function ListOptionsScreen() {
  const menuItems = [
    {
      id: 1,
      title: "Alphabetical List",
      desc: "Sort voters A-Z",
      icon: <Feather name="type" size={26} color="#2F67FF" />,
    },
    {
      id: 2,
      title: "By Village",
      desc: "Filter by village name",
      icon: (
        <MaterialCommunityIcons
          name="home-group"
          size={28}
          color="#2F67FF"
        />
      ),
    },
    {
      id: 3,
      title: "By Ward",
      desc: "Prabhag specific lists",
      icon: <Feather name="grid" size={26} color="#2F67FF" />,
    },

    {
      id: 4,
      title: "By Assembly List",
      desc: "Vidhansabha constituency",
      icon: (
        <MaterialCommunityIcons
          name="city-variant-outline"
          size={28}
          color="#2F67FF"
        />
      ),
    },
    {
      id: 5,
      title: "By Polling Station",
      desc: "Locate by booth",
      icon: <Feather name="map-pin" size={28} color="#2F67FF" />,
    },
    {
      id: 6,
      title: "By Worker",
      desc: "Assigned Karyakarta",
      icon: <Feather name="user-check" size={28} color="#2F67FF" />,
    },

    {
      id: 7,
      title: "By Surname",
      desc: "Search via last name",
      icon: <Feather name="users" size={26} color="#2F67FF" />,
    },
    {
      id: 8,
      title: "By Color Code",
      desc: "Grouped by color tags",
      icon: (
        <MaterialCommunityIcons
          name="palette"
          size={28}
          color="#2F67FF"
        />
      ),
    },
    {
      id: 9,
      title: "Mobile Number List",
      desc: "Voters with contacts",
      icon: (
        <MaterialCommunityIcons
          name="contacts-outline"
          size={28}
          color="#2F67FF"
        />
      ),
    },

    {
      id: 10,
      title: "Voters Without Mobile",
      desc: "Missing contact info",
      icon: <Feather name="x-circle" size={28} color="#2F67FF" />,
    },
  ];

  return (
    <View style={styles.container}>
      {/* -------------------- HEADER -------------------- */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>List Options</Text>
        <Text style={styles.headerSubtitle}>Chalisgaon Municipal Council</Text>

        <View style={styles.headerIcons}>
          <Feather name="bell" size={22} color="#fff" style={{ marginRight: 18 }} />
          <Feather name="user" size={22} color="#fff" style={{ marginRight: 18 }} />
          <Feather name="moon" size={22} color="#fff" />
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* ---------------- Breadcrumb ---------------- */}
        <Text style={styles.breadcrumb}>Dashboard / Voter Lists</Text>

        {/* ---------------- Page Title ---------------- */}
        <Text style={styles.pageTitle}>Select Filter Category</Text>
        <Text style={styles.pageSubtitle}>
          Choose how you would like to view and sort the voter lists.
        </Text>

        {/* ---------------- GRID ---------------- */}
        <View style={styles.grid}>
          {menuItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.card}>
              <View style={styles.iconCircle}>{item.icon}</View>

              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubtitle}>{item.desc}</Text>
              </View>

              <Feather
                name="chevron-right"
                size={22}
                color="#999"
                style={{ marginLeft: 5 }}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* ---------------- FOOTER ---------------- */}
        <Text style={styles.footerText}>
          © 2023 Chalisgaon Municipal Council. All rights reserved.
        </Text>
      </ScrollView>
    </View>
  );
}

// ====================== STYLES ======================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef2f7",
  },

  /* ---------------- HEADER ---------------- */
  header: {
    backgroundColor: "#2F67FF",
    paddingTop: 45,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  headerSubtitle: {
    color: "#eaeaff",
    marginTop: 2,
    fontSize: 13,
  },
  headerIcons: {
    position: "absolute",
    right: 16,
    top: 55,
    flexDirection: "row",
  },

  /* ---------------- TEXT ---------------- */
  breadcrumb: {
    color: "#6b7280",
    marginTop: 20,
    marginLeft: 20,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
    marginLeft: 20,
    marginTop: 10,
  },
  pageSubtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginLeft: 20,
    marginTop: 5,
    marginBottom: 15,
  },

  /* ---------------- GRID ---------------- */
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 15,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },

  /* ---------------- Icons ---------------- */
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#e8f0ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  /* ---------------- CARD TEXT ---------------- */
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111",
  },
  cardSubtitle: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 2,
  },

  /* ---------------- FOOTER ---------------- */
  footerText: {
    textAlign: "center",
    color: "#777",
    fontSize: 12,
    paddingVertical: 30,
  },
});
