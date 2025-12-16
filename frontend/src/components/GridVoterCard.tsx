import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  Platform 
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { Voter } from '../api/type';

interface GridCardProps {
  item: Voter;
  onPress: () => void;
}

const GridVoterCard: React.FC<GridCardProps> = ({ item, onPress }) => {
  // Convert Django media path to absolute URL
  const getImageUrl = () => {
    if (!item.photo_url) {
      return null;
    }
    
    // DEBUG
    console.log("🖼️ Image Debug for voter ID:", item.id);
    console.log("   Original photo_url:", item.photo_url);
    
    // If already absolute URL
    if (item.photo_url.startsWith('http')) {
      console.log("   Already absolute URL");
      return item.photo_url;
    }
    
    // Convert relative path to absolute
    const baseUrl = Platform.OS === 'android' 
      ? 'http://10.0.2.2:8000' 
      : 'http://localhost:8000';
    
    // Ensure path starts with /
    const path = item.photo_url.startsWith('/') 
      ? item.photo_url 
      : `/${item.photo_url}`;
    
    const fullUrl = `${baseUrl}${path}`;
    console.log("   Converted to:", fullUrl);
    
    return fullUrl;
  };

  const imageUrl = getImageUrl();

  return (
    <TouchableOpacity style={styles.gridCard} onPress={onPress} activeOpacity={0.8}>
      {/* Green Right Status Line */}
      <View style={styles.statusLine} />

      {/* Top Header */}
      <View style={styles.gridHeader}>

        {/* Photo - FIXED VERSION */}
        {imageUrl ? (
          <Image 
            source={{ uri: imageUrl }} 
            style={styles.gridAvatar}
            onError={(e) => {
              console.log("❌ FAILED to load image:", imageUrl);
              console.log("   Error details:", e.nativeEvent.error);
            }}
            onLoad={() => {
              console.log("✅ SUCCESS: Image loaded:", imageUrl);
            }}
          />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>
              {item.full_name?.charAt(0) || "?"}
            </Text>
          </View>
        )}

        {/* Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.gridName} numberOfLines={2}>
            {item.full_name}
          </Text>

          {/* Ward / House No */}
          <Text style={styles.gridWard}>
            Ward: {item.house_no || "N/A"}
          </Text>

          {/* Badges */}
          <View style={styles.gridBadges}>
            <View style={styles.gridStatusDot} />

            <View style={styles.gridTagBlue}>
              <Text style={styles.tagText}>Booth: {item.part_number || "N/A"}</Text>
            </View>

            <View style={styles.gridTagOrange}>
              <Text style={styles.tagText}>VoterID: {item.voter_id || "N/A"}</Text>
            </View>
          </View>
        </View>

        {/* More Icon */}
        <Feather name="more-horizontal" size={20} color="#777" />

      </View>

      {/* Contact Icons */}
      <View style={styles.gridContactIcons}>
        <TouchableOpacity style={styles.iconButton} onPress={(e) => e.stopPropagation()}>
          <Feather name="message-square" size={20} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={(e) => e.stopPropagation()}>
          <Feather name="phone" size={20} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={(e) => e.stopPropagation()}>
          <Feather name="printer" size={20} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={(e) => e.stopPropagation()}>
          <Feather name="calendar" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      {/* View Details */}
      <TouchableOpacity 
        style={styles.gridDetails} 
        onPress={(e) => {
          e.stopPropagation();
          onPress();
        }}
      >
        <Text style={styles.detailsText}>View Details</Text>
        <Feather name="arrow-right" size={14} color="#0d47a1" style={{ marginLeft: 5 }} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default GridVoterCard;

const styles = StyleSheet.create({
  gridCard: {
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
    marginBottom: 12,
  },

  statusLine: {
    position: "absolute",
    right: 0,
    top: 0,
    width: 4,
    height: "100%",
    backgroundColor: "#22c55e",
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

  placeholder: {
    width: 55,
    height: 55,
    borderRadius: 10,
    backgroundColor: "#0d47a1",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  placeholderText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },

  infoContainer: {
    flex: 1,
    paddingRight: 10,
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
    alignItems: "center",
    gap: 6,
  },

  gridStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#22c55e",
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

  tagText: {
    fontSize: 10,
    color: "#444",
    fontWeight: "500",
  },

  gridContactIcons: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginBottom: 8,
  },

  iconButton: {
    padding: 5,
  },

  gridDetails: {
    marginTop: 5,
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  detailsText: {
    color: "#0d47a1",
    fontSize: 13,
    fontWeight: "600",
  },
});