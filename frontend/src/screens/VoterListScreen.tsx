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


  // 💡 2. NAVIGATION HANDLER
  const handleCardPress = (voter: Voter) => {
    // This is now correctly typed and will not cause the 'never' error
    navigation.navigate('VoterProfileScreen', { voterId: voter.id, voterData: voter });
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

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   Image,
//   TouchableOpacity,
//   FlatList,
//   Platform, 
//   useWindowDimensions, 
// } from "react-native";
// import Feather from "react-native-vector-icons/Feather";
// import MaterialIcons from "react-native-vector-icons/MaterialIcons";

// // --- INTERFACE AND SAMPLE DATA ---

// interface Voter {
//   id: number;
//   name: string;
//   ward: string;
//   booth: string;
//   serial: string;
//   image: string;
// }

// const SAMPLE_DATA: Voter[] = [
//   {
//     id: 1,
//     name: "Virendra Bhaskarrao Wagh",
//     ward: "Chalisgaon (Ward 1)",
//     booth: "0",
//     serial: "1",
//     image: "https://i.pravatar.cc/300?img=1",
//   },
//   {
//     id: 2,
//     name: "Shivanand Bhaskar Wagh",
//     ward: "Chalisgaon (Ward 1)",
//     booth: "0",
//     serial: "2",
//     image: "https://i.pravatar.cc/300?img=2",
//   },
//   {
//     id: 3,
//     name: "Revati Tushar Khairnar",
//     ward: "Chalisgaon (Ward 1)",
//     booth: "0",
//     serial: "3",
//     image: "https://i.pravatar.cc/300?img=3",
//   },
//   {
//     id: 4,
//     name: "Surekha Gorkhnath Dhage",
//     ward: "Chalisgaon (Ward 1)",
//     booth: "0",
//     serial: "4",
//     image: "https://i.pravatar.cc/300?img=4",
//   },
//   {
//     id: 5,
//     name: "Snehalata Bhalchandra",
//     ward: "Chalisgaon (Ward 1)",
//     booth: "0",
//     serial: "5",
//     image: "https://i.pravatar.cc/300?img=5",
//   },
//   {
//     id: 6,
//     name: "Arvind Bhalchandra",
//     ward: "Chalisgaon (Ward 1)",
//     booth: "0",
//     serial: "6",
//     image: "https://i.pravatar.cc/300?img=6",
//   },
// ];

// // --- SIDEBAR COMPONENT ---

// const MENU_ITEMS = [
//   { id: 'dashboard', name: 'Dashboard', icon: 'dashboard' },
//   { id: 'voterlist', name: 'Voter List', icon: 'list' },
//   { id: 'pollingbooths', name: 'Polling Booths', icon: 'map-pin' },
//   { id: 'statistics', name: 'Statistics', icon: 'bar-chart-2' },
// ];

// const Sidebar: React.FC<{ activeId: string }> = ({ activeId }) => (
//   <View style={styles.sidebar}>
//     {/* Council Logo/Title */}
//     <View style={styles.sidebarHeader}>
//       <View style={styles.councilLogo}>
//         <Text style={styles.councilLogoText}>C</Text>
//       </View>
//       <View>
//         <Text style={styles.councilTitle}>Chalisgaon</Text>
//         <Text style={styles.councilSubtitle}>Municipal Council</Text>
//       </View>
//     </View>

//     {/* Menu Items */}
//     <View style={styles.menuContainer}>
//       {MENU_ITEMS.map((item) => (
//         <TouchableOpacity
//           key={item.id}
//           style={[
//             styles.menuItem,
//             activeId === item.id && styles.menuItemActive,
//           ]}
//         >
//           <Feather
//             name={item.icon as any}
//             size={20}
//             color={activeId === item.id ? '#0d2b8f' : '#666'}
//           />
//           <Text
//             style={[
//               styles.menuItemText,
//               activeId === item.id && styles.menuItemTextActive,
//             ]}
//           >
//             {item.name}
//           </Text>
//         </TouchableOpacity>
//       ))}
//     </View>

//     {/* Logout */}
//     <View style={styles.logoutContainer}>
//       <TouchableOpacity style={styles.menuItem}>
//         <Feather name="log-out" size={20} color="#666" />
//         <Text style={styles.menuItemText}>Logout</Text>
//       </TouchableOpacity>
//     </View>
//   </View>
// );

// // --- GRID CARD COMPONENT ---

// const GridCard = ({ item }: { item: Voter }) => (
//   <View style={styles.gridCard}>
//     {/* Green right border */}
//     <View style={styles.statusLine} />

//     {/* Top content */}
//     <View style={styles.gridHeader}>
//       <Image source={{ uri: item.image }} style={styles.gridAvatar} />

//       <View style={{ flex: 1 }}>
//         <Text style={styles.gridName}>{item.name}</Text>
//         <Text style={styles.gridWard}>{item.ward}</Text>

//         <View style={styles.gridBadges}>
//           <View style={styles.gridStatusDot} /> 
          
//           <View style={styles.gridTagBlue}>
//             <Text style={styles.tagText}>Booth: {item.booth}</Text>
//           </View>
//           <View style={styles.gridTagOrange}>
//             <Text style={styles.tagText}>Serial: {item.serial}</Text>
//           </View>
//         </View>
//       </View>

//       <Feather name="more-horizontal" size={20} color="#777" />
//     </View>

//     {/* Contact Icons Row */}
//     <View style={styles.gridContactIcons}>
//       <Feather name="message-square" size={20} color="#666" />
//       <Feather name="phone" size={20} color="#666" />
//       <Feather name="printer" size={20} color="#666" />
//       <Feather name="calendar" size={20} color="#666" />
//     </View>


//     {/* Bottom view details */}
//     <TouchableOpacity style={styles.gridDetails}>
//       <Text style={styles.detailsText}>View Details →</Text>
//     </TouchableOpacity>
//   </View>
// );


// // --- MAIN SCREEN COMPONENT ---

// const VoterListScreen: React.FC = () => {
//   const [search, setSearch] = useState("");
//   const { width } = useWindowDimensions();
//   // Sidebar appears when width is > 768px (standard tablet/desktop breakpoint)
//   const isWeb = Platform.OS === 'web' && width > 768; 

//   // Render the main content (Search bar, Cards, Pagination)
//   const MainContent = () => (
//     <View style={isWeb ? styles.mainContentWeb : styles.mainContentMobile}>
//       {/* Top Header/Breadcrumbs (Visible on Web Only) */}
//       {isWeb && (
//         <View style={styles.topBarWeb}>
//           <Text style={styles.breadcrumb}>
//             Home &gt; Voter Management &gt; <Text style={styles.activeBreadcrumb}>All Voters List</Text>
//           </Text>
//         </View>
//       )}

//       {/* Main Content Area */}
//       <View style={styles.mainInnerContent}>
        
//         {/* Search & Filter Bar */}
//         <View style={styles.searchFilterRow}>
//           <View style={styles.searchBox}>
//             <Feather name="search" size={20} color="#888" />
//             <TextInput
//               placeholder="Search by name, serial no..."
//               value={search}
//               onChangeText={setSearch}
//               style={styles.input}
//             />
//             <Feather name="mic" size={20} color="#555" />
//           </View>

//           <View style={styles.filterGroup}>
//             <TouchableOpacity style={styles.filterDropdown}>
//               <Text style={styles.filterText}>All Wards</Text>
//               <Feather name="chevron-down" size={16} color="#444" />
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.filterButton}>
//               <Feather name="filter" size={16} color="#fff" />
//               <Text style={styles.filterButtonText}>Filter</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
        
