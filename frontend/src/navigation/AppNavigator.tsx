// import React from "react";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import HomeScreen from "../screens/HomeScreen";
// import VotersScreen from "../screens/VotersScreen";
// import VoterDetailScreen from "../screens/VoterDetailScreen";
// import { Voter } from "../api/voterApi";
// import TaskScreen from "../screens/TaskManagementScreen";

// export type RootStackParamList = {
//   Home: undefined;
//   Voters: undefined;
//   VoterDetail: { 
//     voter: Voter; 
//     allVoters: Voter[];
//   };
//   TaskScreen:undefined;
//   Home1: undefined;
// };


// const Stack = createNativeStackNavigator<RootStackParamList>();


// export default function AppNavigator() {
//   return (
//     <Stack.Navigator initialRouteName="Home">
//       <Stack.Screen name="Home" component={HomeScreen} />
//       <Stack.Screen name="Voters" component={VotersScreen} />
//       <Stack.Screen name="VoterDetail" component={VoterDetailScreen} />
//       <Stack.Screen name="TaskScreen" component={TaskScreen} />
//       {/* <Stack.Screen name="Home1" component={BottomTabs} options={{ headerShown: false }} /> */}

//     </Stack.Navigator>
//   );
// }
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabs from "./BottomTabs";
import VotersScreen from "../screens/VotersScreen";
import VoterDetailScreen from "../screens/VoterDetailScreen";
import { Voter } from "../api/voterApi";

export type RootStackParamList = {
  MainTabs: undefined; // the bottom tabs
  Voters: undefined;
  VoterDetail: {
    voter: Voter;
    allVoters: Voter[];
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="MainTabs">
      <Stack.Screen
        name="MainTabs"
        component={BottomTabs}
        options={{ headerShown: false }} // hide header for tabs
      />
      <Stack.Screen name="Voters" component={VotersScreen} />
      <Stack.Screen name="VoterDetail" component={VoterDetailScreen} />
    </Stack.Navigator>
  );
}
