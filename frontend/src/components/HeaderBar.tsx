import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

interface HeaderBarProps {
  /** The main title (e.g., "Total Voters: 94,723"). */
  title: string;
  /** Optional subtitle/breadcrumbs (e.g., "Home > Voter Management > All Voters List"). */
  subtitle?: string;
  /** Boolean indicating if the app is currently running in the web/desktop layout. */
  isWeb?: boolean;
  /** Controls visibility of the back arrow. */
  showBackArrow?: boolean;

  /** 💡 NEW: Sidebar state for controlling the toggle icon. */
  isSidebarOpen?: boolean; 
  /** 💡 NEW: Function to toggle the sidebar's open/close state. */
  toggleSidebar?: () => void; 
}

const HeaderBar: React.FC<HeaderBarProps> = ({ 
    title, 
    subtitle, 
    isWeb = false, 
    showBackArrow = true,
    isSidebarOpen, 
    toggleSidebar, 
}) => {
  const navigation = useNavigation();

  // The back arrow handler
  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      console.log("Cannot go back. Navigating to Home.");
    }
  };

  // --- Web Header Layout ---
  if (isWeb) {
    return (
      <View style={styles.headerWebContainer}>
        {/* Main Blue Bar */}
        <View style={styles.headerWebBlueBar}>
          <View style={styles.headerLeft}>
            
            {/* 1. 💡 SIDEBAR TOGGLE BUTTON (Web Only) - ADDED HERE */}
            {toggleSidebar && (
                <TouchableOpacity 
                    onPress={toggleSidebar} 
                    style={styles.toggleButton} 
                >
                    <Feather 
                        // Change icon based on whether the sidebar is open or closed
                        name={isSidebarOpen ? "arrow-left-circle" : "arrow-right-circle"} 
                        size={24} 
                        color="#fff" 
                    />
                </TouchableOpacity>
            )}

            {/* 2. Conditional Back Arrow for Web */}
            {showBackArrow && ( 
                <TouchableOpacity onPress={handleBackPress} style={styles.backButtonWeb}>
                    <Feather name="arrow-left" size={24} color="#fff" />
                </TouchableOpacity>
            )}
            
            <Text style={styles.titleWeb}>{title}</Text>
          </View>
          
          <View style={styles.headerRight}>
            <Text style={styles.statusText}>Status: Active</Text>
            <Feather name="bell" size={20} color="#fff" />
          </View>
        </View>

        {/* Subtitle/Breadcrumbs Bar */}
        {subtitle && (
          <View style={styles.subtitleBarWeb}>
            <Text style={styles.subtitleText}>{subtitle}</Text>
          </View>
        )}
      </View>
    );
  }

  // --- Mobile Header Layout (Full Blue Bar) ---
  return (
    <View style={styles.headerMobile}>
      {/* Conditional Back Arrow for Mobile */}
      {showBackArrow && ( // 💡 Only render if showBackArrow is true
          <TouchableOpacity onPress={handleBackPress} style={{ paddingHorizontal: 5 }}>
            <Feather name="arrow-left" size={26} color="#fff" />
          </TouchableOpacity>
      )}
      
      {/* Title - Adjust marginLeft if the arrow is hidden */}
      <Text style={[styles.titleMobile, !showBackArrow && styles.titleMobileNoArrow]}>
        {title}
      </Text>
      
      {/* Status and Icons */}
      <View style={styles.headerRight}>
        <Text style={styles.statusText}>Status: Active</Text>
        <Feather name="bell" size={20} color="#fff" style={{ marginLeft: 10 }} />
      </View>
    </View>
  );
};

export default HeaderBar;

const styles = StyleSheet.create({
  // --- Shared Styles ---
  toggleButton: {
    // Adjusted styling for better placement and visibility
    paddingRight: 20, 
    marginLeft: -5,
  },
  backButtonWeb: {
    marginRight: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  statusText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: '500',
  },

  // --- Web Styles ---
  headerWebContainer: {
    backgroundColor: '#f5f6fb',
  },
  headerWebBlueBar: {
    height: 60,
    backgroundColor: "#0d2b8f",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  titleWeb: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  subtitleBarWeb: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  subtitleText: {
    fontSize: 13,
    color: '#888',
  },

  // --- Mobile Styles ---
  headerMobile: {
    backgroundColor: "#0d2b8f",
    paddingVertical: 18,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
  },
  titleMobile: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    flex: 1, 
    marginLeft: 15, // Default margin when the arrow is present
  },
  titleMobileNoArrow: {
    // Adjusts title position when the arrow is hidden
    marginLeft: 0, 
  },
});