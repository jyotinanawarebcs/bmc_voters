import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform, // Import Platform
  useWindowDimensions, // Import useWindowDimensions
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation, NavigationProp } from "@react-navigation/native"; // Import navigation hooks
import { RootStackParamList } from "../navigation/types"; // Import RootStackParamList

// --- IMPORT REUSABLE LAYOUT COMPONENTS ---
import ScreenWrapper from "../navigation/ScreenWrapper";
import FAB from "../components/FAB"; // Assuming you use a FAB for mobile menu

export default function ListOptionsScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === "web" && width > 768;

  // 💡 1. HANDLER FOR SIDEBAR MENU CLICKS
  const handleMenuNavigation = (menuId: string) => {
    if (menuId === 'dashboard') {
        navigation.navigate('Dashboard'); 
    } else if (menuId === 'voterlist') {
        navigation.navigate('VoterListScreen'); 
    } else if (menuId === 'listoptions') { // Assuming this screen's ID is 'listoptions'
        console.log('Already on List Options Screen');
    }
    // Add logic for other menu items as needed
  };

  const menuItems = [
    {
      id: 1,
      title: "Alphabetical List",
      desc: "Sort voters A-Z",
      icon: <Feather name="type" size={26} color="#2F67FF" />,
      targetScreen: 'VoterListScreen', // Example: navigate to a filtered list
    },
    {
      id: 2,
      title: "By Village",
      desc: "Filter by village name",
      icon: (
        <MaterialCommunityIcons name="home-group" size={28} color="#2F67FF" />
      ),
      targetScreen: 'VoterListScreen',
    },
    {
      id: 3,
      title: "By Ward",
      desc: "Prabhag specific lists",
      icon: <Feather name="grid" size={26} color="#2F67FF" />,
      targetScreen: 'DivisionScreen',
    },
    {
      id: 4,
      title: "By Assembly List",
      desc: "Vidhansabha constituency",
      icon: (
        <MaterialCommunityIcons name="city-variant-outline" size={28} color="#2F67FF" />
      ),
      targetScreen: 'VoterListScreen',
    },
    {
      id: 5,
      title: "By Polling Station",
      desc: "Locate by booth",
      icon: <Feather name="map-pin" size={28} color="#2F67FF" />,
      targetScreen: 'VoterListScreen',
    },
    {
      id: 6,
      title: "By Worker",
      desc: "Assigned Karyakarta",
      icon: <Feather name="user-check" size={28} color="#2F67FF" />,
      targetScreen: 'VoterListScreen',
    },
    {
      id: 7,
      title: "By Surname",
      desc: "Search via last name",
      icon: <Feather name="users" size={26} color="#2F67FF" />,
      targetScreen: 'SurnameDivisionScreen', // Assuming you have a specific screen for this
    },
    {
      id: 8,
      title: "By Color Code",
      desc: "Grouped by color tags",
      icon: (
        <MaterialCommunityIcons name="palette" size={28} color="#2F67FF" />
      ),
      targetScreen: 'VoterListScreen',
    },
    {
      id: 9,
      title: "Mobile Number List",
      desc: "Voters with contacts",
      icon: (
        <MaterialCommunityIcons name="contacts-outline" size={28} color="#2F67FF" />
      ),
      targetScreen: 'VoterListScreen',
    },
    {
      id: 10,
      title: "Voters Without Mobile",
      desc: "Missing contact info",
      icon: <Feather name="x-circle" size={28} color="#2F67FF" />,
      targetScreen: 'VoterListScreen',
    },
 
  ];
  
  // 💡 2. HANDLER FOR CARD PRESS (Navigate to the relevant filter screen)
  const handleCardPress = (screen?: keyof RootStackParamList) => {
    if (screen) {
        // You would typically pass filter params here, e.g., 
        // navigation.navigate('VoterListScreen', { filterType: screen });
        navigation.navigate(screen as any);
    }
  };


  const MainContent = () => (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      
      {/* ---------------- Page Title ---------------- */}
      {/* The page title and subtitle are now rendered inside the ScrollView, 
        but outside the grid, which is appropriate.
      */}
      <Text style={styles.pageTitle}>Select Filter Category</Text>
      <Text style={styles.pageSubtitle}>
        Choose how you would like to view and sort the voter lists.
      </Text>

      {/* ---------------- GRID ---------------- */}
      <View style={styles.grid}>
        {menuItems.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.card} 
            onPress={() => handleCardPress(item.targetScreen as keyof RootStackParamList)}
          >
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
      
      {/* ---------------- FOOTER (Retaining local footer text) ---------------- */}
      <Text style={styles.footerText}>
        © 2023 Chalisgaon Municipal Council. All rights reserved.
      </Text>
    </ScrollView>
  );

  return (
    // 💡 3. WRAP CONTENT WITH ScreenWrapper
    <ScreenWrapper 
        activeMenuId="listoptions" // Set the active menu item ID
        headerTitle="List Options"
        headerSubtitle={isWeb ? "Dashboard > List Options" : undefined}
        onMenuItemPress={handleMenuNavigation} // Pass the required navigation handler
    >
        {MainContent()}

        {!isWeb && (
            // Use the FAB for mobile menu navigation
            <FAB iconName="menu" onPress={() => console.log('Open Mobile Menu')} />
        )}
    </ScreenWrapper>
  );
}

// ====================== STYLES ======================
const styles = StyleSheet.create({
  // Removed container styles as ScreenWrapper handles the main background/flex

  /* ---------------- SCROLL CONTENT ---------------- */
  scrollContent: {
      flexGrow: 1,
      paddingBottom: 40,
  },

  /* ---------------- TEXT (Retaining styles that are not part of ScreenWrapper) ---------------- */
  // Removed breadcrumb style as ScreenWrapper handles headerSubtitle
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