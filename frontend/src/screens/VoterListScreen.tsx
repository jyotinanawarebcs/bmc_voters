import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Platform, 
  useWindowDimensions, 
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
// 💡 CORRECTED IMPORTS
import { useNavigation, NavigationProp } from '@react-navigation/native'; 
import { RootStackParamList } from '../navigation/types'; // Import the defined route types

// --- IMPORTING MODULES & DATA ---
import ScreenWrapper from "../navigation/ScreenWrapper";
import GridVoterCard from "../components/GridVoterCard"; 
import FAB from "../components/FAB"; 
import { Voter, SAMPLE_DATA } from "../api/type"; // Ensure correct path to data/type

// --- MAIN SCREEN COMPONENT ---

const VoterListScreen: React.FC = () => {
  const [search, setSearch] = useState("");
  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === 'web' && width > 768; 
  const numColumns = isWeb ? 3 : 2; 

  // 💡 1. GET NAVIGATION HOOK AND APPLY TYPE
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();


  // 💡 2. CARD NAVIGATION HANDLER
  const handleCardPress = (voter: Voter) => {
    // This is now correctly typed and will not cause the 'never' error
    navigation.navigate('VoterProfileScreen', { voterId: voter.id, voterData: voter });
  };
  
  // 💡 FIX 1: DEFINE THE SIDEBAR NAVIGATION HANDLER
  const handleMenuNavigation = (menuId: string) => {
      if (menuId === 'dashboard') {
          navigation.navigate('Dashboard'); 
      } else if (menuId === 'voterlist') {
          // Already on this screen, but included for completeness
          console.log('Already on Voter List Screen');
      }
      // Add logic for other menu IDs like 'pollingbooths', 'statistics', etc.
  };


  // Render the main content (Search bar, Cards, Pagination)
  const MainContent = () => (
    <View style={styles.mainInnerContent}>
      
      {/* Search & Filter Bar */}
      <View style={styles.searchFilterRow}>
        <View style={styles.searchBox}>
          <Feather name="search" size={20} color="#888" />
          <TextInput
            placeholder="Search by name, serial no..."
            value={search}
            onChangeText={setSearch}
            style={styles.input}
          />
          <Feather name="mic" size={20} color="#555" />
        </View>

        <View style={styles.filterGroup}>
          <TouchableOpacity style={styles.filterDropdown}>
            <Text style={styles.filterText}>All Wards</Text>
            <Feather name="chevron-down" size={16} color="#444" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.filterButton}>
            <Feather name="filter" size={16} color="#fff" />
            <Text style={styles.filterButtonText}>Filter</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* GRID (2 or 3 Column Cards) */}
      <FlatList
        data={SAMPLE_DATA}
        numColumns={numColumns}
        columnWrapperStyle={styles.columnWrapper}
        // 💡 3. PASS onPRESS HANDLER TO CARD
        renderItem={({ item }) => (
          <GridVoterCard 
            item={item} 
            onPress={() => handleCardPress(item)} 
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 100 }}
        style={styles.gridList}
      />

      {/* Pagination */}
      <View style={styles.pagination}>
        <TouchableOpacity style={styles.pageBtn}>
          <Feather name="chevron-left" size={18} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.pageBtnActive}>
          <Text style={styles.activeText}>1</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.pageBtn}>
          <Text>2</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.pageBtn}>
          <Text>3</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.pageBtn}>
          <Text>10</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.pageBtn}>
          <Feather name="chevron-right" size={18} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScreenWrapper 
        activeMenuId="voterlist" 
        headerTitle="Total Voters: 94,723"
        headerSubtitle={isWeb ? "Home > Voter Management > All Voters List" : undefined}
        // 💡 FIX 2: PASS the required sidebar navigation handler
        onMenuItemPress={handleMenuNavigation}
    >
        {MainContent()}

        {!isWeb && (
            <FAB iconName="menu" onPress={() => console.log('Open Mobile Menu')} />
        )}
    </ScreenWrapper>
  );
};

export default VoterListScreen;

// ==================== STYLES ====================
const styles = StyleSheet.create({
  // --- Inner Content Area ---
  mainInnerContent: {
    flex: 1,
  },

  // --- Search and Filter Bar ---
  searchFilterRow: {
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    alignItems: Platform.OS === 'web' ? 'center' : 'stretch',
    justifyContent: 'space-between',
    marginBottom: 15,
    backgroundColor: Platform.OS === 'web' ? '#fff' : 'transparent',
    borderRadius: 10,
    padding: Platform.OS === 'web' ? 10 : 0,
    elevation: Platform.OS === 'web' ? 2 : 0,
  },
  searchBox: {
    flexDirection: "row",
    backgroundColor: Platform.OS === 'web' ? '#f5f6fb' : '#fff',
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    flex: Platform.OS === 'web' ? 1 : 1,
    marginRight: Platform.OS === 'web' ? 15 : 0,
    elevation: Platform.OS === 'web' ? 0 : 2,
    marginTop: Platform.OS === 'web' ? 0 : 15,
    marginBottom: Platform.OS === 'web' ? 0 : 10,
  },
  input: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 15,
    color: "#333",
    paddingVertical: 0,
  },
  filterGroup: {
    flexDirection: 'row',
    gap: 10,
  },
  filterDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filterText: {
    marginRight: 8,
    fontSize: 15,
    color: '#444',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0d2b8f',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
  },
  filterButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 8,
  },

  // ================= GRID STYLE =================
  gridList: {
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 15,
  },
  
  // --- Pagination ---
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 15,
    borderTopWidth: Platform.OS === 'web' ? 1 : 0,
    borderTopColor: '#e0e0e0',
    backgroundColor: Platform.OS === 'web' ? '#fff' : 'transparent',
  },
  pageBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageBtnActive: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: "#0d47a1",
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeText: {
    color: "#fff",
    fontWeight: "700",
  },
});