//         {/* GRID (2 or 3 Column Cards) */}
//         <FlatList
//           data={SAMPLE_DATA}
//           numColumns={isWeb ? 3 : 2} // 3 columns for web, 2 for smaller screens
//           columnWrapperStyle={styles.columnWrapper}
//           renderItem={({ item }) => <GridCard item={item} />}
//           keyExtractor={(item) => item.id.toString()}
//           contentContainerStyle={{ paddingBottom: 100 }}
//           style={styles.gridList}
//         />

//         {/* Pagination */}
//         <View style={styles.pagination}>
//           <TouchableOpacity style={styles.pageBtn}>
//             <Feather name="chevron-left" size={18} color="#000" />
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.pageBtnActive}>
//             <Text style={styles.activeText}>1</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.pageBtn}>
//             <Text>2</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.pageBtn}>
//             <Text>3</Text>
//           </TouchableOpacity>
          
//           <TouchableOpacity style={styles.pageBtn}>
//             <Text>10</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.pageBtn}>
//             <Feather name="chevron-right" size={18} color="#000" />
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );

//   if (isWeb) {
//     // Web Layout (Sidebar + Main Content)
//     return (
//       <View style={styles.webContainer}>
//         <Sidebar activeId="voterlist" />
//         <View style={styles.webMainArea}>
//           {/* Header Bar for Web */}
//           <View style={styles.headerWeb}>
//             <View style={styles.headerLeftWeb}>
//               <Feather name="arrow-left" size={24} color="#fff" style={{ marginRight: 20 }} />
//               <Text style={styles.headerTitleWeb}>Total Voters: 94,723</Text>
//             </View>
//             <View style={styles.headerRightWeb}>
//               <Text style={styles.headerStatusText}>Status: Active</Text>
//               <Feather name="bell" size={20} color="#fff" />
//             </View>
//           </View>
//           {MainContent()}
//         </View>
//       </View>
//     );
//   } else {
//     // Mobile Layout (Header + Main Content)
//     return (
//       <View style={styles.containerMobile}>
//         {/* Header for Mobile */}
//         <View style={styles.headerMobile}>
//           <Feather name="arrow-left" size={26} color="#fff" />
//           <Text style={styles.headerTitleMobile}>Total Voters: 94,723</Text>
//           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//             <Text style={styles.headerStatusText}>Status: Active</Text>
//             <Feather name="bell" size={20} color="#fff" style={{ marginLeft: 10 }} />
//           </View>
//         </View>
//         {MainContent()}
        
