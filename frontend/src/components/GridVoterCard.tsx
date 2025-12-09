import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

// Assuming the Voter interface is defined in your types file
interface Voter {
  id: number;
  name: string;
  ward: string;
  booth: string;
  serial: string;
  image: string;
}

interface GridCardProps {
  item: Voter;
  // Function passed down from VoterListScreen to handle navigation
  onPress: () => void;
}

const GridVoterCard: React.FC<GridCardProps> = ({ item, onPress }) => {
  // 💡 Note: The navigation action (onPress) is attached to the whole card and the "View Details" link.

  return (
    // 1. Navigation on entire card press
    <TouchableOpacity style={styles.gridCard} onPress={onPress} activeOpacity={0.8}>
      {/* Green status line on the right */}
      <View style={styles.statusLine} />

      {/* Top Header Content */}
      <View style={styles.gridHeader}>
        <Image source={{ uri: item.image }} style={styles.gridAvatar} />

        <View style={styles.infoContainer}>
          <Text style={styles.gridName} numberOfLines={2}>{item.name}</Text>
          <Text style={styles.gridWard}>{item.ward}</Text>

          <View style={styles.gridBadges}>
            {/* Active Status Dot */}
            <View style={styles.gridStatusDot} /> 
            
            {/* Booth Tag */}
            <View style={styles.gridTagBlue}>
              <Text style={styles.tagText}>Booth: {item.booth}</Text>
            </View>
            
            {/* Serial Tag */}
            <View style={styles.gridTagOrange}>
              <Text style={styles.tagText}>Serial: {item.serial}</Text>
            </View>
          </View>
        </View>

        {/* More Options Icon */}
        <Feather name="more-horizontal" size={20} color="#777" />
      </View>

      {/* Contact Icons Row (These actions prevent card press via e.stopPropagation()) */}
      <View style={styles.gridContactIcons}>
        <TouchableOpacity style={styles.iconButton} onPress={(e) => { e.stopPropagation(); console.log('Message clicked'); }}>
            <Feather name="message-square" size={20} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={(e) => { e.stopPropagation(); console.log('Phone clicked'); }}>
            <Feather name="phone" size={20} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={(e) => { e.stopPropagation(); console.log('Print clicked'); }}>
            <Feather name="printer" size={20} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={(e) => { e.stopPropagation(); console.log('Calendar clicked'); }}>
            <Feather name="calendar" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      {/* 2. Navigation on "View Details" link press */}
      <TouchableOpacity style={styles.gridDetails} onPress={onPress}> 
        <Text style={styles.detailsText}>View Details</Text>
        <Feather name="arrow-right" size={14} color="#0d47a1" style={{ marginLeft: 5 }} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default GridVoterCard;

// ==================== STYLES ====================
const styles = StyleSheet.create({
  gridCard: {
    // Width calculation for 3 columns on web and 2 on mobile, factoring in the space between
    width: Platform.OS === 'web' ? '32%' : '48%', 
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    elevation: 3,
    position: "relative",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statusLine: {
    position: "absolute",
    right: 0,
    top: 0,
    width: 4,
    height: "100%",
    backgroundColor: "#22c55e", // Green color for active status
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  gridHeader: {
    flexDirection: "row",
    marginBottom: 8,
  },
  gridAvatar: {
    width: 55,
    height: 55,
    borderRadius: 10,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    paddingRight: 10, // Space for the 'more' icon
  },
  gridName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
  },
  gridWard: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  gridBadges: {
    flexDirection: "row",
    marginTop: 6,
    alignItems: 'center',
    gap: 6,
  },
  gridStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22c55e',
  },
  gridTagBlue: {
    backgroundColor: "#e6efff",
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  gridTagOrange: {
    backgroundColor: "#ffe8d9",
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  tagText: { fontSize: 10, color: "#444", fontWeight: '500' },
  
  gridContactIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 8,
  },
  iconButton: {
      padding: 5,
  },

  gridDetails: {
    marginTop: 5,
    alignItems: "flex-end",
    flexDirection: 'row',
    justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  detailsText: {
    color: "#0d47a1",
    fontSize: 13,
    fontWeight: "600",
  },
});