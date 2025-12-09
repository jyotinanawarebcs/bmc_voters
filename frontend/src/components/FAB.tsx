import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

interface FABProps {
  /** The name of the Feather icon to display (e.g., 'menu', 'plus', 'filter'). */
  iconName: string;
  /** Function to execute when the button is pressed. */
  onPress: () => void;
  /** Optional custom styling for the button container. */
  style?: ViewStyle;
}

/**
 * A reusable Floating Action Button component.
 * It is typically used for primary actions or opening the main menu on mobile/small screens.
 */
const FAB: React.FC<FABProps> = ({ iconName, onPress, style }) => {
  return (
    <TouchableOpacity 
      style={[styles.fab, style]} 
      onPress={onPress}
      // Accessibility best practice for touchable elements
      accessibilityLabel={`Floating action button for ${iconName}`}
      accessibilityRole="button"
    >
      <Feather name={iconName} size={26} color="#fff" />
    </TouchableOpacity>
  );
};

export default FAB;

const styles = StyleSheet.create({
  fab: {
    // Positioning the button in the bottom right corner
    position: "absolute",
    bottom: 25,
    right: 25,
    
    // Styling to match the orange button in the Voter List screen
    backgroundColor: "#ff6a00", 
    width: 60,
    height: 60,
    borderRadius: 30, // Makes it perfectly round
    
    // Centering the icon
    alignItems: "center",
    justifyContent: "center",
    
    // Shadow for mobile (Android elevation) and web/iOS
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});