//         {/* Floating Button for Mobile Menu */}
//         <TouchableOpacity style={styles.fab}>
//           <Feather name="menu" size={26} color="#fff" /> {/* Changed icon for mobile menu */}
//         </TouchableOpacity>
//       </View>
//     );
//   }
// };

// export default VoterListScreen;

// // ==================== STYLES ====================
// const styles = StyleSheet.create({
//   // --- Global / Mobile Container ---
//   containerMobile: { flex: 1, backgroundColor: "#f5f6fb" },

//   // --- Web Container Styles ---
//   webContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     backgroundColor: "#f5f6fb",
//   },
//   webMainArea: {
//     flex: 1, 
//   },
  
//   // --- Sidebar Styles (Web Only) ---
//   sidebar: {
//     width: 250, 
//     backgroundColor: '#fff',
//     borderRightWidth: 1,
//     borderRightColor: '#eee',
//     paddingVertical: 20,
//     justifyContent: 'space-between',
//   },
//   sidebarHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     marginBottom: 30,
//   },
//   councilLogo: {
//     width: 30,
//     height: 30,
//     borderRadius: 5,
//     backgroundColor: '#0d2b8f',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 10,
//   },
//   councilLogoText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 18,
//   },
//   councilTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#222',
//   },
//   councilSubtitle: {
//     fontSize: 12,
//     color: '#666',
//   },
//   menuContainer: {
//     flex: 1,
//   },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     marginVertical: 2,
//   },
//   menuItemActive: {
//     backgroundColor: '#e6efff',
//     borderLeftWidth: 4,
//     borderLeftColor: '#0d2b8f',
//   },
//   menuItemText: {
//     fontSize: 15,
//     marginLeft: 15,
//     color: '#666',
//   },
//   menuItemTextActive: {
//     fontWeight: '600',
//     color: '#0d2b8f',
//   },
//   logoutContainer: {
//     borderTopWidth: 1,
//     borderTopColor: '#eee',
//     paddingTop: 10,
//   },

//   // --- Header Styles (Shared & Web/Mobile Specific) ---
//   headerWeb: {
//     height: 60,
//     backgroundColor: "#0d2b8f",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//   },
//   headerLeftWeb: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   headerTitleWeb: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "600",
//   },
//   headerRightWeb: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 15,
//   },
//   headerStatusText: {
//     color: "#fff",
//     fontSize: 14,
//     fontWeight: '500',
//   },
//   headerMobile: {
//     backgroundColor: "#0d2b8f",
//     paddingVertical: 18,
//     paddingHorizontal: 16,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: 'space-between',
//   },
//   headerTitleMobile: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "600",
//     flex: 1,
//     marginLeft: 15,
//   },

//   // --- Main Content Area ---
//   mainContentWeb: {
//     flex: 1,
//   },
//   mainContentMobile: {
//     flex: 1,
//     paddingHorizontal: 15, 
//   },

//   // --- Web Top Bar (Breadcrumbs) ---
//   topBarWeb: {
//     backgroundColor: '#fff',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   breadcrumb: {
//     fontSize: 13,
//     color: '#888',
//   },
//   activeBreadcrumb: {
//     fontWeight: '600',
//     color: '#0d2b8f',
//   },

//   mainInnerContent: {
//     flex: 1,
//     paddingHorizontal: Platform.OS === 'web' ? 20 : 0, 
//     paddingTop: 15,
//   },


//   // --- Search and Filter Bar ---
//   searchFilterRow: {
//     flexDirection: Platform.OS === 'web' ? 'row' : 'column',
//     alignItems: Platform.OS === 'web' ? 'center' : 'stretch',
//     justifyContent: 'space-between',
//     marginBottom: 15,
//     backgroundColor: Platform.OS === 'web' ? '#fff' : 'transparent',
//     borderRadius: 10,
//     padding: Platform.OS === 'web' ? 10 : 0,
//     elevation: Platform.OS === 'web' ? 2 : 0,
    
