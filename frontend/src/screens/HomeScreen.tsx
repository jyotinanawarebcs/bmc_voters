import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Platform, 
  useWindowDimensions, 
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation, DrawerActions, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types"; // Assuming you import RootStackParamList here if using typed navigation

// --- IMPORT REUSABLE LAYOUT COMPONENTS ---
import ScreenWrapper from "../navigation/ScreenWrapper"; 
import FAB from "../components/FAB"; 


// ================= CARD DATA =================
const DATA = [
  {
    id: "1",
    title: "Search",
    subtitle: "Find properties, records, and documents.",
    icon: "search",
    screen: "VoterListScreen",
  },
  {
    id: "2",
    title: "Advanced Search",
    subtitle: "Filter by date, category, and ID.",
    icon: "filter",
    screen: "AdvancedSearchScreen",
  },
  {
    id: "3",
    title: "Lists",
    subtitle: "View beneficiary and application lists.",
    icon: "list",
    // 💡 The card press already handles navigation via this screen name
    screen: "ListOptionsScreen", 
  },
  {
    id: "4",
    title: "All Services",
    subtitle: "Access all municipal surveys and forms.",
    icon: "clipboard",
    screen: "AllServicesScreen",
  },
  {
    id: "5",
    title: "Data",
    subtitle: "View statistics and council reports.",
    icon: "bar-chart-2",
    screen: "DataScreen",
  },
  {
    id: "6",
    title: "Settings",
    subtitle: "Manage profile and app preferences.",
    icon: "settings",
    screen: "SettingsScreen",
  },
];

// --- Dashboard Card Component ---
const DashboardGridCard = ({ item, handlePress, cardWidth }: any) => (
  <TouchableOpacity
    style={[styles.card, { width: cardWidth }]}
    activeOpacity={0.85}
    onPress={() => handlePress(item.screen)}
  >
    <View style={styles.iconCircle}>
      <Feather name={item.icon as any} size={28} color="#3F7CFF" />
    </View>

    <Text style={styles.cardTitle}>{item.title}</Text>
    <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
  </TouchableOpacity>
);


export default function HomeScreen() {
  // Use typed navigation if RootStackParamList is available, otherwise use 'any' as you did.
  const navigation = useNavigation<NavigationProp<RootStackParamList>>(); 
  const { width } = useWindowDimensions();

  const isWeb = Platform.OS === 'web' && width > 768; 
  const numColumns = isWeb ? 3 : 2; 
  const cardWidth = isWeb ? '31%' : '48%';


  // 💡 1. HANDLER FOR CARD PRESS (Already working for "Lists" -> ListOptionsScreen)
  const handleCardPress = (screen?: keyof RootStackParamList) => {
    if (screen) {
      // Ensure the screen exists in your RootStackParamList
      navigation.navigate(screen as any); 
    }
  };
  
  // 💡 2. HANDLER FOR SIDEBAR MENU CLICKS (New required function)
  const handleMenuNavigation = (menuId: string) => {
    // Assuming the Dashboard's ID in your MENU_ITEMS is 'dashboard'
    if (menuId === 'dashboard') {
        // Already on this screen, but included for completeness
        console.log('Already on Dashboard');
        // If navigating to other screens via sidebar:
    } else if (menuId === 'voterlist') {
        navigation.navigate('VoterListScreen'); 
    }
    // Add logic for other menu items as needed
  };

  const MainContent = () => (
    <>
      <FlatList
        data={DATA}
        numColumns={numColumns}
        contentContainerStyle={styles.flatListContent}
        columnWrapperStyle={styles.columnWrapper}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DashboardGridCard 
            item={item} 
            handlePress={handleCardPress} 
            cardWidth={cardWidth} 
          />
        )}
      />
    </>
  );

  return (
    <ScreenWrapper
      activeMenuId="dashboard" 
      headerTitle="Chalisgaon Municipal Council" 
      // headerSubtitle={isWeb ? "Digital Citizen Portal" : undefined} 
      showBackArrow={false} // Hides the back arrow
      
      // 💡 3. PASS THE REQUIRED SIDEBAR NAVIGATION HANDLER
      onMenuItemPress={handleMenuNavigation}
    >
      {MainContent()}
      
      {!isWeb && (
          <FAB iconName="menu" onPress={() => navigation.dispatch(DrawerActions.openDrawer())} />
      )}
    </ScreenWrapper>
  );
}

// ================= STYLES =================
const styles = StyleSheet.create({
  flatListContent: {
    flexGrow: 1, 
    paddingVertical: 10,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 18,
  },
  card: {
    backgroundColor: "#fff",
    paddingVertical: 25,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    height: 180, 
  },
  iconCircle: {
    backgroundColor: "#eaf0ff",
    padding: 14,
    borderRadius: 50,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 4,
    textAlign: "center",
  },
  cardSubtitle: {
    fontSize: 11,
    textAlign: "center",
    color: "#606777",
  },
  footerContainer: {
    paddingTop: 15,
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
  },
  footerCouncilTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
  },
  footerDetails: {
    fontSize: 10,
    color: '#888',
    marginTop: 4,
  },
});