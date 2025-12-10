import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabs from "./BottomTabs";
import VoterListScreen from "../screens/VoterListScreen";
import VoterProfileScreen from "../screens/VoterProfileScreen"; // Assuming this is the profile component
import ListOptionsScreen from "../screens/ListOptionsScreen";
// import VoterFamilyScreenAll from "../screens/VoterFamilyScreenAll"; // uncomment if needed
import { RootStackParamList } from './types'; // Imported type

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
      <Stack.Screen
        name="VoterProfileScreen"
        component={VoterProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VoterFamilyScreenAll"
        component={VoterFamilyScreenAll}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ListOptionsScreen"
        component={ListOptionsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DivisionScreen"
        component={ListOptionsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