//   },
//   searchBox: {
//     flexDirection: "row",
//     backgroundColor: Platform.OS === 'web' ? '#f5f6fb' : '#fff',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: "center",
//     flex: Platform.OS === 'web' ? 1 : 1,
//     marginRight: Platform.OS === 'web' ? 15 : 0,
//     elevation: Platform.OS === 'web' ? 0 : 2,
//     marginTop: Platform.OS === 'web' ? 0 : 15,
//     marginBottom: Platform.OS === 'web' ? 0 : 10,
//   },
//   input: {
//     flex: 1,
//     marginHorizontal: 10,
//     fontSize: 15,
//     color: "#333",
//     paddingVertical: 0,
//   },
//   filterGroup: {
//     flexDirection: 'row',
//     gap: 10,
//   },
//   filterDropdown: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     padding: 10,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#ddd',
//   },
//   filterText: {
//     marginRight: 8,
//     fontSize: 15,
//     color: '#444',
//   },
//   filterButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#0d2b8f',
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     borderRadius: 8,
//   },
//   filterButtonText: {
//     color: '#fff',
//     fontSize: 15,
//     fontWeight: '600',
//     marginLeft: 8,
//   },

//   // ================= GRID STYLE =================
//   gridList: {
//   },
//   columnWrapper: {
//     justifyContent: "space-between",
//     marginBottom: 15,
//   },
//   gridCard: {
//     width: Platform.OS === 'web' ? '32%' : '48%', 
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     padding: 12,
//     elevation: 3,
//     position: "relative",
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//   },
//   statusLine: {
//     position: "absolute",
//     right: 0,
//     top: 0,
//     width: 4,
//     height: "100%",
//     backgroundColor: "#22c55e",
//     borderTopRightRadius: 12,
//     borderBottomRightRadius: 12,
//   },
//   gridHeader: {
//     flexDirection: "row",
//     marginBottom: 8,
//   },
//   gridAvatar: {
//     width: 55,
//     height: 55,
//     borderRadius: 10,
//     marginRight: 10,
//   },
//   gridName: {
//     fontSize: 15,
//     fontWeight: "600",
//     color: "#222",
//   },
//   gridWard: {
//     fontSize: 12,
//     color: "#666",
//     marginTop: 2,
//   },
//   gridBadges: {
//     flexDirection: "row",
//     marginTop: 6,
//     alignItems: 'center',
//     gap: 6,
//   },
//   gridStatusDot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: '#22c55e',
//   },
//   gridTagBlue: {
//     backgroundColor: "#e6efff",
//     paddingVertical: 3,
//     paddingHorizontal: 8,
//     borderRadius: 6,
//   },
//   gridTagOrange: {
//     backgroundColor: "#ffe8d9",
//     paddingVertical: 3,
//     paddingHorizontal: 8,
//     borderRadius: 6,
//   },
//   tagText: { fontSize: 10, color: "#444", fontWeight: '500' },
  
//   gridContactIcons: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     paddingVertical: 10,
//     borderTopWidth: 1,
//     borderTopColor: '#eee',
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//     marginBottom: 8,
//   },

//   gridDetails: {
//     marginTop: 5,
//     alignItems: "flex-end",
//   },
//   detailsText: {
//     color: "#0d47a1",
//     fontSize: 13,
//     fontWeight: "600",
//   },
  
//   // --- Pagination and FAB ---
//   pagination: {
//     flexDirection: "row",
//     justifyContent: "center",
//     gap: 10,
//     paddingVertical: 15,
//     borderTopWidth: Platform.OS === 'web' ? 1 : 0,
//     borderTopColor: '#e0e0e0',
//     backgroundColor: Platform.OS === 'web' ? '#fff' : 'transparent',
//   },
//   pageBtn: {
//     paddingHorizontal: 14,
//     paddingVertical: 8,
//     backgroundColor: "#fff",
//     borderRadius: 6,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   pageBtnActive: {
//     paddingHorizontal: 14,
//     paddingVertical: 8,
//     backgroundColor: "#0d47a1",
//     borderRadius: 6,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   activeText: {
//     color: "#fff",
//     fontWeight: "700",
//   },
//   fab: {
//     position: "absolute",
//     bottom: 25,
//     right: 25,
//     backgroundColor: "#ff6a00",
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     alignItems: "center",
//     justifyContent: "center",
//     elevation: 6,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 3,
//   },
// });