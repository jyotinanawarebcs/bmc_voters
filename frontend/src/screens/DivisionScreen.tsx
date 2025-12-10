import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Platform,
  useWindowDimensions,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation, NavigationProp } from "@react-navigation/native";

// --- IMPORT REUSABLE LAYOUT COMPONENTS & TYPES ---
import ScreenWrapper from "../navigation/ScreenWrapper";
import FAB from "../components/FAB"; 
import { RootStackParamList } from "../navigation/types"; 

// --- DATA ---
const WARD_DATA = [
  { id: "1", name: "Chalisgaon - 1", percent: "7.1282", count: "6752" },
  { id: "2", name: "Chalisgaon - 2", percent: "5.3915", count: "5107" },
  { id: "3", name: "Chalisgaon - 3", percent: "5.8771", count: "5567" },
  { id: "4", name: "Chalisgaon - 4", percent: "4.9566", count: "4695" },
  { id: "5", name: "Chalisgaon - 5", percent: "6.0988", count: "5777" },
  { id: "6", name: "Chalisgaon - 6", percent: "5.5995", count: "5304" },
];

// --- MAIN SCREEN COMPONENT ---
export default function DivisionScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === "web" && width > 768;
  
  // State for search input (optional, but good practice)
  const [search, setSearch] = useState("");

  // 💡 1. HANDLER FOR SIDEBAR MENU CLICKS
  const handleMenuNavigation = (menuId: string) => {
    if (menuId === 'dashboard') {
        navigation.navigate('Dashboard'); 
    } else if (menuId === 'voterlist') {
        navigation.navigate('VoterListScreen'); 
    }
    // Add logic for other menu items
  };

  const MainContent = () => (
    <View style={styles.mainContent}>
      
      {/* ================= SEARCH BAR ================= */}
      <View style={styles.searchWrapper}>
        <Feather name="search" size={18} color="#8a8a8a" style={{ marginRight: 8 }} />
        <TextInput
          placeholder="Search Wards..."
          placeholderTextColor="#999"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* ================= TOTAL BADGE ================= */}
      <View style={styles.totalBadge}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalValue}>{WARD_DATA.length}</Text>
      </View>

      {/* ================= CARDS LIST ================= */}
      <FlatList
        data={WARD_DATA}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} activeOpacity={0.8}>
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
          </TouchableOpacity>
        )}
      />
      
      {/* ================= FOOTER (Kept local, though usually ScreenWrapper handles this) ================= */}
      <Text style={styles.footerText}>
        © 2023 Chalisgaon Municipal Council. All rights reserved.
      </Text>

    </View>
  );

  return (
    <ScreenWrapper
        // You should define an activeMenuId for this screen if it's accessible from the sidebar
        activeMenuId="pollingbooths" // Example ID, adjust as needed
        headerTitle="Division List (By Ward)"
        headerSubtitle={isWeb ? "Dashboard > Division Management > By Ward" : undefined}
        onMenuItemPress={handleMenuNavigation} // Pass the required navigation handler
    >
        {MainContent()}

        {/* ================= FLOATING BUTTONS ================= */}
        <TouchableOpacity style={styles.fabGreen}>
            <MaterialIcons name="table-chart" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.fabOrange}>
            <MaterialIcons name="picture-as-pdf" size={24} color="#fff" />
        </TouchableOpacity>
        
        {!isWeb && (
            // FAB for mobile menu, placed below the other FABs
            <FAB iconName="menu" onPress={() => console.log('Open Mobile Menu')} />
        )}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  // Removed container, header, adminTag, and headerTitle/Text styles, 
  // as ScreenWrapper handles the overall container and header.
  
  mainContent: {
    flex: 1,
    backgroundColor: "#eef3f8", // Use the original background color here
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
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 0,
  },

  /* TOTAL BADGE */
  totalBadge: {
    alignSelf: "flex-end",
    backgroundColor: "#fff",
    marginRight: 16,
    marginBottom: 10,
    marginTop: 10, // Added slight top margin for spacing
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
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

  /* CARDS LIST */
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20, // Reduced as FABs are outside
  },
  columnWrapper: { 
    justifyContent: "space-between",
  },
  card: {
    width: "47%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
    zIndex: 10, // Ensure FABs are on top
  },
  fabOrange: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#ff7f0e",
    padding: 16,
    borderRadius: 50,
    elevation: 4,
    zIndex: 10, // Ensure FABs are on top
  },

  /* FOOTER */
  footerText: {
    textAlign: "center",
    fontSize: 12,
    color: "#777",
    paddingTop: 10, // Added top padding to separate from list
    paddingBottom: 10, // Added bottom padding
  },
});