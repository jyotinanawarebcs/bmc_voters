import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Feather from "react-native-vector-icons/Feather";

interface MenuItem {
    id: string;
    name: string;
    icon: string;
}

interface SidebarProps {
    activeId: string;
    menuItems: MenuItem[];
    /** Tells the sidebar to collapse its content */
    isCollapsed: boolean; 
}

const Sidebar: React.FC<SidebarProps> = ({ activeId, menuItems, isCollapsed }) => (
  <View style={styles.sidebar}>
    {/* Council Logo/Title */}
    <View style={styles.sidebarHeader}>
      <View style={styles.councilLogo}>
        <Text style={styles.councilLogoText}>C</Text>
      </View>
      {/* HIDE TEXT WHEN COLLAPSED */}
      {!isCollapsed && (
          <View>
            <Text style={styles.councilTitle}>Chalisgaon</Text>
            <Text style={styles.councilSubtitle}>Municipal Council</Text>
          </View>
      )}
    </View>

    {/* Menu Items */}
    <View style={styles.menuContainer}>
      {menuItems.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={[
            styles.menuItem,
            isCollapsed ? styles.menuItemCollapsed : styles.menuItemExpanded, // Use expanded style
            activeId === item.id && styles.menuItemActive,
          ]}
          onPress={() => console.log(`Maps to ${item.name}`)}
        >
          <Feather
            name={item.icon as any}
            size={20}
            color={activeId === item.id ? '#0d2b8f' : '#666'}
          />
          {/* HIDE TEXT WHEN COLLAPSED */}
          {!isCollapsed && (
            <Text
              style={[
                styles.menuItemText,
                activeId === item.id && styles.menuItemTextActive,
              ]}
            >
              {item.name}
            </Text>
          )}
        </TouchableOpacity>
      ))}
    </View>

    {/* Logout */}
    <View style={styles.logoutContainer}>
      <TouchableOpacity 
        style={[
            styles.menuItem, 
            isCollapsed ? styles.menuItemCollapsed : styles.menuItemExpanded
        ]} 
        onPress={() => console.log('Logout')}
      >
        <Feather name="log-out" size={20} color="#666" />
        {/* HIDE TEXT WHEN COLLAPSED */}
        {!isCollapsed && <Text style={styles.menuItemText}>Logout</Text>}
      </TouchableOpacity>
    </View>
  </View>
);

export default Sidebar;

// ==================== STYLES ====================
const styles = StyleSheet.create({
  sidebar: {
    backgroundColor: '#fff',
    borderRightWidth: 1,
    borderRightColor: '#eee',
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  sidebarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
    justifyContent: 'flex-start',
  },
  councilLogo: {
    width: 30,
    height: 30,
    borderRadius: 5,
    backgroundColor: '#0d2b8f',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    flexShrink: 0,
  },
  councilLogoText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  councilTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  councilSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  menuContainer: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    marginVertical: 2,
  },
  menuItemExpanded: {
      paddingHorizontal: 20, 
      justifyContent: 'flex-start',
  },
  menuItemCollapsed: {
      paddingHorizontal: 25, 
      justifyContent: 'center',
  },
  menuItemActive: {
    backgroundColor: '#e6efff',
    borderLeftWidth: 4,
    borderLeftColor: '#0d2b8f',
  },
  menuItemText: {
    fontSize: 15,
    marginLeft: 15,
    color: '#666',
    overflow: 'hidden', 
    // whiteSpace: 'nowrap',
  },
  menuItemTextActive: {
    fontWeight: '600',
    color: '#0d2b8f',
  },
  logoutContainer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
});