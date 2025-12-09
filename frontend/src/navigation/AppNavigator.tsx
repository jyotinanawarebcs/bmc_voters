import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabs from "./BottomTabs";
import VoterListScreen from "../screens/VoterListScreen";
import VoterProfileScreen from "../screens/VoterProfileScreen"; // Assuming this is the profile component
import { Voter } from "../api/type";
// import { RootStackParamList } from './types';
import VoterFamilyScreenAll from "../screens/VoterFamilyScreenAll";

// 💡 CLEANED UP RootStackParamList
export type RootStackParamList = {
  MainTabs: undefined; // The bottom tabs
  VoterListScreen: undefined;

  // This is the single, correct route for the profile view
  VoterProfileScreen: {
    voterId: number;
    voterData: Voter;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="MainTabs">
      <Stack.Screen
        name="MainTabs"
        component={BottomTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VoterListScreen"
        component={VoterListScreen}
        options={{ headerShown: false }}
      />

      {/* The component is VoterProfileScreen.tsx but you are importing 
        it as VoterDetailScreen. I will use the imported name. 
        The ROUTE NAME MUST BE 'VoterProfileScreen' for the navigation to work.
      */}
      <Stack.Screen
        name="VoterProfileScreen"
        component={VoterProfileScreen}
        options={{ headerShown: false }} // Ensure header is hidden here too, since you use a custom one
      />
      <Stack.Screen
        name="VoterFamilyScreenAll"
        component={VoterFamilyScreenAll}
      />

    </Stack.Navigator>
  );
}