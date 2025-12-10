import React, { useState } from 'react';
import { View, StyleSheet, Platform, useWindowDimensions, ScrollView, ViewStyle } from 'react-native'; 
import Sidebar from '../components/Sidebar'; 
import HeaderBar from '../components/HeaderBar'; 

// --- Interface for Menu Items (Needed for Sidebar) ---
interface MenuItem {
  id: string;
  name: string;
  icon: string;
}

const MENU_ITEMS: MenuItem[] = [
  { id: 'dashboard', name: 'Dashboard', icon: 'dashboard' },
  { id: 'voterlist', name: 'Voter List', icon: 'list' },
  { id: 'pollingbooths', name: 'Polling Booths', icon: 'map-pin' },
  { id: 'statistics', name: 'Statistics', icon: 'bar-chart-2' },
];


interface ScreenWrapperProps {
  /** The content of the specific screen (e.g., VoterList or Home grid). */
  children: React.ReactNode;
  /** The ID of the currently active menu item for sidebar highlighting. */
  activeMenuId: string;
  /** The main title for the header bar (e.g., "Total Voters: 94,723"). */
  headerTitle: string;
  /** The subtitle or breadcrumbs for the header (Visible on web only). */
  headerSubtitle?: string;
  /** Controls the visibility of the back arrow. */
  showBackArrow?: boolean; 
  /** 💡 FIX 1: ADD THE MISSING PROP DEFINITION */
  onMenuItemPress: (menuId: string) => void; 
}

// --- Web-only transition styles ---
const webTransitionStyles: ViewStyle = Platform.OS === 'web' ? {
  transitionDuration: '300ms',
  transitionProperty: 'width',
} as ViewStyle : {};


/**
 * A wrapper component that provides a consistent, responsive layout
 */
const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  activeMenuId,
  headerTitle,
  headerSubtitle,
  showBackArrow = true, 
  // 💡 FIX 2: DESTRUCTURE THE NEW PROP
  onMenuItemPress,
}) => {
  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === 'web' && width > 768;

  // 1. STATE FOR SIDEBAR TOGGLE ON WEB
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // 2. FUNCTION TO TOGGLE SIDEBAR
  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };
  
  // Define sidebar width based on state
  const sidebarWidth = isSidebarOpen ? 250 : 80;


  const MainContentArea = () => (
    <View style={isWeb ? styles.mainContentWeb : styles.mainContentMobile}>
      
      {/* 1. HEADER BAR: Pass toggle props */}
      <HeaderBar 
        title={headerTitle} 
        subtitle={headerSubtitle} 
        isWeb={isWeb} 
        showBackArrow={showBackArrow}
        isSidebarOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
      />

      {/* 2. SCREEN CONTENT */}
      <View style={styles.contentContainer}>
        {children}
      </View>
    </View>
  );


  if (isWeb) {
    // === 1. WEB/DESKTOP Layout (Sidebar + Main Area) ===
    return (
      <View style={styles.webContainer}>
        {/* APPLY DYNAMIC WIDTH, MERGING IN THE WEB TRANSITION STYLES */}
        <View style={[
            styles.sidebarWrapper, 
            { width: sidebarWidth },
            webTransitionStyles // 💡 Apply conditional web styles here
        ]}>
            {/* 💡 FIX 3: PASS THE PROP DOWN TO THE SIDEBAR COMPONENT */}
            <Sidebar 
                activeId={activeMenuId} 
                menuItems={MENU_ITEMS} 
                isCollapsed={!isSidebarOpen} 
                onPress={onMenuItemPress} 
            />
        </View>
        
        {/* Main Content Area */}
        {MainContentArea()}
      </View>
    );
  } else {
    // === 2. MOBILE/ANDROID Layout (HeaderBar + Main Area) ===
    return (
      <View style={styles.containerMobile}>
        {MainContentArea()}
      </View>
    );
  }
};

export default ScreenWrapper;

// ==================== STYLES ====================
const styles = StyleSheet.create({
  // --- Mobile Container ---
  containerMobile: { 
    flex: 1, 
    backgroundColor: "#f5f6fb",
  },
  mainContentMobile: {
    flex: 1,
  },
  
  // --- Web Container Styles ---
  webContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: "#f5f6fb",
  },
  
  // 💡 FIXED: Only include native compatible styles here
  sidebarWrapper: {
    backgroundColor: '#fff', 
    // transitionDuration and transitionProperty are removed from here
  },
  
  mainContentWeb: {
    flex: 1, 
  },
  
  // --- Content Padding ---
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16, 
    paddingTop: 15,
    overflow: 'hidden', 
  },
});