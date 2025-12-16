  // // import React, { useState } from "react";
  // // import {
  // //   View,
  // //   Text,
  // //   StyleSheet,
  // //   TextInput,
  // //   TouchableOpacity,
  // //   FlatList,
  // //   Platform, 
  // //   useWindowDimensions, 
  // // } from "react-native";
  // // import Feather from "react-native-vector-icons/Feather";
  // // // 💡 CORRECTED IMPORTS
  // // import { useNavigation, NavigationProp } from '@react-navigation/native'; 
  // // import { RootStackParamList } from '../navigation/types'; // Import the defined route types

  // // // --- IMPORTING MODULES & DATA ---
  // // import ScreenWrapper from "../navigation/ScreenWrapper";
  // // import GridVoterCard from "../components/GridVoterCard"; 
  // // import FAB from "../components/FAB"; 
  // // import { Voter, SAMPLE_DATA } from "../api/type"; // Ensure correct path to data/type

  // // // --- MAIN SCREEN COMPONENT ---

  // // const VoterListScreen: React.FC = () => {
  // //   const [search, setSearch] = useState("");
  // //   const { width } = useWindowDimensions();
  // //   const isWeb = Platform.OS === 'web' && width > 768; 
  // //   const numColumns = isWeb ? 3 : 2; 

  // //   // 💡 1. GET NAVIGATION HOOK AND APPLY TYPE
  // //   const navigation = useNavigation<NavigationProp<RootStackParamList>>();


  // //   // 💡 2. CARD NAVIGATION HANDLER
  // //   const handleCardPress = (voter: Voter) => {
  // //     // This is now correctly typed and will not cause the 'never' error
  // //     navigation.navigate('VoterProfileScreen', { voterId: voter.id, voterData: voter });
  // //   };

  // //   // 💡 FIX 1: DEFINE THE SIDEBAR NAVIGATION HANDLER
  // //   const handleMenuNavigation = (menuId: string) => {
  // //       if (menuId === 'dashboard') {
  // //           navigation.navigate('Dashboard'); 
  // //       } else if (menuId === 'voterlist') {
  // //           // Already on this screen, but included for completeness
  // //           console.log('Already on Voter List Screen');
  // //       }
  // //       // Add logic for other menu IDs like 'pollingbooths', 'statistics', etc.
  // //   };


  // //   // Render the main content (Search bar, Cards, Pagination)
  // //   const MainContent = () => (
  // //     <View style={styles.mainInnerContent}>

  // //       {/* Search & Filter Bar */}
  // //       <View style={styles.searchFilterRow}>
  // //         <View style={styles.searchBox}>
  // //           <Feather name="search" size={20} color="#888" />
  // //           <TextInput
  // //             placeholder="Search by name, serial no..."
  // //             value={search}
  // //             onChangeText={setSearch}
  // //             style={styles.input}
  // //           />
  // //           <Feather name="mic" size={20} color="#555" />
  // //         </View>

  // //         <View style={styles.filterGroup}>
  // //           <TouchableOpacity style={styles.filterDropdown}>
  // //             <Text style={styles.filterText}>All Wards</Text>
  // //             <Feather name="chevron-down" size={16} color="#444" />
  // //           </TouchableOpacity>

  // //           <TouchableOpacity style={styles.filterButton}>
  // //             <Feather name="filter" size={16} color="#fff" />
  // //             <Text style={styles.filterButtonText}>Filter</Text>
  // //           </TouchableOpacity>
  // //         </View>
  // //       </View>

  // //       {/* GRID (2 or 3 Column Cards) */}
  // //       <FlatList
  // //         data={SAMPLE_DATA}
  // //         numColumns={numColumns}
  // //         columnWrapperStyle={styles.columnWrapper}
  // //         // 💡 3. PASS onPRESS HANDLER TO CARD
  // //         renderItem={({ item }) => (
  // //           <GridVoterCard 
  // //             item={item} 
  // //             onPress={() => handleCardPress(item)} 
  // //           />
  // //         )}
  // //         keyExtractor={(item) => item.id.toString()}
  // //         contentContainerStyle={{ paddingBottom: 100 }}
  // //         style={styles.gridList}
  // //       />

  // //       {/* Pagination */}
  // //       <View style={styles.pagination}>
  // //         <TouchableOpacity style={styles.pageBtn}>
  // //           <Feather name="chevron-left" size={18} color="#000" />
  // //         </TouchableOpacity>

  // //         <TouchableOpacity style={styles.pageBtnActive}>
  // //           <Text style={styles.activeText}>1</Text>
  // //         </TouchableOpacity>

  // //         <TouchableOpacity style={styles.pageBtn}>
  // //           <Text>2</Text>
  // //         </TouchableOpacity>

  // //         <TouchableOpacity style={styles.pageBtn}>
  // //           <Text>3</Text>
  // //         </TouchableOpacity>

  // //         <TouchableOpacity style={styles.pageBtn}>
  // //           <Text>10</Text>
  // //         </TouchableOpacity>

  // //         <TouchableOpacity style={styles.pageBtn}>
  // //           <Feather name="chevron-right" size={18} color="#000" />
  // //         </TouchableOpacity>
  // //       </View>
  // //     </View>
  // //   );

  // //   return (
  // //     <ScreenWrapper 
  // //         activeMenuId="voterlist" 
  // //         headerTitle="Total Voters: 94,723"
  // //         headerSubtitle={isWeb ? "Home > Voter Management > All Voters List" : undefined}
  // //         // 💡 FIX 2: PASS the required sidebar navigation handler
  // //         onMenuItemPress={handleMenuNavigation}
  // //     >
  // //         {MainContent()}

  // //         {!isWeb && (
  // //             <FAB iconName="menu" onPress={() => console.log('Open Mobile Menu')} />
  // //         )}
  // //     </ScreenWrapper>
  // //   );
  // // };

  // // export default VoterListScreen;

  // // // ==================== STYLES ====================
  // // const styles = StyleSheet.create({
  // //   // --- Inner Content Area ---
  // //   mainInnerContent: {
  // //     flex: 1,
  // //   },

  // //   // --- Search and Filter Bar ---
  // //   searchFilterRow: {
  // //     flexDirection: Platform.OS === 'web' ? 'row' : 'column',
  // //     alignItems: Platform.OS === 'web' ? 'center' : 'stretch',
  // //     justifyContent: 'space-between',
  // //     marginBottom: 15,
  // //     backgroundColor: Platform.OS === 'web' ? '#fff' : 'transparent',
  // //     borderRadius: 10,
  // //     padding: Platform.OS === 'web' ? 10 : 0,
  // //     elevation: Platform.OS === 'web' ? 2 : 0,
  // //   },
  // //   searchBox: {
  // //     flexDirection: "row",
  // //     backgroundColor: Platform.OS === 'web' ? '#f5f6fb' : '#fff',
  // //     padding: 12,
  // //     borderRadius: 8,
  // //     alignItems: "center",
  // //     flex: Platform.OS === 'web' ? 1 : 1,
  // //     marginRight: Platform.OS === 'web' ? 15 : 0,
  // //     elevation: Platform.OS === 'web' ? 0 : 2,
  // //     marginTop: Platform.OS === 'web' ? 0 : 15,
  // //     marginBottom: Platform.OS === 'web' ? 0 : 10,
  // //   },
  // //   input: {
  // //     flex: 1,
  // //     marginHorizontal: 10,
  // //     fontSize: 15,
  // //     color: "#333",
  // //     paddingVertical: 0,
  // //   },
  // //   filterGroup: {
  // //     flexDirection: 'row',
  // //     gap: 10,
  // //   },
  // //   filterDropdown: {
  // //     flexDirection: 'row',
  // //     alignItems: 'center',
  // //     backgroundColor: '#fff',
  // //     padding: 10,
  // //     borderRadius: 8,
  // //     borderWidth: 1,
  // //     borderColor: '#ddd',
  // //   },
  // //   filterText: {
  // //     marginRight: 8,
  // //     fontSize: 15,
  // //     color: '#444',
  // //   },
  // //   filterButton: {
  // //     flexDirection: 'row',
  // //     alignItems: 'center',
  // //     backgroundColor: '#0d2b8f',
  // //     paddingHorizontal: 15,
  // //     paddingVertical: 10,
  // //     borderRadius: 8,
  // //   },
  // //   filterButtonText: {
  // //     color: '#fff',
  // //     fontSize: 15,
  // //     fontWeight: '600',
  // //     marginLeft: 8,
  // //   },

  // //   // ================= GRID STYLE =================
  // //   gridList: {
  // //   },
  // //   columnWrapper: {
  // //     justifyContent: "space-between",
  // //     marginBottom: 15,
  // //   },

  // //   // --- Pagination ---
  // //   pagination: {
  // //     flexDirection: "row",
  // //     justifyContent: "center",
  // //     gap: 10,
  // //     paddingVertical: 15,
  // //     borderTopWidth: Platform.OS === 'web' ? 1 : 0,
  // //     borderTopColor: '#e0e0e0',
  // //     backgroundColor: Platform.OS === 'web' ? '#fff' : 'transparent',
  // //   },
  // //   pageBtn: {
  // //     paddingHorizontal: 14,
  // //     paddingVertical: 8,
  // //     backgroundColor: "#fff",
  // //     borderRadius: 6,
  // //     borderWidth: 1,
  // //     borderColor: '#ccc',
  // //     alignItems: 'center',
  // //     justifyContent: 'center',
  // //   },
  // //   pageBtnActive: {
  // //     paddingHorizontal: 14,
  // //     paddingVertical: 8,
  // //     backgroundColor: "#0d47a1",
  // //     borderRadius: 6,
  // //     alignItems: 'center',
  // //     justifyContent: 'center',
  // //   },
  // //   activeText: {
  // //     color: "#fff",
  // //     fontWeight: "700",
  // //   },
  // // });


  // import React, { useState, useEffect, useCallback } from "react";
  // import {
  //   View,
  //   Text,
  //   StyleSheet,
  //   TextInput,
  //   TouchableOpacity,
  //   FlatList,
  //   Platform,
  //   useWindowDimensions,
  //   ActivityIndicator,
  //   Alert,
  //   RefreshControl,
  // } from "react-native";
  // import Feather from "react-native-vector-icons/Feather";
  // import { useNavigation, NavigationProp } from '@react-navigation/native';
  // import { RootStackParamList } from '../navigation/types';

  // // Import components
  // import ScreenWrapper from "../navigation/ScreenWrapper";
  // import GridVoterCard from "../components/GridVoterCard";
  // import FAB from "../components/FAB";

  // // Import API and types
  // import { voterApi } from "../api/voterApi";
  // import { Voter } from "../api/type";

  // // Main Screen Component
  // const VoterListScreen: React.FC = () => {
  //   const [search, setSearch] = useState("");
  //   const [voters, setVoters] = useState<Voter[]>([]);
  //   const [loading, setLoading] = useState(true);
  //   const [refreshing, setRefreshing] = useState(false);
  //   const [currentPage, setCurrentPage] = useState(1);
  //   const [totalPages, setTotalPages] = useState(1);
  //   const [totalItems, setTotalItems] = useState(0);
  //   const [hasNext, setHasNext] = useState(false);
  //   const [hasPrevious, setHasPrevious] = useState(false);

  //   const { width } = useWindowDimensions();
  //   const isWeb = Platform.OS === 'web' && width > 768;
  //   const numColumns = isWeb ? 3 : 2;

  //   const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  //   // Fetch voters from API
  //   const fetchVoters = useCallback(async (page: number = 1, searchQuery: string = "") => {
  //     try {
  //       setLoading(true);

  //       let data;
  //       if (searchQuery.trim()) {
  //         data = await voterApi.searchVoters(searchQuery, page);
  //       } else {
  //         data = await voterApi.getVoters(page);
  //       }

  //       setVoters(data.voters);
  //       setCurrentPage(data.pagination.current_page);
  //       setTotalPages(data.pagination.total_pages);
  //       setTotalItems(data.pagination.total_items);
  //       setHasNext(data.pagination.has_next);
  //       setHasPrevious(data.pagination.has_previous);
  //     } catch (error: any) {
  //       console.error('Error fetching voters:', error);
  //       Alert.alert("Error", error.message || "Failed to load voters");
  //     } finally {
  //       setLoading(false);
  //       setRefreshing(false);
  //     }
  //   }, []);

  //   // Initial load
  //   useEffect(() => {
  //     fetchVoters(1, "");
  //   }, [fetchVoters]);

  //   // Handle search
  //   const handleSearch = () => {
  //     fetchVoters(1, search);
  //   };

  //   // Handle pagination
  //   const handlePageChange = (page: number) => {
  //     if (page >= 1 && page <= totalPages) {
  //       fetchVoters(page, search);
  //     }
  //   };

  //   // Pull to refresh
  //   const onRefresh = () => {
  //     setRefreshing(true);
  //     fetchVoters(currentPage, search);
  //   };

  //   // Handle card press
  //   const handleCardPress = (voter: Voter) => {
  //     navigation.navigate('VoterProfileScreen', { 
  //       voterId: voter.id, 
  //       voterData: voter 
  //     });
  //   };

  //   // Handle menu navigation
  //   const handleMenuNavigation = (menuId: string) => {
  //     if (menuId === 'dashboard') {
  //       navigation.navigate('Dashboard');
  //     }
  //     // Add other menu items as needed
  //   };

  //   // Render pagination buttons
  //   const renderPaginationButtons = () => {
  //     const buttons = [];

  //     // Previous button
  //     buttons.push(
  //       <TouchableOpacity
  //         key="prev"
  //         style={[styles.pageBtn, !hasPrevious && styles.pageBtnDisabled]}
  //         onPress={() => handlePageChange(currentPage - 1)}
  //         disabled={!hasPrevious}
  //       >
  //         <Feather name="chevron-left" size={18} color={hasPrevious ? "#000" : "#ccc"} />
  //       </TouchableOpacity>
  //     );

  //     // Page numbers
  //     const maxVisiblePages = 5;
  //     let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  //     let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  //     if (endPage - startPage + 1 < maxVisiblePages) {
  //       startPage = Math.max(1, endPage - maxVisiblePages + 1);
  //     }

  //     for (let i = startPage; i <= endPage; i++) {
  //       buttons.push(
  //         <TouchableOpacity
  //           key={i}
  //           style={[
  //             styles.pageBtn,
  //             i === currentPage && styles.pageBtnActive
  //           ]}
  //           onPress={() => handlePageChange(i)}
  //         >
  //           <Text style={i === currentPage ? styles.activeText : styles.pageText}>
  //             {i}
  //           </Text>
  //         </TouchableOpacity>
  //       );
  //     }

  //     // Next button
  //     buttons.push(
  //       <TouchableOpacity
  //         key="next"
  //         style={[styles.pageBtn, !hasNext && styles.pageBtnDisabled]}
  //         onPress={() => handlePageChange(currentPage + 1)}
  //         disabled={!hasNext}
  //       >
  //         <Feather name="chevron-right" size={18} color={hasNext ? "#000" : "#ccc"} />
  //       </TouchableOpacity>
  //     );

  //     return buttons;
  //   };

  //   // Render loading indicator
  //   if (loading && voters.length === 0) {
  //     return (
  //       <ScreenWrapper 
  //         activeMenuId="voterlist" 
  //         headerTitle="Loading voters..."
  //         onMenuItemPress={handleMenuNavigation}
  //       >
  //         <View style={styles.loadingContainer}>
  //           <ActivityIndicator size="large" color="#0d2b8f" />
  //           <Text style={styles.loadingText}>Loading voters...</Text>
  //         </View>
  //       </ScreenWrapper>
  //     );
  //   }

  //   // Main content
  //   const MainContent = () => (
  //     <View style={styles.mainInnerContent}>
  //       {/* Search & Filter Bar */}
  //       <View style={styles.searchFilterRow}>
  //         <View style={styles.searchBox}>
  //           <Feather name="search" size={20} color="#888" />
  //           <TextInput
  //             placeholder="Search by name, serial no..."
  //             value={search}
  //             onChangeText={setSearch}
  //             onSubmitEditing={handleSearch}
  //             style={styles.input}
  //             returnKeyType="search"
  //           />
  //           <TouchableOpacity onPress={handleSearch}>
  //             <Feather name="search" size={20} color="#555" />
  //           </TouchableOpacity>
  //         </View>

  //         <View style={styles.filterGroup}>
  //           <TouchableOpacity style={styles.filterDropdown}>
  //             <Text style={styles.filterText}>All Wards</Text>
  //             <Feather name="chevron-down" size={16} color="#444" />
  //           </TouchableOpacity>

  //           <TouchableOpacity style={styles.filterButton}>
  //             <Feather name="filter" size={16} color="#fff" />
  //             <Text style={styles.filterButtonText}>Filter</Text>
  //           </TouchableOpacity>
  //         </View>
  //       </View>

  //       {/* Results Count */}
  //       <View style={styles.resultsContainer}>
  //         <Text style={styles.resultsText}>
  //           Showing {voters.length} of {totalItems} voters
  //           {search ? ` for "${search}"` : ''}
  //         </Text>
  //       </View>

  //       {/* Voter Grid */}
  //       {voters.length === 0 ? (
  //         <View style={styles.emptyContainer}>
  //           <Feather name="users" size={60} color="#ccc" />
  //           <Text style={styles.emptyText}>
  //             {search ? 'No voters found' : 'No voters available'}
  //           </Text>
  //           {search && (
  //             <TouchableOpacity
  //               style={styles.clearSearchButton}
  //               onPress={() => {
  //                 setSearch('');
  //                 fetchVoters(1, '');
  //               }}
  //             >
  //               <Text style={styles.clearSearchText}>Clear Search</Text>
  //             </TouchableOpacity>
  //           )}
  //         </View>
  //       ) : (
  //         <FlatList
  //           data={voters}
  //           numColumns={numColumns}
  //           columnWrapperStyle={styles.columnWrapper}
  //           renderItem={({ item }) => (
  //             <GridVoterCard 
  //               item={item} 
  //               onPress={() => handleCardPress(item)} 
  //             />
  //           )}
  //           keyExtractor={(item) => item.id.toString()}
  //           contentContainerStyle={{ paddingBottom: 100 }}
  //           style={styles.gridList}
  //           refreshControl={
  //             <RefreshControl
  //               refreshing={refreshing}
  //               onRefresh={onRefresh}
  //               colors={["#0d2b8f"]}
  //             />
  //           }
  //         />
  //       )}

  //       {/* Pagination */}
  //       {voters.length > 0 && (
  //         <View style={styles.pagination}>
  //           {renderPaginationButtons()}
  //         </View>
  //       )}
  //     </View>
  //   );

  //   return (
  //     <ScreenWrapper 
  //       activeMenuId="voterlist" 
  //       headerTitle={`Total Voters: ${totalItems.toLocaleString()}`}
  //       headerSubtitle={isWeb ? "Home > Voter Management > All Voters List" : undefined}
  //       onMenuItemPress={handleMenuNavigation}
  //     >
  //       {MainContent()}

  //       {!isWeb && (
  //         <FAB 
  //           iconName="menu" 
  //           onPress={() => console.log('Open Mobile Menu')} 
  //         />
  //       )}
  //     </ScreenWrapper>
  //   );
  // };

  // export default VoterListScreen;

  // // ==================== STYLES ====================
  // const styles = StyleSheet.create({
  //   mainInnerContent: {
  //     flex: 1,
  //   },

  //   loadingContainer: {
  //     flex: 1,
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     backgroundColor: '#fff',
  //   },

  //   loadingText: {
  //     marginTop: 10,
  //     fontSize: 16,
  //     color: '#666',
  //   },

  //   emptyContainer: {
  //     flex: 1,
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     paddingVertical: 50,
  //   },

  //   emptyText: {
  //     fontSize: 18,
  //     color: '#666',
  //     marginTop: 10,
  //   },

  //   clearSearchButton: {
  //     marginTop: 20,
  //     paddingHorizontal: 20,
  //     paddingVertical: 10,
  //     backgroundColor: '#0d2b8f',
  //     borderRadius: 8,
  //   },

  //   clearSearchText: {
  //     color: '#fff',
  //     fontSize: 16,
  //     fontWeight: '600',
  //   },

  //   resultsContainer: {
  //     paddingHorizontal: 10,
  //     paddingVertical: 8,
  //     backgroundColor: '#f5f6fb',
  //     marginBottom: 15,
  //     borderRadius: 8,
  //   },

  //   resultsText: {
  //     fontSize: 14,
  //     color: '#555',
  //   },

  //   // Search and Filter Bar
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

  //   // Grid Style
  //   gridList: {
  //     flex: 1,
  //   },

  //   columnWrapper: {
  //     justifyContent: "space-between",
  //     marginBottom: 15,
  //   },

  //   // Pagination
  //   pagination: {
  //     flexDirection: "row",
  //     justifyContent: "center",
  //     alignItems: "center",
  //     gap: 8,
  //     paddingVertical: 15,
  //     borderTopWidth: Platform.OS === 'web' ? 1 : 0,
  //     borderTopColor: '#e0e0e0',
  //     backgroundColor: Platform.OS === 'web' ? '#fff' : 'transparent',
  //     flexWrap: 'wrap',
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
  //     minWidth: 40,
  //   },

  //   pageBtnActive: {
  //     backgroundColor: "#0d2b8f",
  //     borderColor: '#0d2b8f',
  //   },

  //   pageBtnDisabled: {
  //     backgroundColor: '#f5f5f5',
  //     borderColor: '#e0e0e0',
  //   },

  //   activeText: {
  //     color: "#fff",
  //     fontWeight: "700",
  //   },

  //   pageText: {
  //     color: '#333',
  //     fontWeight: '500',
  //   },
  // });



  import React, { useState, useEffect, useCallback } from "react";
  import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList,
    Platform,
    useWindowDimensions,
    ActivityIndicator,
    Alert,
    RefreshControl,
  } from "react-native";
  import Feather from "react-native-vector-icons/Feather";
  import { useNavigation, NavigationProp } from '@react-navigation/native';
  import { RootStackParamList } from '../navigation/types';

  import ScreenWrapper from "../navigation/ScreenWrapper";
  import GridVoterCard from "../components/GridVoterCard";
  import FAB from "../components/FAB";
  import { voterApi } from "../api/voterApi";
  import { Voter } from "../api/type";

  const VoterListScreen: React.FC = () => {
    const [search, setSearch] = useState("");
    const [voters, setVoters] = useState<Voter[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [hasNext, setHasNext] = useState(false);
    const [hasPrevious, setHasPrevious] = useState(false);

    const { width } = useWindowDimensions();
    const isWeb = Platform.OS === 'web' && width > 768;
    const numColumns = isWeb ? 3 : 2;

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const fetchVoters = useCallback(async (page: number = 1, searchQuery: string = "") => {
      try {
        setLoading(true);

        let data;
        if (searchQuery.trim()) {
          data = await voterApi.searchVoters(searchQuery, page);
        } else {
          data = await voterApi.getVoters(page);
        }

        setVoters(data.voters);
        setCurrentPage(data.pagination.current_page);
        setTotalPages(data.pagination.total_pages);
        setTotalItems(data.pagination.total_items);
        setHasNext(data.pagination.has_next);
        setHasPrevious(data.pagination.has_previous);
      } catch (error: any) {
        console.error('Error fetching voters:', error);
        Alert.alert("Error", error.message || "Failed to load voters");
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    }, []);

    useEffect(() => {
      fetchVoters(1, "");
    }, [fetchVoters]);

    const handleSearch = () => {
      fetchVoters(1, search);
    };

    const handlePageChange = (page: number) => {
      if (page >= 1 && page <= totalPages) {
        fetchVoters(page, search);
      }
    };

    const onRefresh = () => {
      setRefreshing(true);
      fetchVoters(currentPage, search);
    };

    const handleCardPress = (voter: Voter) => {
      navigation.navigate('VoterProfileScreen', {
        voterId: voter.id,
        voterData: voter
      });
    };

    const handleMenuNavigation = (menuId: string) => {
      if (menuId === 'dashboard') {
        navigation.navigate('Dashboard');
      }
    };

    const renderPaginationButtons = () => {
      const buttons = [];

      buttons.push(
        <TouchableOpacity
          key="prev"
          style={[styles.pageBtn, !hasPrevious && styles.pageBtnDisabled]}
          onPress={() => handlePageChange(currentPage - 1)}
          disabled={!hasPrevious}
        >
          <Feather name="chevron-left" size={18} color={hasPrevious ? "#000" : "#ccc"} />
        </TouchableOpacity>
      );

      const maxVisiblePages = 5;
      let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        buttons.push(
          <TouchableOpacity
            key={i}
            style={[
              styles.pageBtn,
              i === currentPage && styles.pageBtnActive
            ]}
            onPress={() => handlePageChange(i)}
          >
            <Text style={i === currentPage ? styles.activeText : styles.pageText}>
              {i}
            </Text>
          </TouchableOpacity>
        );
      }

      buttons.push(
        <TouchableOpacity
          key="next"
          style={[styles.pageBtn, !hasNext && styles.pageBtnDisabled]}
          onPress={() => handlePageChange(currentPage + 1)}
          disabled={!hasNext}
        >
          <Feather name="chevron-right" size={18} color={hasNext ? "#000" : "#ccc"} />
        </TouchableOpacity>
      );

      return buttons;
    };

    if (loading && voters.length === 0) {
      return (
        <ScreenWrapper
          activeMenuId="voterlist"
          headerTitle="Loading voters..."
          onMenuItemPress={handleMenuNavigation}
        >
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0d2b8f" />
            <Text style={styles.loadingText}>Loading voters...</Text>
          </View>
        </ScreenWrapper>
      );
    }

    const MainContent = () => (
      <View style={styles.mainInnerContent}>
        <View style={styles.searchFilterRow}>
          <View style={styles.searchBox}>
            <Feather name="search" size={20} color="#888" />
            <TextInput
              placeholder="Search by name, serial no..."
              value={search}
              onChangeText={setSearch}
              onSubmitEditing={handleSearch}
              style={styles.input}
              returnKeyType="search"
            />
            <TouchableOpacity onPress={handleSearch}>
              <Feather name="search" size={20} color="#555" />
            </TouchableOpacity>
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

        <View style={styles.resultsContainer}>
          <Text style={styles.resultsText}>
            Showing {voters.length} of {totalItems} voters
            {search ? ` for "${search}"` : ''}
          </Text>
        </View>

        {voters.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Feather name="users" size={60} color="#ccc" />
            <Text style={styles.emptyText}>
              {search ? 'No voters found' : 'No voters available'}
            </Text>
            {search && (
              <TouchableOpacity
                style={styles.clearSearchButton}
                onPress={() => {
                  setSearch('');
                  fetchVoters(1, '');
                }}
              >
                <Text style={styles.clearSearchText}>Clear Search</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <FlatList
            data={voters}
            numColumns={numColumns}
            columnWrapperStyle={styles.columnWrapper}
            renderItem={({ item }) => (
              <GridVoterCard
                item={item}
                onPress={() => {
                  console.log("📱 Voter Data being sent to card:", item);
                  console.log("📱 Image URL:", item.photo_url);
                  console.log("📱 Full Object:", JSON.stringify(item, null, 2));
                  handleCardPress(item);
                }}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 100 }}
            style={styles.gridList}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={["#0d2b8f"]}
              />
            }
          />
        )}

        {voters.length > 0 && (
          <View style={styles.pagination}>
            {renderPaginationButtons()}
          </View>
        )}
      </View>
    );

    return (
      <ScreenWrapper
        activeMenuId="voterlist"
        headerTitle={`Total Voters: ${totalItems.toLocaleString()}`}
        headerSubtitle={isWeb ? "Home > Voter Management > All Voters List" : undefined}
        onMenuItemPress={handleMenuNavigation}
      >
        {MainContent()}

        {!isWeb && (
          <FAB
            iconName="menu"
            onPress={() => console.log('Open Mobile Menu')}
          />
        )}
      </ScreenWrapper>
    );
  };

  export default VoterListScreen;

  const styles = StyleSheet.create({
    mainInnerContent: {
      flex: 1,
    },

    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },

    loadingText: {
      marginTop: 10,
      fontSize: 16,
      color: '#666',
    },

    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 50,
    },

    emptyText: {
      fontSize: 18,
      color: '#666',
      marginTop: 10,
    },

    clearSearchButton: {
      marginTop: 20,
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: '#0d2b8f',
      borderRadius: 8,
    },

    clearSearchText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },

    resultsContainer: {
      paddingHorizontal: 10,
      paddingVertical: 8,
      backgroundColor: '#f5f6fb',
      marginBottom: 15,
      borderRadius: 8,
    },

    resultsText: {
      fontSize: 14,
      color: '#555',
    },

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

    gridList: {
      flex: 1,
    },

    columnWrapper: {
      justifyContent: "space-between",
      marginBottom: 15,
    },

    pagination: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 8,
      paddingVertical: 15,
      borderTopWidth: Platform.OS === 'web' ? 1 : 0,
      borderTopColor: '#e0e0e0',
      backgroundColor: Platform.OS === 'web' ? '#fff' : 'transparent',
      flexWrap: 'wrap',
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
      minWidth: 40,
    },

    pageBtnActive: {
      backgroundColor: "#0d2b8f",
      borderColor: '#0d2b8f',
    },

    pageBtnDisabled: {
      backgroundColor: '#f5f5f5',
      borderColor: '#e0e0e0',
    },

    activeText: {
      color: "#fff",
      fontWeight: "700",
    },

    pageText: {
      color: '#333',
      fontWeight: '500',
    },
  });