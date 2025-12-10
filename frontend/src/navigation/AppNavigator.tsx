import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabs from "./BottomTabs";
import VoterListScreen from "../screens/VoterListScreen";
import VoterProfileScreen from "../screens/VoterProfileScreen"; // Assuming this is the profile component
// import { Voter } from "../api/type"; // Not needed if Voter is only used in types.ts
import ListOptionsScreen from "../screens/ListOptionsScreen";
import { RootStackParamList } from './types'; // 💡 FIX: Imported the complete type
// import VoterFamilyScreenAll from "../screens/VoterFamilyScreenAll";

// ❌ DELETED: Removed the local, incomplete definition of RootStackParamList

const Stack = createNativeStackNavigator<RootStackParamList>(); // Use the imported type

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

      {/* The component is VoterProfileScreen.tsx */}
      <Stack.Screen
        name="VoterProfileScreen"
        component={VoterProfileScreen}
        options={{ headerShown: false }} // Ensure header is hidden here too, since you use a custom one
      />

      {/* This screen name is now valid because it is in the imported RootStackParamList */}
      <Stack.Screen
        name="ListOptionsScreen" 
        component={ListOptionsScreen}
        options={{ headerShown: false }} // Ensure header is hidden here too, since you use a custom one
      />

      <Stack.Screen
        name="DivisionScreen" 
        component={ListOptionsScreen}
        options={{ headerShown: false }} // Ensure header is hidden here too, since you use a custom one
      />
    

    </Stack.Navigator>
  );
}