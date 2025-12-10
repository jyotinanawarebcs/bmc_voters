import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Platform, // Import Platform
  useWindowDimensions, // Import useWindowDimensions
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types"; // Import RootStackParamList

// --- IMPORT REUSABLE LAYOUT COMPONENTS ---
import ScreenWrapper from "../navigation/ScreenWrapper";
import FAB from "../components/FAB"; // Assuming you use a FAB for mobile menu

const sampleData = [
  { id: "1", name: "Patil", percentage: 17.4319, count: 1177 },
  { id: "2", name: "Pawar", percentage: 3.9988, count: 270 },
  { id: "3", name: "Chavan", percentage: 3.7767, count: 255 },
  { id: "4", name: "Jadhav", percentage: 3.3175, count: 224 },
  { id: "5", name: "Chaudhari", percentage: 2.6511, count: 179 },
  { id: "6", name: "Wagh", percentage: 2.3252, count: 157 },
];

export default function SurnameDivisionScreen() {
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === "web" && width > 768;

  // 💡 1. HANDLER FOR SIDEBAR MENU CLICKS
  const handleMenuNavigation = (menuId: string) => {
    if (menuId === 'dashboard') {
        navigation.navigate('Dashboard'); 
    } else if (menuId === 'voterlist') {
        navigation.navigate('VoterListScreen'); 
    }
    // Add logic for other menu items as needed
  };

  const filtered = sampleData.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );
  
  // 💡 2. Main content separated for ScreenWrapper
  const MainContent = () => (
    <View style={styles.contentWrapper}>
      {/* -------------------- Removed manual header content -------------------- */}

      {/* ================= SEARCH + TOTAL ================= */}
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Feather name="search" size={18} color="#555" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Surname..."
            placeholderTextColor="#999"
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
    </View>
  );

  return (
    // 💡 3. Wrap everything in ScreenWrapper
    <ScreenWrapper
      activeMenuId="surname" // Assuming you have a menu item for surname view
      headerTitle="Surname List"
      headerSubtitle={isWeb ? "Division-wise > Surname Breakdown" : undefined}
      showBackArrow={!isWeb} // Show back arrow on mobile
      onMenuItemPress={handleMenuNavigation}
    >
        {MainContent()}

        {/* ================= FLOATING BUTTONS ================= */}
        <View style={styles.fabContainer}>
          <TouchableOpacity style={styles.fab}>
            <Feather name="file-text" size={22} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.fab}>
            <Feather name="bar-chart-2" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        {!isWeb && (
            // Use the FAB for mobile menu navigation
            <FAB iconName="menu" onPress={() => console.log('Open Mobile Menu')} />
        )}
    </ScreenWrapper>
  );
}

// ====================== STYLES ======================
const styles = StyleSheet.create({
  // Removed container and manual header styles

  contentWrapper: { 
      flex: 1, 
      backgroundColor: "#eef2f7" // Keep the main background color here
  },

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
    paddingVertical: 0, // Reset padding
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
    zIndex: 10, // Ensure FABs are on top
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