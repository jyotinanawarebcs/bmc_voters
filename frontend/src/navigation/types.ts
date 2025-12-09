// src/navigation/types.ts

import { Voter } from '../api/type'; // Import the Voter interface from your file

// Define all screens in your main navigator stack and their parameter types
export type RootStackParamList = {
  // Screens that take no parameters:
  Dashboard: undefined;
  VoterListScreen: undefined;
  
  // The screen that requires parameters:
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