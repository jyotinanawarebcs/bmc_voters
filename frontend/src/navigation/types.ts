// src/navigation/types.ts

import { Voter } from '../api/type'; // Import the Voter interface from your file

// Define all screens in your main navigator stack and their parameter types
export type RootStackParamList = {
  // Main Navigation Entry Point
  MainTabs: undefined; 
  
  // Sidebar/Dashboard Screens (assuming these take no params)
  Dashboard: undefined;
  VoterListScreen: undefined;
  
  // 💡 FIX: Added missing screens from the card data
  ListOptionsScreen: undefined; 
  AdvancedSearchScreen: undefined;
  AllServicesScreen: undefined;
  DataScreen: undefined;
  SettingsScreen: undefined;
  DivisionScreen: undefined;
  
  // Screens requiring parameters:
  VoterProfileScreen: { 
    voterId: number; 
    voterData: Voter; 
  }; 

  VoterFamilyScreenAll: {
    voterId: number | string; // ID of the profile voter
    voterData: any; // Or your specific Voter type
  };
  
  // Add other screens here, e.g.,
  SurnameDivisionScreen: { divisionId: string };
};